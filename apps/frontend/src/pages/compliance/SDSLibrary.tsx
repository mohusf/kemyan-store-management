import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Typography, Input, Button, Space } from 'antd';
import { SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface SDSRecord {
  id: string;
  materialId: string;
  version: string;
  signalWord: string;
  hazardStatements: string[];
  precautionaryStatements: string[];
  ghsPictograms: string[];
  status: string;
  createdAt: string;
}

const SDSLibrary: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<SDSRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.get('/compliance/sds', { params: { page, limit: 20 } })
      .then((res) => { setData(res.data.data || []); setTotal(res.data.total || 0); })
      .catch(() => { setData([]); setTotal(0); })
      .finally(() => setLoading(false));
  }, [page]);

  const columns: ColumnsType<SDSRecord> = [
    { title: t('common.code'), dataIndex: 'materialId', key: 'materialId' },
    { title: t('common.revision'), dataIndex: 'version', key: 'version' },
    {
      title: t('compliance.signalWord'),
      dataIndex: 'signalWord',
      key: 'signalWord',
      render: (word: string) => (
        <Tag color={word === 'Danger' ? 'red' : word === 'Warning' ? 'orange' : 'default'}>{word || '—'}</Tag>
      ),
    },
    {
      title: t('compliance.hazardStatements'),
      dataIndex: 'hazardStatements',
      key: 'hazardStatements',
      render: (stmts: string[]) => stmts?.length ? (
        <Space direction="vertical" size={0}>
          {stmts.slice(0, 2).map((s, i) => <span key={i} style={{ fontSize: 12 }}>{s}</span>)}
          {stmts.length > 2 && <Tag>+{stmts.length - 2} more</Tag>}
        </Space>
      ) : '—',
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => <Tag color={s === 'active' ? 'green' : 'default'}>{s}</Tag>,
    },
    { title: t('common.date'), dataIndex: 'createdAt', key: 'createdAt', render: (v: string) => v ? new Date(v).toLocaleDateString() : '—' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>{t('compliance.sdsTitle')}</Title>
        <Button type="primary" icon={<UploadOutlined />}>{t('common.import')} SDS</Button>
      </div>
      <Card>
        <Input placeholder={t('common.search')} prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} allowClear />
        <Table columns={columns} dataSource={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize: 20, total, onChange: setPage }} scroll={{ x: 1000 }} />
      </Card>
    </div>
  );
};

export default SDSLibrary;
