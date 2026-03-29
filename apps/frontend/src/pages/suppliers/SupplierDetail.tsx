import React from 'react';
import { Card, Descriptions, Tabs, Tag, Button, Space, Typography, Rate, Table, Progress } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

const { Title } = Typography;

const SupplierDetail: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const supplier = {
    id,
    name: 'ChemCo International',
    contactPerson: 'John Smith',
    phone: '+966-11-123-4567',
    email: 'info@chemco.com',
    address: 'Industrial Area, Riyadh, Saudi Arabia',
    certifications: ['ISO 9001', 'ISO 14001'],
    rating: 4.5,
    status: 'active',
  };

  const evaluationScores = [
    { category: t('suppliers.quality'), score: 92 },
    { category: t('suppliers.delivery'), score: 88 },
    { category: t('suppliers.price'), score: 78 },
    { category: t('suppliers.communication'), score: 95 },
    { category: t('suppliers.documentation'), score: 85 },
  ];

  const recentOrders = [
    { key: '1', orderNumber: 'PO-2026-0089', date: '2026-03-25', amount: '45,000 SAR', status: 'sent' },
    { key: '2', orderNumber: 'PO-2026-0075', date: '2026-03-10', amount: '32,000 SAR', status: 'completed' },
    { key: '3', orderNumber: 'PO-2026-0060', date: '2026-02-20', amount: '28,500 SAR', status: 'completed' },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/suppliers')}>
          {t('common.back')}
        </Button>
        <Title level={4} style={{ margin: 0 }}>{supplier.name}</Title>
        <Tag color="green">{supplier.status}</Tag>
      </Space>

      <Tabs
        defaultActiveKey="info"
        items={[
          {
            key: 'info',
            label: t('common.information'),
            children: (
              <Card>
                <Descriptions bordered column={{ xs: 1, sm: 2 }}>
                  <Descriptions.Item label={t('common.name')}>{supplier.name}</Descriptions.Item>
                  <Descriptions.Item label={t('suppliers.contactPerson')}>{supplier.contactPerson}</Descriptions.Item>
                  <Descriptions.Item label={t('suppliers.phone')}>{supplier.phone}</Descriptions.Item>
                  <Descriptions.Item label={t('auth.email')}>{supplier.email}</Descriptions.Item>
                  <Descriptions.Item label={t('common.address')} span={2}>{supplier.address}</Descriptions.Item>
                  <Descriptions.Item label={t('suppliers.certifications')}>
                    <Space>
                      {supplier.certifications.map((cert) => (
                        <Tag key={cert} color="blue">{cert}</Tag>
                      ))}
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label={t('suppliers.rating')}>
                    <Rate disabled value={supplier.rating} allowHalf />
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            ),
          },
          {
            key: 'evaluation',
            label: t('suppliers.evaluationScore'),
            children: (
              <Card>
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                  {evaluationScores.map((item) => (
                    <div key={item.category}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span>{item.category}</span>
                        <span>{item.score}%</span>
                      </div>
                      <Progress
                        percent={item.score}
                        strokeColor={item.score >= 90 ? '#27AE60' : item.score >= 70 ? '#F39C12' : '#E74C3C'}
                        showInfo={false}
                      />
                    </div>
                  ))}
                </Space>
              </Card>
            ),
          },
          {
            key: 'orders',
            label: t('nav.purchaseOrders'),
            children: (
              <Card>
                <Table
                  dataSource={recentOrders}
                  columns={[
                    { title: t('procurement.orderNumber'), dataIndex: 'orderNumber', key: 'orderNumber' },
                    { title: t('common.date'), dataIndex: 'date', key: 'date' },
                    { title: t('common.total'), dataIndex: 'amount', key: 'amount' },
                    {
                      title: t('common.status'),
                      dataIndex: 'status',
                      key: 'status',
                      render: (status: string) => (
                        <Tag color={status === 'completed' ? 'green' : 'processing'}>{status}</Tag>
                      ),
                    },
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

export default SupplierDetail;
