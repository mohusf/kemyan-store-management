import React from 'react';
import { Table, Card, Tag, Typography, Input, Button, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplier: string;
  date: string;
  deliveryDate: string;
  itemCount: number;
  totalAmount: number;
  currency: string;
  status: 'draft' | 'sent' | 'confirmed' | 'partial' | 'completed' | 'cancelled';
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

  const columns: ColumnsType<PurchaseOrder> = [
    { title: t('procurement.orderNumber'), dataIndex: 'orderNumber', key: 'orderNumber', sorter: true },
    { title: t('procurement.supplier'), dataIndex: 'supplier', key: 'supplier' },
    { title: t('common.date'), dataIndex: 'date', key: 'date', sorter: true },
    { title: t('procurement.deliveryDate'), dataIndex: 'deliveryDate', key: 'deliveryDate' },
    { title: 'Items', dataIndex: 'itemCount', key: 'itemCount' },
    {
      title: t('common.total'),
      key: 'total',
      render: (_: unknown, r: PurchaseOrder) => `${r.totalAmount.toLocaleString()} ${r.currency}`,
    },
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
        <Space>
          <Button type="link">{t('common.view')}</Button>
        </Space>
      ),
    },
  ];

  const mockData: PurchaseOrder[] = [
    { id: '1', orderNumber: 'PO-2026-0089', supplier: 'ChemCo International', date: '2026-03-25', deliveryDate: '2026-04-10', itemCount: 5, totalAmount: 45000, currency: 'SAR', status: 'sent' },
    { id: '2', orderNumber: 'PO-2026-0088', supplier: 'SolvChem Arabia', date: '2026-03-22', deliveryDate: '2026-04-05', itemCount: 3, totalAmount: 28500, currency: 'SAR', status: 'confirmed' },
    { id: '3', orderNumber: 'PO-2026-0087', supplier: 'AcidSupply Co', date: '2026-03-18', deliveryDate: '2026-03-30', itemCount: 2, totalAmount: 12000, currency: 'SAR', status: 'completed' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>{t('nav.purchaseOrders')}</Title>
        <Button type="primary" icon={<PlusOutlined />}>
          {t('common.create')} PO
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
          pagination={{ pageSize: 10, showSizeChanger: true }}
        />
      </Card>
    </div>
  );
};

export default PurchaseOrderList;
