import React from 'react';
import { Table, Card, Tag, Typography, Input, Button, Space, Rate } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  certifications: string[];
  rating: number;
  status: 'active' | 'inactive' | 'pending';
}

const SupplierList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns: ColumnsType<Supplier> = [
    { title: t('common.name'), dataIndex: 'name', key: 'name', sorter: true },
    { title: t('suppliers.contactPerson'), dataIndex: 'contactPerson', key: 'contactPerson' },
    { title: t('suppliers.phone'), dataIndex: 'phone', key: 'phone' },
    {
      title: t('suppliers.certifications'),
      dataIndex: 'certifications',
      key: 'certifications',
      render: (certs: string[]) => (
        <Space wrap>
          {certs.map((cert) => (
            <Tag key={cert} color="blue">{cert}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: t('suppliers.rating'),
      dataIndex: 'rating',
      key: 'rating',
      sorter: true,
      render: (rating: number) => <Rate disabled value={rating} allowHalf style={{ fontSize: 14 }} />,
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: Record<string, string> = { active: 'green', inactive: 'default', pending: 'orange' };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: t('common.actions'),
      key: 'actions',
      render: (_: unknown, record: Supplier) => (
        <Button type="link" onClick={() => navigate(`/suppliers/${record.id}`)}>
          {t('common.view')}
        </Button>
      ),
    },
  ];

  const mockData: Supplier[] = [
    { id: '1', name: 'ChemCo International', contactPerson: 'John Smith', phone: '+966-11-123-4567', email: 'info@chemco.com', certifications: ['ISO 9001', 'ISO 14001'], rating: 4.5, status: 'active' },
    { id: '2', name: 'SolvChem Arabia', contactPerson: 'Mohammed Ali', phone: '+966-12-234-5678', email: 'sales@solvchem.sa', certifications: ['ISO 9001'], rating: 4, status: 'active' },
    { id: '3', name: 'AcidSupply Co', contactPerson: 'Sarah Johnson', phone: '+966-13-345-6789', email: 'orders@acidsupply.com', certifications: ['ISO 9001', 'OHSAS 18001'], rating: 3.5, status: 'pending' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>{t('suppliers.title')}</Title>
        <Button type="primary" icon={<PlusOutlined />}>
          {t('common.add')} {t('suppliers.title')}
        </Button>
      </div>
      <Card>
        <Input
          placeholder={t('common.search')}
          prefix={<SearchOutlined />}
          style={{ width: 300, marginBottom: 16 }}
          allowClear
        />
        <Table
          columns={columns}
          dataSource={mockData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default SupplierList;
