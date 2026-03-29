import React from 'react';
import { Card, Row, Col, Typography, Tag, Tooltip, Badge, Space } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

interface Zone {
  id: string;
  name: string;
  type: string;
  capacity: number;
  used: number;
  locations: Location[];
  color: string;
}

interface Location {
  id: string;
  code: string;
  occupied: boolean;
  material?: string;
  hazardous: boolean;
}

const WarehouseMap: React.FC = () => {
  const { t } = useTranslation();

  const zones: Zone[] = [
    {
      id: '1', name: t('warehouse.zoneA'), type: 'general', capacity: 50, used: 35, color: '#1B4F72',
      locations: [
        { id: 'a1', code: 'A-1', occupied: true, material: 'Sodium Hydroxide', hazardous: true },
        { id: 'a2', code: 'A-2', occupied: true, material: 'Calcium Carbonate', hazardous: false },
        { id: 'a3', code: 'A-3', occupied: false, hazardous: false },
        { id: 'a4', code: 'A-4', occupied: true, material: 'Sodium Chloride', hazardous: false },
      ],
    },
    {
      id: '2', name: t('warehouse.zoneB'), type: 'acids', capacity: 30, used: 22, color: '#E74C3C',
      locations: [
        { id: 'b1', code: 'B-1', occupied: true, material: 'Sulfuric Acid', hazardous: true },
        { id: 'b2', code: 'B-2', occupied: true, material: 'Nitric Acid', hazardous: true },
        { id: 'b3', code: 'B-3', occupied: true, material: 'Hydrochloric Acid', hazardous: true },
        { id: 'b4', code: 'B-4', occupied: false, hazardous: true },
      ],
    },
    {
      id: '3', name: t('warehouse.zoneC'), type: 'solvents', capacity: 40, used: 28, color: '#F39C12',
      locations: [
        { id: 'c1', code: 'C-1', occupied: true, material: 'Ethanol', hazardous: true },
        { id: 'c2', code: 'C-2', occupied: true, material: 'Acetone', hazardous: true },
        { id: 'c3', code: 'C-3', occupied: false, hazardous: true },
        { id: 'c4', code: 'C-4', occupied: false, hazardous: true },
      ],
    },
    {
      id: '4', name: t('warehouse.zoneD'), type: 'cold', capacity: 20, used: 8, color: '#3498DB',
      locations: [
        { id: 'd1', code: 'D-1', occupied: true, material: 'Reagent Grade Enzymes', hazardous: false },
        { id: 'd2', code: 'D-2', occupied: true, material: 'Biological Indicators', hazardous: false },
        { id: 'd3', code: 'D-3', occupied: false, hazardous: false },
        { id: 'd4', code: 'D-4', occupied: false, hazardous: false },
      ],
    },
  ];

  return (
    <div>
      <Title level={4}>{t('nav.warehouse')}</Title>
      <Space style={{ marginBottom: 16 }}>
        <Badge color="#27AE60" text={t('common.occupied')} />
        <Badge color="#d9d9d9" text={t('common.empty')} />
        <Badge color="#E74C3C" text={t('common.hazardous')} />
      </Space>

      <Row gutter={[16, 16]}>
        {zones.map((zone) => (
          <Col xs={24} lg={12} key={zone.id}>
            <Card
              title={
                <Space>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: zone.color }} />
                  <span>{zone.name}</span>
                  <Tag>{Math.round((zone.used / zone.capacity) * 100)}% {t('common.used')}</Tag>
                </Space>
              }
            >
              <Row gutter={[8, 8]}>
                {zone.locations.map((loc) => (
                  <Col span={6} key={loc.id}>
                    <Tooltip title={loc.material || t('common.empty')}>
                      <div
                        style={{
                          padding: 12,
                          borderRadius: 6,
                          border: `2px solid ${loc.hazardous ? '#E74C3C' : '#d9d9d9'}`,
                          backgroundColor: loc.occupied ? '#e6f7e6' : '#fafafa',
                          textAlign: 'center',
                          cursor: 'pointer',
                          minHeight: 70,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text strong style={{ fontSize: 12 }}>{loc.code}</Text>
                        {loc.material && (
                          <Text style={{ fontSize: 10, color: '#666' }} ellipsis>
                            {loc.material}
                          </Text>
                        )}
                      </div>
                    </Tooltip>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default WarehouseMap;
