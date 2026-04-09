import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Tabs, Tag, Button, Space, Typography, Rate, Spin, Empty } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const { Title } = Typography;

interface SupplierData {
  id: string;
  nameEn: string;
  nameAr?: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  certifications: string[];
  overallRating: number;
  status: string;
}

const SupplierDetail: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isAr = i18n.language === 'ar';
  const [supplier, setSupplier] = useState<SupplierData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.get(`/suppliers/${id}`)
      .then((res) => setSupplier(res.data))
      .catch(() => setSupplier(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: 80 }}><Spin size="large" /></div>;
  if (!supplier) return <Empty />;

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/suppliers')}>{t('common.back')}</Button>
        <Title level={4} style={{ margin: 0 }}>{isAr ? supplier.nameAr || supplier.nameEn : supplier.nameEn}</Title>
        <Tag color={supplier.status === 'active' ? 'green' : 'default'}>{supplier.status}</Tag>
      </Space>
      <Card>
        <Descriptions bordered column={{ xs: 1, sm: 2 }}>
          <Descriptions.Item label={t('common.name')}>{isAr ? supplier.nameAr || supplier.nameEn : supplier.nameEn}</Descriptions.Item>
          <Descriptions.Item label={t('suppliers.contactPerson')}>{supplier.contactPerson}</Descriptions.Item>
          <Descriptions.Item label={t('suppliers.phone')}>{supplier.phone}</Descriptions.Item>
          <Descriptions.Item label={t('auth.email')}>{supplier.email}</Descriptions.Item>
          <Descriptions.Item label={t('common.address')} span={2}>{supplier.address}</Descriptions.Item>
          <Descriptions.Item label={t('suppliers.certifications')}>
            <Space>{supplier.certifications?.map((c) => <Tag key={c} color="blue">{c}</Tag>)}</Space>
          </Descriptions.Item>
          <Descriptions.Item label={t('suppliers.rating')}>
            <Rate disabled value={supplier.overallRating} allowHalf />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default SupplierDetail;
