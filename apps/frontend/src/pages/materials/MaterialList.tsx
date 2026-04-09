import React, { useState, useEffect } from 'react';
import { Table, Card, Input, Button, Space, Tag, Typography, Select } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Material {
  id: string;
  materialCode: string;
  nameEn: string;
  nameAr?: string;
  casNumber: string;
  category: string;
  ghsClassification?: string;
  unitOfMeasure: string;
  reorderPoint: number;
}

const MaterialList: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isAr = i18n.language === 'ar';
  const [data, setData] = useState<Material[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>();

  useEffect(() => {
    setLoading(true);
    api.get('/materials', { params: { page, limit: 20 } })
      .then((res) => {
        setData(res.data.data);
        setTotal(res.data.total);
      })
      .catch(() => { setData([]); setTotal(0); })
      .finally(() => setLoading(false));
  }, [page]);

  const columns: ColumnsType<Material> = [
    { title: t('common.code'), dataIndex: 'materialCode', key: 'materialCode', sorter: true },
    {
      title: t('common.name'),
      key: 'name',
      sorter: true,
      render: (_: unknown, record: Material) => isAr ? record.nameAr || record.nameEn : record.nameEn,
    },
    { title: t('materials.casNumber'), dataIndex: 'casNumber', key: 'casNumber' },
    {
      title: t('materials.category'),
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag>{category}</Tag>,
    },
    {
      title: t('materials.hazardClass'),
      dataIndex: 'ghsClassification',
      key: 'ghsClassification',
      render: (hazard: string) => (
        <Tag color={hazard ? 'red' : 'default'}>{hazard || 'N/A'}</Tag>
      ),
    },
    {
      title: t('common.unit'),
      dataIndex: 'unitOfMeasure',
      key: 'unitOfMeasure',
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
              { label: t('materials.categoryAcid'), value: 'Acid' },
              { label: t('materials.categoryBase'), value: 'Base' },
              { label: t('materials.categorySolvent'), value: 'Solvent' },
              { label: t('materials.categorySalt'), value: 'Salt' },
            ]}
          />
        </Space>

        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={{
            current: page,
            pageSize: 20,
            total,
            onChange: setPage,
            showTotal: (total) => `${t('common.total')}: ${total}`,
          }}
        />
      </Card>
    </div>
  );
};

export default MaterialList;
