import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Typography, Input, Badge } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
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
  supplierId: string;
  qualityStatus: string;
  expiryDate: string;
  receivedDate: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  approved: 'green',
  pending: 'orange',
  rejected: 'red',
  quarantine: 'orange',
};

const BatchList: React.FC = () => {
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

  const getExpiryIndicator = (expiryDate: string) => {
    if (!expiryDate) return null;
    const daysUntilExpiry = dayjs(expiryDate).diff(dayjs(), 'day');
    if (daysUntilExpiry < 0) return <Badge status="error" text={t('common.expired')} />;
    if (daysUntilExpiry <= 30) return <Badge status="warning" text={`${daysUntilExpiry} ${t('common.days')}`} />;
    if (daysUntilExpiry <= 90) return <Badge status="processing" text={`${daysUntilExpiry} ${t('common.days')}`} />;
    return <Badge status="success" text={`${daysUntilExpiry} ${t('common.days')}`} />;
  };

  const columns: ColumnsType<Batch> = [
    { title: t('inventory.batchNumber'), dataIndex: 'batchNumber', key: 'batchNumber', sorter: true },
    { title: t('common.quantity'), key: 'qty', render: (_: unknown, r: Batch) => `${r.quantityAvailable} / ${r.quantityReceived}` },
    {
      title: t('inventory.expiryDate'),
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      render: (date: string) => date ? (
        <div>
          <div>{new Date(date).toLocaleDateString()}</div>
          {getExpiryIndicator(date)}
        </div>
      ) : '—',
    },
    {
      title: t('common.status'),
      dataIndex: 'qualityStatus',
      key: 'qualityStatus',
      render: (status: string) => <Tag color={statusColors[status] || 'default'}>{status}</Tag>,
    },
  ];

  return (
    <div>
      <Title level={4}>{t('nav.batches')}</Title>
      <Card>
        <Input placeholder={t('common.search')} prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} allowClear />
        <Table columns={columns} dataSource={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize: 20, total, onChange: setPage }} />
      </Card>
    </div>
  );
};

export default BatchList;
