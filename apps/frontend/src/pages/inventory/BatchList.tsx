import React from 'react';
import { Table, Card, Tag, Typography, Input, Badge } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Batch {
  id: string;
  batchNumber: string;
  materialCode: string;
  materialName: string;
  quantity: number;
  unit: string;
  receivedDate: string;
  expiryDate: string;
  location: string;
  supplier: string;
  status: 'active' | 'quarantine' | 'expired' | 'depleted';
}

const BatchList: React.FC = () => {
  const { t } = useTranslation();

  const getExpiryIndicator = (expiryDate: string) => {
    const daysUntilExpiry = dayjs(expiryDate).diff(dayjs(), 'day');
    if (daysUntilExpiry < 0) return <Badge status="error" text="Expired" />;
    if (daysUntilExpiry <= 30) return <Badge status="warning" text={`${daysUntilExpiry} days`} />;
    if (daysUntilExpiry <= 90) return <Badge status="processing" text={`${daysUntilExpiry} days`} />;
    return <Badge status="success" text={`${daysUntilExpiry} days`} />;
  };

  const statusColors: Record<string, string> = {
    active: 'green',
    quarantine: 'orange',
    expired: 'red',
    depleted: 'default',
  };

  const columns: ColumnsType<Batch> = [
    { title: t('inventory.batchNumber'), dataIndex: 'batchNumber', key: 'batchNumber', sorter: true },
    { title: t('common.name'), dataIndex: 'materialName', key: 'materialName' },
    { title: t('common.quantity'), key: 'quantity', render: (_: unknown, r: Batch) => `${r.quantity} ${r.unit}` },
    { title: t('inventory.location'), dataIndex: 'location', key: 'location' },
    {
      title: t('inventory.expiryDate'),
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      sorter: true,
      render: (date: string) => (
        <div>
          <div>{date}</div>
          {getExpiryIndicator(date)}
        </div>
      ),
    },
    { title: t('procurement.supplier'), dataIndex: 'supplier', key: 'supplier' },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={statusColors[status]}>{status}</Tag>,
    },
  ];

  const mockData: Batch[] = [
    { id: '1', batchNumber: 'B-2026-0312', materialCode: 'MAT-001', materialName: 'Sodium Hydroxide', quantity: 200, unit: 'kg', receivedDate: '2026-03-28', expiryDate: '2027-03-28', location: 'Zone A-1', supplier: 'ChemCo', status: 'active' },
    { id: '2', batchNumber: 'B-2026-0298', materialCode: 'MAT-003', materialName: 'Ethanol', quantity: 150, unit: 'L', receivedDate: '2026-03-20', expiryDate: '2026-04-20', location: 'Zone C-1', supplier: 'SolvChem', status: 'active' },
    { id: '3', batchNumber: 'B-2026-0280', materialCode: 'MAT-002', materialName: 'Hydrochloric Acid', quantity: 0, unit: 'L', receivedDate: '2026-03-10', expiryDate: '2026-03-25', location: 'Zone B-3', supplier: 'AcidSupply', status: 'expired' },
    { id: '4', batchNumber: 'B-2026-0275', materialCode: 'MAT-004', materialName: 'Acetone', quantity: 50, unit: 'L', receivedDate: '2026-03-05', expiryDate: '2026-06-05', location: 'Zone C-2', supplier: 'SolvChem', status: 'quarantine' },
  ];

  return (
    <div>
      <Title level={4}>{t('nav.batches')}</Title>
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
          pagination={{ pageSize: 10, showSizeChanger: true }}
        />
      </Card>
    </div>
  );
};

export default BatchList;
