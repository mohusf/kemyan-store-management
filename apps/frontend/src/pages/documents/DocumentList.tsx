import React from 'react';
import { Table, Card, Tag, Typography, Input, Button, Space } from 'antd';
import { UploadOutlined, SearchOutlined, FileTextOutlined, FilePdfOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Document {
  id: string;
  documentNumber: string;
  title: string;
  category: string;
  revision: string;
  status: 'current' | 'draft' | 'obsolete' | 'under_review';
  owner: string;
  lastReviewed: string;
  nextReview: string;
  fileType: 'pdf' | 'doc' | 'xls';
}

const statusColors: Record<string, string> = {
  current: 'green',
  draft: 'default',
  obsolete: 'red',
  under_review: 'orange',
};

const DocumentList: React.FC = () => {
  const { t } = useTranslation();

  const columns: ColumnsType<Document> = [
    {
      title: '',
      key: 'icon',
      width: 40,
      render: (_: unknown, record: Document) => (
        record.fileType === 'pdf' ? <FilePdfOutlined style={{ color: '#E74C3C' }} /> : <FileTextOutlined style={{ color: '#1B4F72' }} />
      ),
    },
    { title: t('common.documentNumber'), dataIndex: 'documentNumber', key: 'documentNumber', sorter: true },
    { title: t('common.title'), dataIndex: 'title', key: 'title' },
    {
      title: t('materials.category'),
      dataIndex: 'category',
      key: 'category',
      render: (cat: string) => <Tag>{cat}</Tag>,
    },
    { title: t('common.revision'), dataIndex: 'revision', key: 'revision' },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={statusColors[status]}>{status.replace('_', ' ').toUpperCase()}</Tag>,
    },
    { title: t('common.owner'), dataIndex: 'owner', key: 'owner' },
    { title: t('common.lastReviewed'), dataIndex: 'lastReviewed', key: 'lastReviewed' },
    { title: t('common.nextReview'), dataIndex: 'nextReview', key: 'nextReview' },
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

  const mockData: Document[] = [
    { id: '1', documentNumber: 'QMS-SOP-001', title: 'Material Receiving Procedure', category: 'SOP', revision: '3.0', status: 'current', owner: 'Quality Dept', lastReviewed: '2026-01-15', nextReview: '2027-01-15', fileType: 'pdf' },
    { id: '2', documentNumber: 'QMS-SOP-002', title: 'Chemical Storage Guidelines', category: 'SOP', revision: '2.1', status: 'current', owner: 'HSE Dept', lastReviewed: '2025-11-20', nextReview: '2026-11-20', fileType: 'pdf' },
    { id: '3', documentNumber: 'QMS-FRM-010', title: 'Inspection Checklist Template', category: 'Form', revision: '4.0', status: 'under_review', owner: 'Quality Dept', lastReviewed: '2026-03-01', nextReview: '2026-04-01', fileType: 'doc' },
    { id: '4', documentNumber: 'QMS-POL-001', title: 'Quality Policy', category: 'Policy', revision: '1.2', status: 'current', owner: 'Management', lastReviewed: '2026-02-10', nextReview: '2027-02-10', fileType: 'pdf' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>{t('nav.documents')}</Title>
        <Button type="primary" icon={<UploadOutlined />}>
          {t('common.import')}
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
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  );
};

export default DocumentList;
