import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Typography, Input, Button, Space, Rate } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Supplier {
  id: string;
  nameEn: string;
  nameAr?: string;
  contactPerson: string;
  phone: string;
  email: string;
  certifications: string[];
  overallRating: number;
  status: string;
}

const SupplierList: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isAr = i18n.language === 'ar';
  const [data, setData] = useState<Supplier[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.get('/suppliers', { params: { page, limit: 20 } })
      .then((res) => { setData(res.data.data || []); setTotal(res.data.total || 0); })
      .catch(() => { setData([]); setTotal(0); })
      .finally(() => setLoading(false));
  }, [page]);

  const columns: ColumnsType<Supplier> = [
    { title: t('common.name'), key: 'name', render: (_: unknown, r: Supplier) => isAr ? r.nameAr || r.nameEn : r.nameEn, sorter: true },
    { title: t('suppliers.contactPerson'), dataIndex: 'contactPerson', key: 'contactPerson' },
    { title: t('suppliers.phone'), dataIndex: 'phone', key: 'phone' },
    {
      title: t('suppliers.certifications'),
      dataIndex: 'certifications',
      key: 'certifications',
      render: (certs: string[]) => certs ? (
        <Space wrap>{certs.map((c) => <Tag key={c} color="blue">{c}</Tag>)}</Space>
      ) : '—',
    },
    {
      title: t('suppliers.rating'),
      dataIndex: 'overallRating',
      key: 'overallRating',
      render: (rating: number) => rating ? <Rate disabled value={rating} allowHalf style={{ fontSize: 14 }} /> : '—',
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={status === 'active' ? 'green' : status === 'pending' ? 'orange' : 'default'}>{status}</Tag>,
    },
    {
      title: t('common.actions'),
      key: 'actions',
      render: (_: unknown, record: Supplier) => (
        <Button type="link" onClick={() => navigate(`/suppliers/${record.id}`)}>{t('common.view')}</Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>{t('suppliers.title')}</Title>
        <Button type="primary" icon={<PlusOutlined />}>{t('common.add')} {t('suppliers.title')}</Button>
      </div>
      <Card>
        <Input placeholder={t('common.search')} prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} allowClear />
        <Table columns={columns} dataSource={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize: 20, total, onChange: setPage }} />
      </Card>
    </div>
  );
};

export default SupplierList;
