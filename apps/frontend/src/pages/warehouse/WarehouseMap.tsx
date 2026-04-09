import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Tag, Space, Spin, Statistic } from 'antd';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';

const { Title, Text } = Typography;

interface Zone {
  id: string;
  code: string;
  nameEn: string;
  nameAr?: string;
  zoneType: string;
  maxTemperature: number;
  maxHumidity: number;
  safetyEquipment: Record<string, unknown>;
}

const zoneColors: Record<string, string> = {
  raw_material: '#1B4F72',
  finished_goods: '#27AE60',
  quarantine: '#E67E22',
  hazardous: '#E74C3C',
  cold_storage: '#2980B9',
};

const WarehouseMap: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/warehouse/zones')
      .then((res) => setZones(Array.isArray(res.data) ? res.data : res.data.data || []))
      .catch(() => setZones([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: 80 }}><Spin size="large" /></div>;

  return (
    <div>
      <Title level={4}>{t('warehouse.title')}</Title>
      <Row gutter={[16, 16]}>
        {zones.map((zone) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={zone.id}>
            <Card
              title={
                <Space>
                  <div style={{ width: 12, height: 12, borderRadius: 2, background: zoneColors[zone.zoneType] || '#666' }} />
                  <Text strong>{zone.code}</Text>
                </Space>
              }
              size="small"
              style={{ borderTop: `3px solid ${zoneColors[zone.zoneType] || '#666'}` }}
            >
              <Text>{isAr ? zone.nameAr || zone.nameEn : zone.nameEn}</Text>
              <div style={{ marginTop: 8 }}>
                <Tag>{zone.zoneType}</Tag>
              </div>
              <Row gutter={16} style={{ marginTop: 12 }}>
                <Col span={12}>
                  <Statistic title="Max Temp" value={zone.maxTemperature} suffix="°C" valueStyle={{ fontSize: 14 }} />
                </Col>
                <Col span={12}>
                  <Statistic title="Max Humidity" value={zone.maxHumidity} suffix="%" valueStyle={{ fontSize: 14 }} />
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default WarehouseMap;
