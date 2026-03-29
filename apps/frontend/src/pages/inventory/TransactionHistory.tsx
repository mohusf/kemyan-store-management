import React from 'react';
import { Table, Card, Tag, Typography, Input, DatePicker, Space, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface Transaction {
  id: string;
  date: string;
  materialCode: string;
  materialName: string;
  type: 'received' | 'issued' | 'adjusted' | 'returned';
  quantity: number;
  unit: string;
  batchNumber: string;
  reference: string;
  performedBy: string;
}

const typeColors: Record<string, string> = {
  received: 'green',
  issued: 'blue',
  adjusted: 'orange',
  returned: 'purple',
};

const TransactionHistory: React.FC = () => {
  const { t } = useTranslation();

  const columns: ColumnsType<Transaction> = [
    { title: t('common.date'), dataIndex: 'date', key: 'date', sorter: true },
    { title: t('common.code'), dataIndex: 'materialCode', key: 'materialCode' },
    { title: t('common.name'), dataIndex: 'materialName', key: 'materialName' },
    {
      title: t('inventory.transactionType'),
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={typeColors[type]}>{t(`inventory.${type}`)}</Tag>
      ),
    },
    {
      title: t('common.quantity'),
      dataIndex: 'quantity',
      key: 'quantity',
      render: (qty: number, record: Transaction) => (
        <span style={{ color: qty > 0 ? '#27AE60' : '#E74C3C' }}>
          {qty > 0 ? '+' : ''}{qty} {record.unit}
        </span>
      ),
    },
    { title: t('inventory.batchNumber'), dataIndex: 'batchNumber', key: 'batchNumber' },
    { title: t('common.reference'), dataIndex: 'reference', key: 'reference' },
    { title: t('common.performedBy'), dataIndex: 'performedBy', key: 'performedBy' },
  ];

  const mockData: Transaction[] = [
    { id: '1', date: '2026-03-28', materialCode: 'MAT-001', materialName: 'Sodium Hydroxide', type: 'received', quantity: 200, unit: 'kg', batchNumber: 'B-2026-0312', reference: 'GRN-0045', performedBy: 'Ahmed Hassan' },
    { id: '2', date: '2026-03-27', materialCode: 'MAT-003', materialName: 'Ethanol', type: 'issued', quantity: -50, unit: 'L', batchNumber: 'B-2026-0298', reference: 'REQ-0042', performedBy: 'Sara Ali' },
    { id: '3', date: '2026-03-26', materialCode: 'MAT-002', materialName: 'Hydrochloric Acid', type: 'adjusted', quantity: -5, unit: 'L', batchNumber: 'B-2026-0290', reference: 'ADJ-0015', performedBy: 'Omar Khalid' },
    { id: '4', date: '2026-03-25', materialCode: 'MAT-001', materialName: 'Sodium Hydroxide', type: 'returned', quantity: 10, unit: 'kg', batchNumber: 'B-2026-0285', reference: 'RET-0003', performedBy: 'Fatima Noor' },
  ];

  return (
    <div>
      <Title level={4}>{t('nav.transactions')}</Title>
      <Card>
        <Space style={{ marginBottom: 16 }} wrap>
          <Input
            placeholder={t('common.search')}
            prefix={<SearchOutlined />}
            style={{ width: 250 }}
            allowClear
          />
          <Select
            placeholder={t('inventory.transactionType')}
            style={{ width: 150 }}
            allowClear
            options={[
              { label: t('inventory.received'), value: 'received' },
              { label: t('inventory.issued'), value: 'issued' },
              { label: t('inventory.adjusted'), value: 'adjusted' },
              { label: t('inventory.returned'), value: 'returned' },
            ]}
          />
          <RangePicker />
        </Space>
        <Table
          columns={columns}
          dataSource={mockData}
          rowKey="id"
          pagination={{ pageSize: 20, showSizeChanger: true }}
        />
      </Card>
    </div>
  );
};

export default TransactionHistory;
