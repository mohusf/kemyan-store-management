import React from 'react';
import { Card, Row, Col, Typography, Select, DatePicker, Space, Statistic } from 'antd';
import { useTranslation } from 'react-i18next';
import ReactEChartsCore from 'echarts-for-react';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const ReportDashboard: React.FC = () => {
  const { t } = useTranslation();

  const inventoryTrendOption = {
    title: { text: 'Inventory Value Trend', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yAxis: { type: 'value', name: 'SAR' },
    series: [
      {
        name: 'Inventory Value',
        type: 'line',
        data: [850000, 920000, 880000, 950000, 1020000, 980000],
        smooth: true,
        areaStyle: { opacity: 0.1 },
        color: '#1B4F72',
      },
    ],
  };

  const categoryDistributionOption = {
    title: { text: 'Materials by Category', left: 'center' },
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 35, name: 'Acids' },
          { value: 28, name: 'Bases' },
          { value: 22, name: 'Solvents' },
          { value: 15, name: 'Salts' },
          { value: 12, name: 'Other' },
        ],
        color: ['#E74C3C', '#1B4F72', '#F39C12', '#27AE60', '#3498DB'],
      },
    ],
  };

  const consumptionOption = {
    title: { text: 'Monthly Consumption', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yAxis: { type: 'value', name: 'kg' },
    series: [
      { name: 'Consumed', type: 'bar', data: [420, 380, 510, 450, 490, 530], color: '#1B4F72' },
      { name: 'Received', type: 'bar', data: [500, 350, 600, 400, 550, 480], color: '#27AE60' },
    ],
  };

  const supplierPerformanceOption = {
    title: { text: 'Supplier Performance', left: 'center' },
    tooltip: { trigger: 'axis' },
    radar: {
      indicator: [
        { name: 'Quality', max: 100 },
        { name: 'Delivery', max: 100 },
        { name: 'Price', max: 100 },
        { name: 'Response', max: 100 },
        { name: 'Documentation', max: 100 },
      ],
    },
    series: [
      {
        type: 'radar',
        data: [
          { value: [92, 88, 78, 95, 85], name: 'ChemCo' },
          { value: [80, 92, 85, 75, 90], name: 'SolvChem' },
        ],
      },
    ],
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>{t('nav.reports')}</Title>
        <Space>
          <Select
            defaultValue="monthly"
            style={{ width: 120 }}
            options={[
              { label: 'Daily', value: 'daily' },
              { label: 'Weekly', value: 'weekly' },
              { label: 'Monthly', value: 'monthly' },
              { label: 'Yearly', value: 'yearly' },
            ]}
          />
          <RangePicker />
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={12} sm={6}>
          <Card><Statistic title="Total Materials" value={1243} /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card><Statistic title="Active Suppliers" value={24} /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card><Statistic title="Open POs" value={7} valueStyle={{ color: '#F39C12' }} /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card><Statistic title="QC Pass Rate" value={94.5} suffix="%" valueStyle={{ color: '#27AE60' }} /></Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card>
            <ReactEChartsCore option={inventoryTrendOption} style={{ height: 350 }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card>
            <ReactEChartsCore option={categoryDistributionOption} style={{ height: 350 }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card>
            <ReactEChartsCore option={consumptionOption} style={{ height: 350 }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card>
            <ReactEChartsCore option={supplierPerformanceOption} style={{ height: 350 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ReportDashboard;
