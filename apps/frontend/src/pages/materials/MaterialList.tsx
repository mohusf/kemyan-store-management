import React, { useState } from 'react';
import { Table, Card, Input, Button, Space, Tag, Typography, Select } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Material {
  id: string;
  code: string;
  name: string;
  casNumber: string;
  category: string;
  hazardClass: string;
  currentStock: number;
  unit: string;
  minimumStock: number;
}

const MaterialList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>();

  const columns: ColumnsType<Material> = [
    {
      title: t('common.code'),
      dataIndex: 'code',
      key: 'code',
      sorter: true,
    },
    {
      title: t('common.name'),
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: t('materials.casNumber'),
      dataIndex: 'casNumber',
      key: 'casNumber',
    },
    {
      title: t('materials.category'),
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag>{category}</Tag>,
    },
    {
      title: t('materials.hazardClass'),
      dataIndex: 'hazardClass',
      key: 'hazardClass',
      render: (hazard: string) => (
        <Tag color={hazard ? 'red' : 'default'}>{hazard || 'N/A'}</Tag>
      ),
    },
    {
      title: t('materials.currentStock'),
      dataIndex: 'currentStock',
      key: 'currentStock',
      sorter: true,
      render: (stock: number, record: Material) => (
        <span style={{ color: stock <= record.minimumStock ? '#E74C3C' : undefined }}>
          {stock} {record.unit}
        </span>
      ),
    },
    {
      title: t('common.actions'),
      key: 'actions',
      render: (_: unknown, record: Material) => (
        <Button type="link" onClick={() => navigate(`/materials/${record.id}`)}>
          {t('common.view')}
        </Button>
      ),
    },
  ];

  const mockData: Material[] = [
    { id: '1', code: 'MAT-001', name: 'Sodium Hydroxide', casNumber: '1310-73-2', category: 'Base', hazardClass: 'Corrosive', currentStock: 500, unit: 'kg', minimumStock: 100 },
    { id: '2', code: 'MAT-002', name: 'Hydrochloric Acid', casNumber: '7647-01-0', category: 'Acid', hazardClass: 'Corrosive', currentStock: 80, unit: 'L', minimumStock: 100 },
    { id: '3', code: 'MAT-003', name: 'Ethanol', casNumber: '64-17-5', category: 'Solvent', hazardClass: 'Flammable', currentStock: 200, unit: 'L', minimumStock: 50 },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>{t('materials.title')}</Title>
        <Button type="primary" icon={<PlusOutlined />}>
          {t('common.add')} {t('materials.title')}
        </Button>
      </div>

      <Card>
        <Space style={{ marginBottom: 16 }} wrap>
          <Input
            placeholder={t('common.search')}
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
            allowClear
          />
          <Select
            placeholder={t('materials.category')}
            value={categoryFilter}
            onChange={setCategoryFilter}
            style={{ width: 150 }}
            allowClear
            options={[
              { label: 'Acid', value: 'Acid' },
              { label: 'Base', value: 'Base' },
              { label: 'Solvent', value: 'Solvent' },
              { label: 'Salt', value: 'Salt' },
            ]}
          />
        </Space>

        <Table
          columns={columns}
          dataSource={mockData}
          rowKey="id"
          pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total) => `${t('common.total')}: ${total}` }}
        />
      </Card>
    </div>
  );
};

export default MaterialList;
