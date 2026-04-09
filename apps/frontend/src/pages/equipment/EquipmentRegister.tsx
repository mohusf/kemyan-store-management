import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Typography, Input, Select, Tabs, Drawer, Descriptions, Button, Space, Row, Col } from 'antd';
import { ToolOutlined, DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

interface EquipmentItem {
  id: string;
  tagNumber: string;
  descriptionEn: string;
  descriptionAr?: string;
  location?: string;
  criticalityClass?: string;
  pmStrategy?: string;
  associatedPmWis?: string;
  serialNumber?: string;
  status: string;
  manufacturer?: string;
  model?: string;
  specifications?: Record<string, unknown>;
  plantUnit?: { unitCode: string; nameEn: string; nameAr?: string };
  equipmentTypeCode?: { code: string; descriptionEn: string; descriptionAr?: string };
}

interface PlantUnitTab {
  id: string;
  unitCode: string;
  nameEn: string;
  nameAr?: string;
  equipmentCount: number;
}

const CRIT_COLORS: Record<string, string> = { A: 'red', B: 'orange', C: 'green' };
const PM_COLORS: Record<string, string> = { TBM: 'blue', CBM: 'purple', 'TBM/CBM': 'geekblue', Predictive: 'cyan', RTF: 'default' };

const EquipmentRegister: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [data, setData] = useState<EquipmentItem[]>([]);
  const [total, setTotal] = useState(0);
  const [plantUnits, setPlantUnits] = useState<PlantUnitTab[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [critFilter, setCritFilter] = useState<string>('');
  const [pmFilter, setPmFilter] = useState<string>('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [drawerItem, setDrawerItem] = useState<EquipmentItem | null>(null);

  useEffect(() => {
    api.get('/equipment/plant-units').then((res) => setPlantUnits(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string | number> = { page, limit: 50 };
    if (selectedUnit) params.plantUnitCode = selectedUnit;
    if (critFilter) params.criticalityClass = critFilter;
    if (pmFilter) params.pmStrategy = pmFilter;
    if (search) params.search = search;

    api.get('/equipment', { params })
      .then((res) => { setData(res.data.data); setTotal(res.data.total); })
      .catch(() => { setData([]); setTotal(0); })
      .finally(() => setLoading(false));
  }, [selectedUnit, critFilter, pmFilter, search, page]);

  const columns: ColumnsType<EquipmentItem> = [
    {
      title: t('equipment.tagNumber', 'Tag Number'),
      dataIndex: 'tagNumber',
      width: 140,
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: t('common.description'),
      dataIndex: isAr ? 'descriptionAr' : 'descriptionEn',
      render: (text: string, record: EquipmentItem) => text || record.descriptionEn,
    },
    {
      title: t('equipment.type', 'Type'),
      dataIndex: ['equipmentTypeCode', 'code'],
      width: 80,
      render: (code: string) => <Tag>{code}</Tag>,
    },
    {
      title: t('inventory.location', 'Location'),
      dataIndex: 'location',
      width: 120,
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      width: 100,
      render: (val: string) => <Tag color={val === 'active' ? 'green' : 'default'}>{val}</Tag>,
    },
    {
      title: t('equipment.criticality', 'Criticality'),
      dataIndex: 'criticalityClass',
      width: 100,
      render: (val: string) => val ? <Tag color={CRIT_COLORS[val]}>{val}</Tag> : '—',
    },
    {
      title: t('equipment.pmStrategy', 'PM Strategy'),
      dataIndex: 'pmStrategy',
      width: 120,
      render: (val: string) => val ? <Tag color={PM_COLORS[val] || 'default'}>{val}</Tag> : '—',
    },
    {
      title: t('equipment.serialNumber', 'Serial No.'),
      dataIndex: 'serialNumber',
      width: 120,
      render: (val: string) => val || '—',
    },
  ];

  const handleExportCSV = () => {
    const headers = ['Tag Number', 'Description', 'Type', 'Location', 'Status', 'Criticality', 'PM Strategy', 'Serial Number', 'Manufacturer', 'Model'];
    const rows = data.map((item) => [
      item.tagNumber,
      item.descriptionEn,
      item.equipmentTypeCode?.code || '',
      item.location || '',
      item.status,
      item.criticalityClass || '',
      item.pmStrategy || '',
      item.serialNumber || '',
      item.manufacturer || '',
      item.model || '',
    ]);
    const csv = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'equipment-register.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const unitTabs = [
    { key: '', label: `${t('common.total', 'All')} (${plantUnits.reduce((s, u) => s + u.equipmentCount, 0)})` },
    ...plantUnits.map((u) => ({
      key: u.unitCode,
      label: `${u.unitCode} (${u.equipmentCount})`,
    })),
  ];

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col><Title level={3} style={{ margin: 0 }}><ToolOutlined style={{ marginRight: 8 }} />{t('equipment.title', 'Equipment Register')}</Title></Col>
        <Col><Button icon={<DownloadOutlined />} onClick={handleExportCSV}>{t('common.export')}</Button></Col>
      </Row>

      <Tabs activeKey={selectedUnit} onChange={(k) => { setSelectedUnit(k); setPage(1); }} items={unitTabs} style={{ marginBottom: 16 }} />

      <Space style={{ marginBottom: 16 }} wrap>
        <Input
          placeholder={t('common.search')}
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          style={{ width: 220 }}
          allowClear
        />
        <Select
          placeholder={t('equipment.criticality', 'Criticality')}
          value={critFilter || undefined}
          onChange={(v) => { setCritFilter(v || ''); setPage(1); }}
          allowClear
          style={{ width: 140 }}
          options={[
            { value: 'A', label: 'A — Critical' },
            { value: 'B', label: 'B — Important' },
            { value: 'C', label: 'C — Non-critical' },
          ]}
        />
        <Select
          placeholder={t('equipment.pmStrategy', 'PM Strategy')}
          value={pmFilter || undefined}
          onChange={(v) => { setPmFilter(v || ''); setPage(1); }}
          allowClear
          style={{ width: 160 }}
          options={[
            { value: 'TBM', label: 'TBM' },
            { value: 'CBM', label: 'CBM' },
            { value: 'TBM/CBM', label: 'TBM/CBM' },
            { value: 'Predictive', label: 'Predictive' },
            { value: 'RTF', label: 'RTF' },
          ]}
        />
      </Space>

      <Card>
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          loading={loading}
          size="small"
          pagination={{
            current: page,
            pageSize: 50,
            total,
            onChange: setPage,
            showSizeChanger: false,
            showTotal: (total) => `${total} ${t('common.items', 'items')}`,
          }}
          onRow={(record) => ({
            onClick: () => setDrawerItem(record),
            style: { cursor: 'pointer' },
          })}
        />
      </Card>

      <Drawer
        title={drawerItem?.tagNumber}
        open={!!drawerItem}
        onClose={() => setDrawerItem(null)}
        width={480}
      >
        {drawerItem && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label={t('equipment.tagNumber', 'Tag Number')}>{drawerItem.tagNumber}</Descriptions.Item>
            <Descriptions.Item label={t('common.description')}>
              {isAr ? drawerItem.descriptionAr || drawerItem.descriptionEn : drawerItem.descriptionEn}
            </Descriptions.Item>
            <Descriptions.Item label={t('equipment.plantUnit', 'Plant Unit')}>
              {drawerItem.plantUnit?.unitCode} — {isAr ? drawerItem.plantUnit?.nameAr : drawerItem.plantUnit?.nameEn}
            </Descriptions.Item>
            <Descriptions.Item label={t('equipment.type', 'Type')}>
              {drawerItem.equipmentTypeCode?.code} — {isAr ? drawerItem.equipmentTypeCode?.descriptionAr : drawerItem.equipmentTypeCode?.descriptionEn}
            </Descriptions.Item>
            <Descriptions.Item label={t('inventory.location', 'Location')}>{drawerItem.location || '—'}</Descriptions.Item>
            <Descriptions.Item label={t('equipment.criticality', 'Criticality')}>
              {drawerItem.criticalityClass ? <Tag color={CRIT_COLORS[drawerItem.criticalityClass]}>{drawerItem.criticalityClass}</Tag> : '—'}
            </Descriptions.Item>
            <Descriptions.Item label={t('equipment.pmStrategy', 'PM Strategy')}>
              {drawerItem.pmStrategy ? <Tag color={PM_COLORS[drawerItem.pmStrategy]}>{drawerItem.pmStrategy}</Tag> : '—'}
            </Descriptions.Item>
            <Descriptions.Item label={t('equipment.associatedPmWis', 'Associated PM WIs')}>{drawerItem.associatedPmWis || '—'}</Descriptions.Item>
            <Descriptions.Item label={t('equipment.serialNumber', 'Serial No.')}>{drawerItem.serialNumber || '—'}</Descriptions.Item>
            <Descriptions.Item label={t('equipment.manufacturer', 'Manufacturer')}>{drawerItem.manufacturer || '—'}</Descriptions.Item>
            <Descriptions.Item label={t('equipment.model', 'Model')}>{drawerItem.model || '—'}</Descriptions.Item>
            <Descriptions.Item label={t('common.status')}>
              <Tag color={drawerItem.status === 'active' ? 'green' : 'default'}>{drawerItem.status}</Tag>
            </Descriptions.Item>
            {drawerItem.specifications && Object.keys(drawerItem.specifications).length > 0 && (
              <Descriptions.Item label={t('equipment.specifications', 'Specifications')}>
                <pre style={{ margin: 0, fontSize: 12 }}>{JSON.stringify(drawerItem.specifications, null, 2)}</pre>
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Drawer>
    </div>
  );
};

export default EquipmentRegister;
