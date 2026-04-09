import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Typography, Input, Button, Space, Tabs } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface GRN {
  id: string;
  grnNumber: string;
  purchaseOrderId: string;
  status: string;
  receivedAt: string;
  createdAt: string;
}

const inspectionColors: Record<string, string> = {
  pending: 'processing',
  passed: 'green',
  failed: 'red',
  partial: 'orange',
};

const GoodsReceivedNote: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<GRN[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.get('/procurement/purchase-orders', { params: { page, limit: 20 } })
      .then((res) => {
        setData(res.data.data || []);
        setTotal(res.data.total || 0);
      })
      .catch(() => { setData([]); setTotal(0); })
      .finally(() => setLoading(false));
  }, [page]);

  const columns: ColumnsType<GRN> = [
    { title: t('procurement.grnNumber'), dataIndex: 'grnNumber', key: 'grnNumber', sorter: true },
    { title: t('common.date'), dataIndex: 'receivedAt', key: 'receivedAt', render: (v: string) => v ? new Date(v).toLocaleDateString() : '—' },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={inspectionColors[status] || 'default'}>{status}</Tag>,
    },
    {
      title: t('common.actions'),
      key: 'actions',
      render: () => (
        <Space><Button type="link">{t('common.view')}</Button></Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>{t('nav.goodsReceived')}</Title>
        <Button type="primary" icon={<PlusOutlined />}>{t('common.create')} GRN</Button>
      </div>
      <Card>
        <Input placeholder={t('common.search')} prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} allowClear />
        <Table columns={columns} dataSource={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize: 20, total, onChange: setPage }} />
      </Card>
    </div>
  );
};

export default GoodsReceivedNote;
