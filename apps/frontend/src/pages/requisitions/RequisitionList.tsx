import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Tag, Typography, Space, Input } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Requisition {
  id: string;
  requisitionNumber: string;
  requesterId: string;
  materialId: string;
  material?: { nameEn: string; nameAr?: string };
  quantity: number;
  urgency: string;
  estimatedValue: number;
  status: string;
  department: string;
  justification?: string;
  requiredDate?: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  draft: 'default',
  pending_supervisor: 'processing',
  pending_store_manager: 'processing',
  pending_procurement: 'processing',
  pending_plant_manager: 'processing',
  approved: 'success',
  rejected: 'error',
  cancelled: 'warning',
};

const urgencyColors: Record<string, string> = {
  low: 'default',
  normal: 'blue',
  high: 'orange',
  critical: 'red',
};

const RequisitionList: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isAr = i18n.language === 'ar';
  const [data, setData] = useState<Requisition[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get('/requisitions', { params: { page, limit: 20 } })
      .then((res) => {
        setData(res.data.data);
        setTotal(res.data.total);
      })
      .catch(() => { setData([]); setTotal(0); })
      .finally(() => setLoading(false));
  }, [page]);

  const columns: ColumnsType<Requisition> = [
    { title: '#', dataIndex: 'requisitionNumber', key: 'requisitionNumber', sorter: true },
    {
      title: t('materials.title'),
      key: 'material',
      render: (_: unknown, record: Requisition) =>
        record.material ? (isAr ? record.material.nameAr || record.material.nameEn : record.material.nameEn) : record.materialId,
    },
    { title: t('requisitions.department'), dataIndex: 'department', key: 'department' },
    { title: t('common.quantity'), dataIndex: 'quantity', key: 'quantity' },
    {
      title: t('common.date'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      render: (val: string) => val ? new Date(val).toLocaleDateString() : '—',
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={statusColors[status] || 'default'}>
          {status?.replace(/_/g, ' ')}
        </Tag>
      ),
    },
    {
      title: t('requisitions.priority'),
      dataIndex: 'urgency',
      key: 'urgency',
      render: (urgency: string) => (
        <Tag color={urgencyColors[urgency] || 'default'}>{urgency}</Tag>
      ),
    },
    {
      title: t('common.actions'),
      key: 'actions',
      render: (_: unknown, record: Requisition) => (
        <Space>
          <Button type="link" onClick={() => navigate(`/requisitions/${record.id}`)}>
            {t('common.view')}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>{t('requisitions.title')}</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/requisitions/new')}>
          {t('nav.newRequisition')}
        </Button>
      </div>

      <Card>
        <Input
          placeholder={t('common.search')}
          prefix={<SearchOutlined />}
          style={{ width: 300, marginBottom: 16 }}
          allowClear
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
            showSizeChanger: false,
            showTotal: (t) => `${t} items`,
          }}
        />
      </Card>
    </div>
  );
};

export default RequisitionList;
