import React from 'react';
import { Table, Card, Tag, Typography, Input, Button, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface WasteRecord {
  id: string;
  wasteId: string;
  material: string;
  category: string;
  quantity: number;
  unit: string;
  disposalMethod: string;
  generatedDate: string;
  disposalDate: string | null;
  status: 'pending' | 'scheduled' | 'disposed' | 'documented';
  handler: string;
}

const statusColors: Record<string, string> = {
  pending: 'orange',
  scheduled: 'processing',
  disposed: 'green',
  documented: 'blue',
};

const WasteTracking: React.FC = () => {
  const { t } = useTranslation();

  const columns: ColumnsType<WasteRecord> = [
    { title: 'Waste ID', dataIndex: 'wasteId', key: 'wasteId', sorter: true },
    { title: t('common.name'), dataIndex: 'material', key: 'material' },
    {
      title: t('compliance.wasteCategory'),
      dataIndex: 'category',
      key: 'category',
      render: (cat: string) => {
        const colors: Record<string, string> = { hazardous: 'red', 'non-hazardous': 'green', chemical: 'orange' };
        return <Tag color={colors[cat.toLowerCase()] || 'default'}>{cat}</Tag>;
      },
    },
    { title: t('common.quantity'), key: 'quantity', render: (_: unknown, r: WasteRecord) => `${r.quantity} ${r.unit}` },
    { title: t('compliance.disposalMethod'), dataIndex: 'disposalMethod', key: 'disposalMethod' },
    { title: 'Generated', dataIndex: 'generatedDate', key: 'generatedDate', sorter: true },
    { title: 'Disposed', dataIndex: 'disposalDate', key: 'disposalDate', render: (d: string | null) => d || '-' },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>,
    },
    {
      title: t('common.actions'),
      key: 'actions',
      render: () => (
        <Button type="link">{t('common.view')}</Button>
      ),
    },
  ];

  const mockData: WasteRecord[] = [
    { id: '1', wasteId: 'WST-2026-0078', material: 'Spent Hydrochloric Acid', category: 'Hazardous', quantity: 25, unit: 'L', disposalMethod: 'Licensed contractor', generatedDate: '2026-03-25', disposalDate: null, status: 'scheduled', handler: 'EnviroClean Co.' },
    { id: '2', wasteId: 'WST-2026-0077', material: 'Expired Ethanol', category: 'Chemical', quantity: 10, unit: 'L', disposalMethod: 'Incineration', generatedDate: '2026-03-20', disposalDate: '2026-03-26', status: 'disposed', handler: 'WasteChem Arabia' },
    { id: '3', wasteId: 'WST-2026-0076', material: 'Contaminated containers', category: 'Hazardous', quantity: 15, unit: 'pcs', disposalMethod: 'Licensed contractor', generatedDate: '2026-03-18', disposalDate: '2026-03-24', status: 'documented', handler: 'EnviroClean Co.' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>{t('compliance.wasteTitle')}</Title>
        <Button type="primary" icon={<PlusOutlined />}>
          {t('common.add')}
        </Button>
      </div>
      <Card>
        <Input
          placeholder={t('common.search')}
          prefix={<SearchOutlined />}
          style={{ width: 300, marginBottom: 16 }}
          allowClear
        />
        <Table
          columns={columns}
          dataSource={mockData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default WasteTracking;
