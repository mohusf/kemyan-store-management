import React from 'react';
import { Card, Descriptions, Tabs, Tag, Button, Space, Typography, Table } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import GHSPictogram from '../../components/common/GHSPictogram';
import type { GHSCode } from '../../components/common/GHSPictogram';

const { Title } = Typography;

const MaterialDetail: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const material = {
    id,
    code: 'MAT-001',
    name: 'Sodium Hydroxide',
    casNumber: '1310-73-2',
    category: 'Base',
    hazardClass: 'Corrosive',
    ghsCodes: ['GHS05', 'GHS07'] as GHSCode[],
    currentStock: 500,
    unit: 'kg',
    minimumStock: 100,
    storageConditions: 'Cool, dry place. Keep away from acids.',
    description: 'White solid, highly caustic metalite base and alkali.',
  };

  const stockHistory = [
    { key: '1', date: '2026-03-28', type: 'Received', quantity: 200, batch: 'B-2026-0312', reference: 'GRN-0045' },
    { key: '2', date: '2026-03-25', type: 'Issued', quantity: -50, batch: 'B-2026-0298', reference: 'REQ-0042' },
    { key: '3', date: '2026-03-20', type: 'Received', quantity: 350, batch: 'B-2026-0298', reference: 'GRN-0041' },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/materials')}>
          {t('common.back')}
        </Button>
        <Title level={4} style={{ margin: 0 }}>
          {material.name} ({material.code})
        </Title>
      </Space>

      <Tabs
        defaultActiveKey="details"
        items={[
          {
            key: 'details',
            label: t('common.description'),
            children: (
              <Card>
                <Descriptions bordered column={{ xs: 1, sm: 2 }}>
                  <Descriptions.Item label={t('common.code')}>{material.code}</Descriptions.Item>
                  <Descriptions.Item label={t('common.name')}>{material.name}</Descriptions.Item>
                  <Descriptions.Item label={t('materials.casNumber')}>{material.casNumber}</Descriptions.Item>
                  <Descriptions.Item label={t('materials.category')}>
                    <Tag>{material.category}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label={t('materials.hazardClass')}>
                    <Tag color="red">{material.hazardClass}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label={t('materials.currentStock')}>
                    {material.currentStock} {material.unit}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('materials.minimumStock')}>
                    {material.minimumStock} {material.unit}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('materials.storageConditions')}>
                    {material.storageConditions}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('compliance.ghsClassification')} span={2}>
                    <GHSPictogram codes={material.ghsCodes} />
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            ),
          },
          {
            key: 'stock',
            label: t('inventory.title'),
            children: (
              <Card>
                <Table
                  dataSource={stockHistory}
                  columns={[
                    { title: t('common.date'), dataIndex: 'date', key: 'date' },
                    {
                      title: t('inventory.transactionType'),
                      dataIndex: 'type',
                      key: 'type',
                      render: (type: string) => (
                        <Tag color={type === 'Received' ? 'green' : 'orange'}>{type}</Tag>
                      ),
                    },
                    { title: t('common.quantity'), dataIndex: 'quantity', key: 'quantity' },
                    { title: t('inventory.batchNumber'), dataIndex: 'batch', key: 'batch' },
                    { title: 'Reference', dataIndex: 'reference', key: 'reference' },
                  ]}
                  pagination={false}
                />
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
};

export default MaterialDetail;
