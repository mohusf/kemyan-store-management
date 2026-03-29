import React from 'react';
import { Card, Col, Row, Statistic, Typography, List, Tag, Space } from 'antd';
import {
  ExperimentOutlined,
  WarningOutlined,
  ShoppingCartOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  const kpis = [
    {
      title: t('dashboard.totalMaterials'),
      value: 1243,
      icon: <ExperimentOutlined />,
      color: '#1B4F72',
    },
    {
      title: t('dashboard.lowStock'),
      value: 18,
      icon: <WarningOutlined />,
      color: '#E74C3C',
    },
    {
      title: t('dashboard.pendingOrders'),
      value: 7,
      icon: <ShoppingCartOutlined />,
      color: '#F39C12',
    },
    {
      title: t('dashboard.expiringBatches'),
      value: 12,
      icon: <ClockCircleOutlined />,
      color: '#E67E22',
    },
  ];

  const recentActivity = [
    { action: 'Material received', detail: 'Sodium Hydroxide - 500kg', time: '2 hours ago' },
    { action: 'Requisition approved', detail: 'REQ-2026-0045', time: '3 hours ago' },
    { action: 'QC inspection passed', detail: 'Batch #B-2026-0312', time: '5 hours ago' },
    { action: 'PO created', detail: 'PO-2026-0089', time: '1 day ago' },
  ];

  return (
    <div>
      <Title level={4} style={{ marginBottom: 24 }}>
        {t('dashboard.title')}
      </Title>

      <Row gutter={[16, 16]}>
        {kpis.map((kpi) => (
          <Col xs={24} sm={12} lg={6} key={kpi.title}>
            <Card hoverable>
              <Statistic
                title={kpi.title}
                value={kpi.value}
                prefix={React.cloneElement(kpi.icon, { style: { color: kpi.color } })}
                valueStyle={{ color: kpi.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title={t('dashboard.recentActivity')}>
            <List
              dataSource={recentActivity}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<CheckCircleOutlined style={{ color: '#27AE60', fontSize: 20 }} />}
                    title={item.action}
                    description={
                      <Space>
                        <span>{item.detail}</span>
                        <Tag>{item.time}</Tag>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title={t('dashboard.complianceStatus')}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>SDS Coverage</span>
                <Tag color="green">98%</Tag>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>ISO 9001 Documents</span>
                <Tag color="green">Up to date</Tag>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Waste Disposal Compliance</span>
                <Tag color="orange">Review needed</Tag>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Safety Training</span>
                <Tag color="green">Current</Tag>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
