import React from 'react';
import { Table, Card, Tag, Typography, Input, Button, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Inspection {
  id: string;
  inspectionNumber: string;
  materialName: string;
  batchNumber: string;
  grnNumber: string;
  date: string;
  inspector: string;
  result: 'passed' | 'failed' | 'conditional';
  notes: string;
}

const resultColors: Record<string, string> = {
  passed: 'green',
  failed: 'red',
  conditional: 'orange',
};

const InspectionList: React.FC = () => {
  const { t } = useTranslation();

  const columns: ColumnsType<Inspection> = [
    { title: '#', dataIndex: 'inspectionNumber', key: 'inspectionNumber', sorter: true },
    { title: t('common.name'), dataIndex: 'materialName', key: 'materialName' },
    { title: t('inventory.batchNumber'), dataIndex: 'batchNumber', key: 'batchNumber' },
    { title: t('procurement.grnNumber'), dataIndex: 'grnNumber', key: 'grnNumber' },
    { title: t('common.date'), dataIndex: 'date', key: 'date', sorter: true },
    { title: t('common.inspector'), dataIndex: 'inspector', key: 'inspector' },
    {
      title: t('quality.inspectionResult'),
      dataIndex: 'result',
      key: 'result',
      render: (result: string) => (
        <Tag color={resultColors[result]}>{t(`quality.${result}`)}</Tag>
      ),
    },
    {
      title: t('common.actions'),
      key: 'actions',
      render: () => (
        <Button type="link">{t('common.view')}</Button>
      ),
    },
  ];

  const mockData: Inspection[] = [
    { id: '1', inspectionNumber: 'QC-2026-0120', materialName: 'Sodium Hydroxide', batchNumber: 'B-2026-0312', grnNumber: 'GRN-0045', date: '2026-03-28', inspector: 'Dr. Fatima Noor', result: 'passed', notes: 'All parameters within spec' },
    { id: '2', inspectionNumber: 'QC-2026-0119', materialName: 'Hydrochloric Acid', batchNumber: 'B-2026-0310', grnNumber: 'GRN-0044', date: '2026-03-27', inspector: 'Dr. Fatima Noor', result: 'conditional', notes: 'Slight deviation in concentration' },
    { id: '3', inspectionNumber: 'QC-2026-0118', materialName: 'Ethanol', batchNumber: 'B-2026-0305', grnNumber: 'GRN-0043', date: '2026-03-25', inspector: 'Khalid Omar', result: 'failed', notes: 'Purity below threshold' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>{t('nav.inspections')}</Title>
        <Button type="primary" icon={<PlusOutlined />}>
          {t('common.create')}
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

export default InspectionList;
