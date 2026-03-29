import React from 'react';
import { Table, Card, Tag, Typography, Input, DatePicker, Space, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  ipAddress: string;
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

  const columns: ColumnsType<AuditEntry> = [
    { title: t('audit.timestamp'), dataIndex: 'timestamp', key: 'timestamp', sorter: true, width: 180 },
    { title: t('audit.user'), dataIndex: 'user', key: 'user' },
    {
      title: t('audit.action'),
      dataIndex: 'action',
      key: 'action',
      render: (action: string) => <Tag color={actionColors[action]}>{action}</Tag>,
    },
    { title: t('audit.entity'), dataIndex: 'entity', key: 'entity' },
    { title: t('audit.entityId'), dataIndex: 'entityId', key: 'entityId' },
    { title: t('audit.details'), dataIndex: 'details', key: 'details', ellipsis: true },
    { title: t('audit.ipAddress'), dataIndex: 'ipAddress', key: 'ipAddress' },
  ];

  const mockData: AuditEntry[] = [
    { id: '1', timestamp: '2026-03-29 10:45:00', user: 'Ahmed Hassan', action: 'CREATE', entity: 'Requisition', entityId: 'REQ-2026-0045', details: 'Created material requisition for Lab A', ipAddress: '192.168.1.100' },
    { id: '2', timestamp: '2026-03-29 10:30:00', user: 'Sara Ali', action: 'APPROVE', entity: 'Requisition', entityId: 'REQ-2026-0044', details: 'Approved requisition for Production dept', ipAddress: '192.168.1.105' },
    { id: '3', timestamp: '2026-03-29 09:15:00', user: 'Dr. Fatima Noor', action: 'UPDATE', entity: 'Inspection', entityId: 'QC-2026-0120', details: 'Updated inspection result to PASSED', ipAddress: '192.168.1.110' },
    { id: '4', timestamp: '2026-03-29 08:00:00', user: 'Omar Khalid', action: 'CREATE', entity: 'GRN', entityId: 'GRN-2026-0045', details: 'Received goods from AcidSupply Co', ipAddress: '192.168.1.102' },
    { id: '5', timestamp: '2026-03-28 16:30:00', user: 'Admin', action: 'EXPORT', entity: 'Report', entityId: 'RPT-INV-032026', details: 'Exported monthly inventory report', ipAddress: '192.168.1.101' },
    { id: '6', timestamp: '2026-03-28 08:05:00', user: 'Ahmed Hassan', action: 'LOGIN', entity: 'Auth', entityId: '-', details: 'User logged in', ipAddress: '192.168.1.100' },
  ];

  return (
    <div>
      <Title level={4}>{t('nav.auditLog')}</Title>
      <Card>
        <Space style={{ marginBottom: 16 }} wrap>
          <Input
            placeholder={t('common.search')}
            prefix={<SearchOutlined />}
            style={{ width: 250 }}
            allowClear
          />
          <Select
            placeholder={t('audit.action')}
            style={{ width: 130 }}
            allowClear
            options={[
              { label: t('common.create'), value: 'CREATE' },
              { label: t('common.edit'), value: 'UPDATE' },
              { label: t('common.delete'), value: 'DELETE' },
              { label: t('common.approve'), value: 'APPROVE' },
              { label: t('common.reject'), value: 'REJECT' },
              { label: t('common.login'), value: 'LOGIN' },
              { label: t('common.export'), value: 'EXPORT' },
            ]}
          />
          <Select
            placeholder={t('audit.entity')}
            style={{ width: 150 }}
            allowClear
            options={[
              { label: 'Requisition', value: 'Requisition' },
              { label: 'PurchaseOrder', value: 'PurchaseOrder' },
              { label: 'GRN', value: 'GRN' },
              { label: 'Inspection', value: 'Inspection' },
              { label: 'Material', value: 'Material' },
            ]}
          />
          <RangePicker />
        </Space>
        <Table
          columns={columns}
          dataSource={mockData}
          rowKey="id"
          pagination={{ pageSize: 20, showSizeChanger: true, showTotal: (total) => `${t('common.total')}: ${total}` }}
          scroll={{ x: 1100 }}
        />
      </Card>
    </div>
  );
};

export default AuditLog;
