import React, { useState, useEffect } from 'react';
import { Card, Typography, Tag, Descriptions, Collapse, Table, Button, Breadcrumb, Spin, Empty, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';

const { Title, Text } = Typography;

interface DocDetail {
  id: string;
  documentNumber: string;
  titleEn: string;
  titleAr?: string;
  documentLevel?: string;
  typeCode?: string;
  chapter?: number;
  domain?: string;
  version: string;
  status: string;
  children?: DocDetail[];
}

interface BreadcrumbDoc {
  id: string;
  documentNumber: string;
  titleEn: string;
}

const TYPE_CODE_COLORS: Record<string, string> = {
  PS: '#1B4F72',
  PR: '#2E86C1',
  WI: '#27AE60',
  FO: '#E67E22',
  LI: '#8E44AD',
  MA: '#C0392B',
};

const DocumentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [doc, setDoc] = useState<DocDetail | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      api.get(`/documents/${id}`),
      api.get(`/documents/${id}/breadcrumb`),
    ])
      .then(([docRes, bcRes]) => {
        setDoc(docRes.data);
        setBreadcrumb(bcRes.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: 80 }}><Spin size="large" /></div>;
  if (!doc) return <Empty />;

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/documents/hierarchy')}>
          {t('common.back')}
        </Button>
      </Space>

      <Breadcrumb style={{ marginBottom: 16 }}>
        {breadcrumb.map((bc) => (
          <Breadcrumb.Item key={bc.id}>
            <a onClick={() => navigate(`/documents/${bc.id}`)}>{bc.documentNumber}</a>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>

      <Card>
        <Title level={4}>
          {doc.typeCode && (
            <Tag color={TYPE_CODE_COLORS[doc.typeCode]} style={{ marginRight: 8 }}>{doc.typeCode}</Tag>
          )}
          {doc.documentNumber} — {isAr ? doc.titleAr || doc.titleEn : doc.titleEn}
        </Title>
        <Descriptions column={2} bordered size="small" style={{ marginTop: 16 }}>
          <Descriptions.Item label={t('ims.domain', 'Domain')}>{doc.domain || '—'}</Descriptions.Item>
          <Descriptions.Item label={t('ims.level', 'Level')}>{doc.documentLevel || '—'}</Descriptions.Item>
          <Descriptions.Item label={t('ims.chapter', 'Chapter')}>{doc.chapter ?? '—'}</Descriptions.Item>
          <Descriptions.Item label={t('common.revision')}>{doc.version}</Descriptions.Item>
          <Descriptions.Item label={t('common.status')}>
            <Tag color={doc.status === 'active' ? 'green' : 'default'}>{doc.status}</Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {doc.children && doc.children.length > 0 && (
        <Card title={t('ims.childDocuments', 'Child Documents')} style={{ marginTop: 16 }}>
          <Table
            dataSource={doc.children}
            rowKey="id"
            pagination={false}
            size="small"
            onRow={(record) => ({ onClick: () => navigate(`/documents/${record.id}`), style: { cursor: 'pointer' } })}
            columns={[
              {
                title: t('common.documentNumber'),
                dataIndex: 'documentNumber',
                render: (text: string, record: DocDetail) => (
                  <Space>
                    {record.typeCode && <Tag color={TYPE_CODE_COLORS[record.typeCode]}>{record.typeCode}</Tag>}
                    <Text strong>{text}</Text>
                  </Space>
                ),
              },
              {
                title: t('common.title'),
                dataIndex: isAr ? 'titleAr' : 'titleEn',
                render: (text: string, record: DocDetail) => text || record.titleEn,
              },
              {
                title: t('ims.level', 'Level'),
                dataIndex: 'documentLevel',
                width: 80,
                render: (val: string) => val || '—',
              },
              {
                title: t('common.status'),
                dataIndex: 'status',
                width: 100,
                render: (val: string) => <Tag color={val === 'active' ? 'green' : 'default'}>{val}</Tag>,
              },
            ]}
          />
        </Card>
      )}
    </div>
  );
};

export default DocumentDetail;
