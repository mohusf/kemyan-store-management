import React from 'react';
import { Table, Card, Button, Tag, Typography, Space, Input } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Requisition {
  id: string;
  number: string;
  requestedBy: string;
  department: string;
  date: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  itemCount: number;
}

const statusColors: Record<string, string> = {
  draft: 'default',
  pending: 'processing',
  approved: 'success',
  rejected: 'error',
};

const priorityColors: Record<string, string> = {
  low: 'default',
  medium: 'blue',
  high: 'orange',
  urgent: 'red',
};

const RequisitionList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns: ColumnsType<Requisition> = [
    { title: '#', dataIndex: 'number', key: 'number', sorter: true },
    { title: t('requisitions.requestedBy'), dataIndex: 'requestedBy', key: 'requestedBy' },
    { title: t('requisitions.department'), dataIndex: 'department', key: 'department' },
    { title: t('common.date'), dataIndex: 'date', key: 'date', sorter: true },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={statusColors[status]}>
          {t(`requisitions.${status}Status`)}
        </Tag>
      ),
    },
    {
      title: t('requisitions.priority'),
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => (
        <Tag color={priorityColors[priority]}>{priority.toUpperCase()}</Tag>
      ),
    },
    {
      title: t('common.actions'),
      key: 'actions',
      render: (_: unknown, record: Requisition) => (
        <Space>
          <Button type="link" onClick={() => navigate(`/requisitions/${record.id}`)}>
            {t('common.view')}
          </Button>
        </Space>
      ),
    },
  ];

  const mockData: Requisition[] = [
    { id: '1', number: 'REQ-2026-0045', requestedBy: 'Ahmed Hassan', department: 'Lab A', date: '2026-03-28', status: 'pending', priority: 'high', itemCount: 3 },
    { id: '2', number: 'REQ-2026-0044', requestedBy: 'Sara Ali', department: 'Production', date: '2026-03-27', status: 'approved', priority: 'medium', itemCount: 5 },
    { id: '3', number: 'REQ-2026-0043', requestedBy: 'Omar Khalid', department: 'QC Lab', date: '2026-03-26', status: 'draft', priority: 'low', itemCount: 2 },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>{t('requisitions.title')}</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/requisitions/new')}>
          {t('nav.newRequisition')}
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

export default RequisitionList;
