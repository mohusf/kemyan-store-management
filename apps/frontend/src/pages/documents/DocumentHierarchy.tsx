import React, { useState, useEffect, useMemo } from 'react';
import { Card, Tree, Tabs, Select, Typography, Tag, Spin, Row, Col, Breadcrumb, Descriptions, Empty } from 'antd';
import { FileTextOutlined, FolderOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import type { DataNode } from 'antd/es/tree';

const { Title, Text } = Typography;

interface IMSDoc {
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
  sortOrder: number;
  children?: IMSDoc[];
}

interface DomainCount {
  domain: string;
  count: number;
}

const TYPE_CODE_COLORS: Record<string, string> = {
  PS: '#1B4F72',
  PR: '#2E86C1',
  WI: '#27AE60',
  FO: '#E67E22',
  LI: '#8E44AD',
  MA: '#C0392B',
};

const DocumentHierarchy: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [domain, setDomain] = useState<string>('IMS');
  const [domainCounts, setDomainCounts] = useState<DomainCount[]>([]);
  const [documents, setDocuments] = useState<IMSDoc[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<IMSDoc | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/documents/domains').then((res) => setDomainCounts(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setSelectedDoc(null);
    api.get('/documents/hierarchy', { params: { domain } })
      .then((res) => setDocuments(res.data))
      .catch(() => setDocuments([]))
      .finally(() => setLoading(false));
  }, [domain]);

  const docToTreeNode = (doc: IMSDoc): DataNode => ({
    key: doc.id,
    title: (
      <span>
        {doc.typeCode && (
          <Tag color={TYPE_CODE_COLORS[doc.typeCode] || 'default'} style={{ marginRight: 4, fontSize: 10 }}>
            {doc.typeCode}
          </Tag>
        )}
        <Text strong style={{ fontSize: 13 }}>{doc.documentNumber}</Text>
        <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>
          {isAr ? doc.titleAr || doc.titleEn : doc.titleEn}
        </Text>
        {doc.documentLevel ? (
          <Tag style={{ marginLeft: 8, fontSize: 10 }}>{doc.documentLevel}</Tag>
        ) : (
          <Tag style={{ marginLeft: 8, fontSize: 10 }}>—</Tag>
        )}
      </span>
    ),
    icon: doc.children?.length ? <FolderOutlined /> : <FileTextOutlined />,
    children: doc.children?.map(docToTreeNode),
  });

  const treeData = useMemo(() => documents.map(docToTreeNode), [documents, isAr]);

  const allDocFlat = useMemo(() => {
    const flat: IMSDoc[] = [];
    const walk = (docs: IMSDoc[]) => {
      for (const d of docs) {
        flat.push(d);
        if (d.children) walk(d.children);
      }
    };
    walk(documents);
    return flat;
  }, [documents]);

  const handleSelect = (selectedKeys: React.Key[]) => {
    if (selectedKeys.length) {
      const doc = allDocFlat.find((d) => d.id === selectedKeys[0]);
      setSelectedDoc(doc || null);
    }
  };

  const domainTabs = [
    { key: 'IMS', label: `IMS (${domainCounts.find((d) => d.domain === 'IMS')?.count || 0})` },
    { key: 'GMP', label: `GMP (${domainCounts.find((d) => d.domain === 'GMP')?.count || 0})` },
    { key: 'QLY', label: `QLY (${domainCounts.find((d) => d.domain === 'QLY')?.count || 0})` },
    { key: 'ENV', label: `ENV (${domainCounts.find((d) => d.domain === 'ENV')?.count || 0})` },
    { key: 'OHS', label: `OHS (${domainCounts.find((d) => d.domain === 'OHS')?.count || 0})` },
  ];

  return (
    <div>
      <Title level={3}>{t('ims.title', 'IMS Document Hierarchy')}</Title>
      <Tabs activeKey={domain} onChange={setDomain} items={domainTabs} style={{ marginBottom: 16 }} />
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Card title={t('ims.documentTree', 'Document Tree')} style={{ minHeight: 500 }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div>
            ) : treeData.length ? (
              <Tree
                showIcon
                defaultExpandAll
                treeData={treeData}
                onSelect={handleSelect}
                style={{ fontSize: 13 }}
              />
            ) : (
              <Empty description={t('common.noData')} />
            )}
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title={t('ims.documentDetail', 'Document Detail')} style={{ minHeight: 500 }}>
            {selectedDoc ? (
              <Descriptions column={1} bordered size="small">
                <Descriptions.Item label={t('common.documentNumber')}>{selectedDoc.documentNumber}</Descriptions.Item>
                <Descriptions.Item label={t('common.title')}>
                  {isAr ? selectedDoc.titleAr || selectedDoc.titleEn : selectedDoc.titleEn}
                </Descriptions.Item>
                <Descriptions.Item label={t('ims.typeCode', 'Type Code')}>
                  {selectedDoc.typeCode && (
                    <Tag color={TYPE_CODE_COLORS[selectedDoc.typeCode]}>{selectedDoc.typeCode}</Tag>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label={t('ims.level', 'Level')}>
                  {selectedDoc.documentLevel || '—'}
                </Descriptions.Item>
                <Descriptions.Item label={t('ims.chapter', 'Chapter')}>
                  {selectedDoc.chapter ?? '—'}
                </Descriptions.Item>
                <Descriptions.Item label={t('ims.domain', 'Domain')}>{selectedDoc.domain}</Descriptions.Item>
                <Descriptions.Item label={t('common.revision')}>{selectedDoc.version}</Descriptions.Item>
                <Descriptions.Item label={t('common.status')}>
                  <Tag color={selectedDoc.status === 'active' ? 'green' : 'default'}>{selectedDoc.status}</Tag>
                </Descriptions.Item>
                {selectedDoc.children && selectedDoc.children.length > 0 && (
                  <Descriptions.Item label={t('ims.childDocuments', 'Child Documents')}>
                    {selectedDoc.children.map((c) => (
                      <Tag key={c.id} style={{ marginBottom: 4 }}>{c.documentNumber}</Tag>
                    ))}
                  </Descriptions.Item>
                )}
              </Descriptions>
            ) : (
              <Empty description={t('ims.selectDocument', 'Select a document from the tree')} />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DocumentHierarchy;
