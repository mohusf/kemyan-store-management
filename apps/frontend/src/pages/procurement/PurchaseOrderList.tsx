import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Typography, Input, Button, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  status: string;
  totalAmount: number;
  currency: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  draft: 'default',
  sent: 'processing',
  confirmed: 'blue',
  partial: 'orange',
  completed: 'green',
  cancelled: 'red',
};

const PurchaseOrderList: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<PurchaseOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.get('/procurement/purchase-orders', { params: { page, limit: 20 } })
      .then((res) => {
        setData(res.data.data);
        setTotal(res.data.total);
      })
      .catch(() => { setData([]); setTotal(0); })
      .finally(() => setLoading(false));
  }, [page]);

  const columns: ColumnsType<PurchaseOrder> = [
    { title: t('procurement.orderNumber'), dataIndex: 'poNumber', key: 'poNumber', sorter: true },
    { title: t('common.date'), dataIndex: 'createdAt', key: 'createdAt', render: (v: string) => v ? new Date(v).toLocaleDateString() : '—' },
    {
      title: t('common.total'),
      key: 'total',
      render: (_: unknown, r: PurchaseOrder) => r.totalAmount ? `${Number(r.totalAmount).toLocaleString()} ${r.currency || 'SAR'}` : '—',
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={statusColors[status] || 'default'}>{status}</Tag>,
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
        <Title level={4}>{t('nav.purchaseOrders')}</Title>
        <Button type="primary" icon={<PlusOutlined />}>{t('common.create')} PO</Button>
      </div>
      <Card>
        <Input placeholder={t('common.search')} prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} allowClear />
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={{ current: page, pageSize: 20, total, onChange: setPage }}
        />
      </Card>
    </div>
  );
};

export default PurchaseOrderList;
