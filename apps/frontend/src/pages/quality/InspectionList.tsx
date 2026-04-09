import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Typography, Input, Button } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Inspection {
  id: string;
  batchId: string;
  inspectorId: string;
  result: string;
  parameters: Record<string, unknown>;
  notes: string;
  inspectedAt: string;
}

const resultColors: Record<string, string> = {
  passed: 'green',
  failed: 'red',
  conditional: 'orange',
};

const InspectionList: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<Inspection[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.get('/quality/inspections', { params: { page, limit: 20 } })
      .then((res) => { setData(res.data.data || []); setTotal(res.data.total || 0); })
      .catch(() => { setData([]); setTotal(0); })
      .finally(() => setLoading(false));
  }, [page]);

  const columns: ColumnsType<Inspection> = [
    { title: t('common.date'), dataIndex: 'inspectedAt', key: 'inspectedAt', render: (v: string) => v ? new Date(v).toLocaleDateString() : '—' },
    { title: t('inventory.batchNumber'), dataIndex: 'batchId', key: 'batchId' },
    {
      title: t('quality.inspectionResult'),
      dataIndex: 'result',
      key: 'result',
      render: (result: string) => <Tag color={resultColors[result] || 'default'}>{result}</Tag>,
    },
    { title: t('common.notes'), dataIndex: 'notes', key: 'notes', ellipsis: true },
    {
      title: t('common.actions'),
      key: 'actions',
      render: () => <Button type="link">{t('common.view')}</Button>,
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>{t('nav.inspections')}</Title>
        <Button type="primary" icon={<PlusOutlined />}>{t('common.create')}</Button>
      </div>
      <Card>
        <Input placeholder={t('common.search')} prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} allowClear />
        <Table columns={columns} dataSource={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize: 20, total, onChange: setPage }} />
      </Card>
    </div>
  );
};

export default InspectionList;
