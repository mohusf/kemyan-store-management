import React from 'react';
import { Table, Card, Tag, Typography, Input, Button, Space, Badge } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface NCR {
  id: string;
  ncrNumber: string;
  title: string;
  material: string;
  severity: 'minor' | 'major' | 'critical';
  status: 'open' | 'investigating' | 'corrective_action' | 'closed';
  raisedBy: string;
  raisedDate: string;
  dueDate: string;
}

const severityColors: Record<string, string> = {
  minor: 'blue',
  major: 'orange',
  critical: 'red',
};

const statusConfig: Record<string, { color: string; label: string }> = {
  open: { color: 'red', label: 'Open' },
  investigating: { color: 'processing', label: 'Investigating' },
  corrective_action: { color: 'orange', label: 'Corrective Action' },
  closed: { color: 'green', label: 'Closed' },
};

const NCRList: React.FC = () => {
  const { t } = useTranslation();

  const columns: ColumnsType<NCR> = [
    { title: t('quality.ncrNumber'), dataIndex: 'ncrNumber', key: 'ncrNumber', sorter: true },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: t('common.name'), dataIndex: 'material', key: 'material' },
    {
      title: t('quality.severity'),
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => (
        <Tag color={severityColors[severity]}>{severity.toUpperCase()}</Tag>
      ),
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge
          status={statusConfig[status]?.color as 'processing' | 'error' | 'success' | 'warning' | 'default' | undefined}
          text={statusConfig[status]?.label}
        />
      ),
    },
    { title: 'Raised By', dataIndex: 'raisedBy', key: 'raisedBy' },
    { title: t('common.date'), dataIndex: 'raisedDate', key: 'raisedDate', sorter: true },
    { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate' },
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

  const mockData: NCR[] = [
    { id: '1', ncrNumber: 'NCR-2026-0034', title: 'Ethanol purity below spec', material: 'Ethanol', severity: 'major', status: 'investigating', raisedBy: 'Dr. Fatima Noor', raisedDate: '2026-03-25', dueDate: '2026-04-08' },
    { id: '2', ncrNumber: 'NCR-2026-0033', title: 'Damaged container on delivery', material: 'Sulfuric Acid', severity: 'critical', status: 'corrective_action', raisedBy: 'Ahmed Hassan', raisedDate: '2026-03-20', dueDate: '2026-04-03' },
    { id: '3', ncrNumber: 'NCR-2026-0032', title: 'Missing COA document', material: 'Acetone', severity: 'minor', status: 'closed', raisedBy: 'Sara Ali', raisedDate: '2026-03-15', dueDate: '2026-03-29' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>{t('nav.ncr')}</Title>
        <Button type="primary" icon={<PlusOutlined />}>
          {t('common.create')} NCR
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
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default NCRList;
