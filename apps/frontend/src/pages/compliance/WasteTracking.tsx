import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Typography, Input, Button } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface WasteRecord {
  id: string;
  wasteType: string;
  quantity: number;
  unit: string;
  disposalMethod: string;
  status: string;
  generatedAt: string;
  disposedAt: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: 'orange',
  scheduled: 'processing',
  disposed: 'green',
  documented: 'blue',
};

const WasteTracking: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<WasteRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.get('/compliance/waste', { params: { page, limit: 20 } })
      .then((res) => { setData(res.data.data || []); setTotal(res.data.total || 0); })
      .catch(() => { setData([]); setTotal(0); })
      .finally(() => setLoading(false));
  }, [page]);

  const columns: ColumnsType<WasteRecord> = [
    { title: t('compliance.wasteCategory'), dataIndex: 'wasteType', key: 'wasteType', render: (cat: string) => <Tag color={cat === 'hazardous' ? 'red' : 'green'}>{cat}</Tag> },
    { title: t('common.quantity'), key: 'qty', render: (_: unknown, r: WasteRecord) => `${r.quantity} ${r.unit}` },
    { title: t('compliance.disposalMethod'), dataIndex: 'disposalMethod', key: 'disposalMethod' },
    { title: t('common.generated'), dataIndex: 'generatedAt', key: 'generatedAt', render: (v: string) => v ? new Date(v).toLocaleDateString() : '—' },
    { title: t('common.disposed'), dataIndex: 'disposedAt', key: 'disposedAt', render: (v: string) => v ? new Date(v).toLocaleDateString() : '—' },
    { title: t('common.status'), dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={statusColors[s] || 'default'}>{s}</Tag> },
    { title: t('common.actions'), key: 'actions', render: () => <Button type="link">{t('common.view')}</Button> },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>{t('compliance.wasteTitle')}</Title>
        <Button type="primary" icon={<PlusOutlined />}>{t('common.add')}</Button>
      </div>
      <Card>
        <Input placeholder={t('common.search')} prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} allowClear />
        <Table columns={columns} dataSource={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize: 20, total, onChange: setPage }} />
      </Card>
    </div>
  );
};

export default WasteTracking;
