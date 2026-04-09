import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Typography, Input, Button, Space } from 'antd';
import { UploadOutlined, SearchOutlined, FileTextOutlined, FilePdfOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Document {
  id: string;
  documentNumber: string;
  titleEn: string;
  titleAr?: string;
  category: string;
  version: string;
  status: string;
  typeCode?: string;
  domain?: string;
  effectiveDate?: string;
  reviewDate?: string;
}

const statusColors: Record<string, string> = {
  active: 'green',
  draft: 'default',
  obsolete: 'red',
  under_review: 'orange',
  archived: 'default',
  superseded: 'volcano',
};

const DocumentList: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isAr = i18n.language === 'ar';
  const [data, setData] = useState<Document[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.get('/documents', { params: { page, limit: 20 } })
      .then((res) => { setData(res.data.data || []); setTotal(res.data.total || 0); })
      .catch(() => { setData([]); setTotal(0); })
      .finally(() => setLoading(false));
  }, [page]);

  const columns: ColumnsType<Document> = [
    {
      title: '',
      key: 'icon',
      width: 40,
      render: () => <FilePdfOutlined style={{ color: '#E74C3C' }} />,
    },
    { title: t('common.documentNumber'), dataIndex: 'documentNumber', key: 'documentNumber', sorter: true },
    {
      title: t('common.title'),
      key: 'title',
      render: (_: unknown, record: Document) => isAr ? record.titleAr || record.titleEn : record.titleEn,
    },
    {
      title: t('ims.typeCode', 'Type'),
      dataIndex: 'typeCode',
      key: 'typeCode',
      render: (tc: string) => tc ? <Tag>{tc}</Tag> : '—',
    },
    {
      title: t('ims.domain', 'Domain'),
      dataIndex: 'domain',
      key: 'domain',
      render: (d: string) => d ? <Tag color="blue">{d}</Tag> : '—',
    },
    { title: t('common.revision'), dataIndex: 'version', key: 'version' },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={statusColors[status] || 'default'}>{status}</Tag>,
    },
    {
      title: t('common.nextReview'),
      dataIndex: 'reviewDate',
      key: 'reviewDate',
      render: (v: string) => v ? new Date(v).toLocaleDateString() : '—',
    },
    {
      title: t('common.actions'),
      key: 'actions',
      render: (_: unknown, record: Document) => (
        <Space><Button type="link" onClick={() => navigate(`/documents/${record.id}`)}>{t('common.view')}</Button></Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>{t('nav.documentList', 'Document List')}</Title>
        <Button type="primary" icon={<UploadOutlined />}>{t('common.import')}</Button>
      </div>
      <Card>
        <Input placeholder={t('common.search')} prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} allowClear />
        <Table columns={columns} dataSource={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize: 20, total, onChange: setPage }} scroll={{ x: 1200 }} />
      </Card>
    </div>
  );
};

export default DocumentList;
