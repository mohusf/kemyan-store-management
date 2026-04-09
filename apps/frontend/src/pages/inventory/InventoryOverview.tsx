import React, { useState, useEffect } from 'react';
import { Table, Card, Input, Tag, Typography, Space } from 'antd';
import { SearchOutlined, WarningOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Batch {
  id: string;
  batchNumber: string;
  materialId: string;
  quantityReceived: number;
  quantityAvailable: number;
  unitOfMeasure: string;
  locationId: string;
  qualityStatus: string;
  expiryDate: string;
  createdAt: string;
}

const InventoryOverview: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<Batch[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.get('/inventory/batches', { params: { page, limit: 20 } })
      .then((res) => { setData(res.data.data || []); setTotal(res.data.total || 0); })
      .catch(() => { setData([]); setTotal(0); })
      .finally(() => setLoading(false));
  }, [page]);

  const columns: ColumnsType<Batch> = [
    { title: t('inventory.batchNumber'), dataIndex: 'batchNumber', key: 'batchNumber', sorter: true },
    { title: t('common.quantity'), key: 'qty', render: (_: unknown, r: Batch) => `${r.quantityAvailable} / ${r.quantityReceived}` },
    { title: t('inventory.expiryDate'), dataIndex: 'expiryDate', key: 'expiryDate', render: (v: string) => v ? new Date(v).toLocaleDateString() : '—' },
    {
      title: t('common.status'),
      dataIndex: 'qualityStatus',
      key: 'qualityStatus',
      render: (s: string) => <Tag color={s === 'approved' ? 'green' : s === 'rejected' ? 'red' : 'orange'}>{s}</Tag>,
    },
  ];

  return (
    <div>
      <Title level={4}>{t('nav.inventoryOverview')}</Title>
      <Card>
        <Input placeholder={t('common.search')} prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} allowClear />
        <Table columns={columns} dataSource={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize: 20, total, onChange: setPage }} />
      </Card>
    </div>
  );
};

export default InventoryOverview;
