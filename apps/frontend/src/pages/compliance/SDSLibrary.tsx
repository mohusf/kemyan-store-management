import React from 'react';
import { Table, Card, Tag, Typography, Input, Button, Space } from 'antd';
import { SearchOutlined, FileTextOutlined, UploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import GHSPictogram from '../../components/common/GHSPictogram';
import type { GHSCode } from '../../components/common/GHSPictogram';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface SDSRecord {
  id: string;
  materialName: string;
  casNumber: string;
  ghsCodes: GHSCode[];
  signalWord: 'Danger' | 'Warning' | 'None';
  hazardStatements: string[];
  revision: string;
  lastUpdated: string;
  hasDocument: boolean;
}

const SDSLibrary: React.FC = () => {
  const { t } = useTranslation();

  const columns: ColumnsType<SDSRecord> = [
    { title: t('common.name'), dataIndex: 'materialName', key: 'materialName', sorter: true },
    { title: t('materials.casNumber'), dataIndex: 'casNumber', key: 'casNumber' },
    {
      title: t('compliance.ghsClassification'),
      dataIndex: 'ghsCodes',
      key: 'ghsCodes',
      width: 200,
      render: (codes: GHSCode[]) => <GHSPictogram codes={codes} size={30} />,
    },
    {
      title: t('compliance.signalWord'),
      dataIndex: 'signalWord',
      key: 'signalWord',
      render: (word: string) => (
        <Tag color={word === 'Danger' ? 'red' : word === 'Warning' ? 'orange' : 'default'}>
          {word}
        </Tag>
      ),
    },
    {
      title: t('compliance.hazardStatements'),
      dataIndex: 'hazardStatements',
      key: 'hazardStatements',
      render: (statements: string[]) => (
        <Space direction="vertical" size={0}>
          {statements.slice(0, 2).map((s, i) => (
            <span key={i} style={{ fontSize: 12 }}>{s}</span>
          ))}
          {statements.length > 2 && (
            <Tag>+{statements.length - 2} more</Tag>
          )}
        </Space>
      ),
    },
    { title: 'Revision', dataIndex: 'revision', key: 'revision' },
    { title: 'Last Updated', dataIndex: 'lastUpdated', key: 'lastUpdated' },
    {
      title: t('common.actions'),
      key: 'actions',
      render: (_: unknown, record: SDSRecord) => (
        <Space>
          {record.hasDocument && (
            <Button type="link" icon={<FileTextOutlined />}>
              {t('common.view')} SDS
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const mockData: SDSRecord[] = [
    { id: '1', materialName: 'Sodium Hydroxide', casNumber: '1310-73-2', ghsCodes: ['GHS05', 'GHS07'], signalWord: 'Danger', hazardStatements: ['H314: Causes severe skin burns', 'H318: Causes serious eye damage'], revision: '5.0', lastUpdated: '2026-01-15', hasDocument: true },
    { id: '2', materialName: 'Hydrochloric Acid', casNumber: '7647-01-0', ghsCodes: ['GHS05', 'GHS07'], signalWord: 'Danger', hazardStatements: ['H314: Causes severe skin burns', 'H335: May cause respiratory irritation'], revision: '4.2', lastUpdated: '2025-11-20', hasDocument: true },
    { id: '3', materialName: 'Ethanol', casNumber: '64-17-5', ghsCodes: ['GHS02', 'GHS07'], signalWord: 'Danger', hazardStatements: ['H225: Highly flammable liquid and vapour', 'H319: Causes serious eye irritation'], revision: '3.1', lastUpdated: '2025-09-10', hasDocument: true },
    { id: '4', materialName: 'Acetone', casNumber: '67-64-1', ghsCodes: ['GHS02', 'GHS07'], signalWord: 'Danger', hazardStatements: ['H225: Highly flammable liquid and vapour', 'H319: Causes serious eye irritation', 'H336: May cause drowsiness'], revision: '4.0', lastUpdated: '2026-02-28', hasDocument: true },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>{t('compliance.sdsTitle')}</Title>
        <Button type="primary" icon={<UploadOutlined />}>
          {t('common.import')} SDS
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
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default SDSLibrary;
