import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Typography, Input, DatePicker, Space, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface AuditEntry {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  performedBy: string;
  changes: Record<string, unknown>;
  ipAddress: string;
  createdAt: string;
}

const actionColors: Record<string, string> = {
  CREATE: 'green',
  UPDATE: 'blue',
  DELETE: 'red',
  APPROVE: 'cyan',
  REJECT: 'orange',
  LOGIN: 'default',
  EXPORT: 'purple',
};

const AuditLog: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<AuditEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.get('/audit-log', { params: { page, limit: 20 } })
      .then((res) => { setData(res.data.data || []); setTotal(res.data.total || 0); })
      .catch(() => { setData([]); setTotal(0); })
      .finally(() => setLoading(false));
  }, [page]);

  const columns: ColumnsType<AuditEntry> = [
    { title: t('audit.timestamp'), dataIndex: 'createdAt', key: 'createdAt', sorter: true, width: 180, render: (v: string) => v ? new Date(v).toLocaleString() : '—' },
    { title: t('audit.user'), dataIndex: 'performedBy', key: 'performedBy' },
    {
      title: t('audit.action'),
      dataIndex: 'action',
      key: 'action',
      render: (action: string) => <Tag color={actionColors[action] || 'default'}>{action}</Tag>,
    },
    { title: t('audit.entity'), dataIndex: 'entityType', key: 'entityType' },
    { title: t('audit.entityId'), dataIndex: 'entityId', key: 'entityId' },
    { title: t('audit.ipAddress'), dataIndex: 'ipAddress', key: 'ipAddress' },
  ];

  return (
    <div>
      <Title level={4}>{t('nav.auditLog')}</Title>
      <Card>
        <Space style={{ marginBottom: 16 }} wrap>
          <Input placeholder={t('common.search')} prefix={<SearchOutlined />} style={{ width: 250 }} allowClear />
          <Select
            placeholder={t('audit.action')}
            style={{ width: 130 }}
            allowClear
            options={[
              { label: t('common.create'), value: 'CREATE' },
              { label: t('common.edit'), value: 'UPDATE' },
              { label: t('common.delete'), value: 'DELETE' },
              { label: t('common.approve'), value: 'APPROVE' },
            ]}
          />
          <RangePicker />
        </Space>
        <Table columns={columns} dataSource={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize: 20, total, onChange: setPage }} scroll={{ x: 1100 }} />
      </Card>
    </div>
  );
};

export default AuditLog;
