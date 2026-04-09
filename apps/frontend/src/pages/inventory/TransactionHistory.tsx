import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Typography, Input, DatePicker, Space, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface Transaction {
  id: string;
  batchId: string;
  materialId: string;
  locationId: string;
  transactionType: string;
  quantity: number;
  referenceType: string;
  referenceId: string;
  performedBy: string;
  reason: string;
  runningBalance: number;
  createdAt: string;
}

const typeColors: Record<string, string> = {
  receive: 'green',
  issue: 'blue',
  adjust: 'orange',
  transfer: 'purple',
};

const TransactionHistory: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<Transaction[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.get('/inventory/transactions', { params: { page, limit: 20 } })
      .then((res) => { setData(res.data.data || []); setTotal(res.data.total || 0); })
      .catch(() => { setData([]); setTotal(0); })
      .finally(() => setLoading(false));
  }, [page]);

  const columns: ColumnsType<Transaction> = [
    { title: t('common.date'), dataIndex: 'createdAt', key: 'createdAt', render: (v: string) => v ? new Date(v).toLocaleDateString() : '—' },
    {
      title: t('inventory.transactionType'),
      dataIndex: 'transactionType',
      key: 'transactionType',
      render: (type: string) => <Tag color={typeColors[type] || 'default'}>{type}</Tag>,
    },
    {
      title: t('common.quantity'),
      dataIndex: 'quantity',
      key: 'quantity',
      render: (qty: number) => (
        <span style={{ color: qty > 0 ? '#27AE60' : '#E74C3C' }}>
          {qty > 0 ? '+' : ''}{qty}
        </span>
      ),
    },
    { title: t('common.reference'), dataIndex: 'referenceType', key: 'referenceType' },
    { title: 'Balance', dataIndex: 'runningBalance', key: 'runningBalance' },
  ];

  return (
    <div>
      <Title level={4}>{t('nav.transactions')}</Title>
      <Card>
        <Space style={{ marginBottom: 16 }} wrap>
          <Input placeholder={t('common.search')} prefix={<SearchOutlined />} style={{ width: 250 }} allowClear />
          <Select
            placeholder={t('inventory.transactionType')}
            style={{ width: 150 }}
            allowClear
            options={[
              { label: t('inventory.received'), value: 'receive' },
              { label: t('inventory.issued'), value: 'issue' },
              { label: t('inventory.adjusted'), value: 'adjust' },
            ]}
          />
          <RangePicker />
        </Space>
        <Table columns={columns} dataSource={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize: 20, total, onChange: setPage }} />
      </Card>
    </div>
  );
};

export default TransactionHistory;
