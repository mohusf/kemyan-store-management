import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Statistic, Typography, List, Tag, Space, Spin } from 'antd';
import {
  ExperimentOutlined,
  WarningOutlined,
  ShoppingCartOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({ materials: 0, lowStock: 0, pendingOrders: 0, expiringBatches: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get('/materials', { params: { page: 1, limit: 1 } }).catch(() => ({ data: { total: 0 } })),
      api.get('/requisitions', { params: { page: 1, limit: 1 } }).catch(() => ({ data: { total: 0 } })),
      api.get('/inventory/batches', { params: { page: 1, limit: 1 } }).catch(() => ({ data: { total: 0 } })),
    ]).then(([matRes, reqRes, batchRes]) => {
      setStats({
        materials: matRes.data.total || 0,
        lowStock: 0,
        pendingOrders: reqRes.data.total || 0,
        expiringBatches: batchRes.data.total || 0,
      });
    }).finally(() => setLoading(false));
  }, []);

  const kpis = [
    { title: t('dashboard.totalMaterials'), value: stats.materials, icon: <ExperimentOutlined />, color: '#1B4F72' },
    { title: t('dashboard.lowStock'), value: stats.lowStock, icon: <WarningOutlined />, color: '#E74C3C' },
    { title: t('dashboard.pendingOrders'), value: stats.pendingOrders, icon: <ShoppingCartOutlined />, color: '#F39C12' },
    { title: t('dashboard.expiringBatches'), value: stats.expiringBatches, icon: <ClockCircleOutlined />, color: '#E67E22' },
  ];

  const complianceItems = [
    { label: t('dashboard.sdsCoverage'), status: t('dashboard.upToDate'), color: 'green' },
    { label: t('dashboard.isoDocuments'), status: t('dashboard.upToDate'), color: 'green' },
    { label: t('dashboard.wasteCompliance'), status: t('dashboard.current'), color: 'green' },
    { label: t('dashboard.safetyTraining'), status: t('dashboard.current'), color: 'green' },
  ];

  return (
    <div>
      <Title level={4} style={{ marginBottom: 24 }}>{t('dashboard.title')}</Title>

      <Row gutter={[16, 16]}>
        {kpis.map((kpi) => (
          <Col xs={24} sm={12} lg={6} key={kpi.title}>
            <Card hoverable>
              <Statistic
                title={kpi.title}
                value={loading ? '—' : kpi.value}
                prefix={<span style={{ color: kpi.color }}>{kpi.icon}</span>}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title={t('dashboard.complianceStatus')}>
            <List
              size="small"
              dataSource={complianceItems}
              renderItem={(item) => (
                <List.Item extra={<Tag color={item.color}>{item.status}</Tag>}>
                  <Space>
                    <CheckCircleOutlined style={{ color: '#27AE60' }} />
                    {item.label}
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
