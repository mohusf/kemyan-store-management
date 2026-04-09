import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Typography, Input, Button, Space, Badge } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface NCR {
  id: string;
  ncrNumber: string;
  title: string;
  severity: string;
  status: string;
  raisedBy: string;
  createdAt: string;
}

const severityColors: Record<string, string> = { minor: 'blue', major: 'orange', critical: 'red' };

const getStatusConfig = (t: (key: string) => string): Record<string, { color: string; label: string }> => ({
  open: { color: 'red', label: t('common.open') },
  investigating: { color: 'processing', label: t('common.investigating') },
  corrective_action: { color: 'orange', label: t('common.correctiveAction') },
  closed: { color: 'green', label: t('common.closed') },
});

const NCRList: React.FC = () => {
  const { t } = useTranslation();
  const statusConfig = getStatusConfig(t);
  const [data, setData] = useState<NCR[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.get('/quality/ncrs', { params: { page, limit: 20 } })
      .then((res) => { setData(res.data.data || []); setTotal(res.data.total || 0); })
      .catch(() => { setData([]); setTotal(0); })
      .finally(() => setLoading(false));
  }, [page]);

  const columns: ColumnsType<NCR> = [
    { title: t('quality.ncrNumber'), dataIndex: 'ncrNumber', key: 'ncrNumber', sorter: true },
    { title: t('common.title'), dataIndex: 'title', key: 'title' },
    {
      title: t('quality.severity'),
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => <Tag color={severityColors[severity] || 'default'}>{severity}</Tag>,
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge status={(statusConfig[status]?.color || 'default') as any} text={statusConfig[status]?.label || status} />
      ),
    },
    { title: t('common.date'), dataIndex: 'createdAt', key: 'createdAt', render: (v: string) => v ? new Date(v).toLocaleDateString() : '—' },
    {
      title: t('common.actions'),
      key: 'actions',
      render: () => <Space><Button type="link">{t('common.view')}</Button></Space>,
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>{t('nav.ncr')}</Title>
        <Button type="primary" icon={<PlusOutlined />}>{t('common.create')} NCR</Button>
      </div>
      <Card>
        <Input placeholder={t('common.search')} prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} allowClear />
        <Table columns={columns} dataSource={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize: 20, total, onChange: setPage }} />
      </Card>
    </div>
  );
};

export default NCRList;
