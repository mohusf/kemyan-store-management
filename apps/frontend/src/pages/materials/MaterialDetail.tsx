import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Tabs, Tag, Button, Space, Typography, Table, Spin, Empty } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const { Title } = Typography;

interface MaterialData {
  id: string;
  materialCode: string;
  nameEn: string;
  nameAr?: string;
  casNumber: string;
  category: string;
  ghsClassification?: string;
  unitOfMeasure: string;
  reorderPoint: number;
  specifications?: Record<string, unknown>;
}

const MaterialDetail: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isAr = i18n.language === 'ar';
  const [material, setMaterial] = useState<MaterialData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.get(`/materials/${id}`)
      .then((res) => setMaterial(res.data))
      .catch(() => setMaterial(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: 80 }}><Spin size="large" /></div>;
  if (!material) return <Empty />;

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/materials')}>
          {t('common.back')}
        </Button>
        <Title level={4} style={{ margin: 0 }}>
          {isAr ? material.nameAr || material.nameEn : material.nameEn} ({material.materialCode})
        </Title>
      </Space>

      <Card>
        <Descriptions bordered column={{ xs: 1, sm: 2 }}>
          <Descriptions.Item label={t('common.code')}>{material.materialCode}</Descriptions.Item>
          <Descriptions.Item label={t('common.name')}>
            {isAr ? material.nameAr || material.nameEn : material.nameEn}
          </Descriptions.Item>
          <Descriptions.Item label={t('materials.casNumber')}>{material.casNumber}</Descriptions.Item>
          <Descriptions.Item label={t('materials.category')}>
            <Tag>{material.category}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label={t('materials.hazardClass')}>
            {material.ghsClassification ? <Tag color="red">{material.ghsClassification}</Tag> : 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label={t('common.unit')}>{material.unitOfMeasure}</Descriptions.Item>
          <Descriptions.Item label={t('materials.minimumStock')}>{material.reorderPoint}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default MaterialDetail;
