import React from 'react';
import { Table, Card, Input, Tag, Typography, Progress, Space } from 'antd';
import { SearchOutlined, WarningOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface StockItem {
  id: string;
  code: string;
  name: string;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  unit: string;
  location: string;
  status: 'ok' | 'low' | 'critical' | 'overstock';
}

const statusConfig: Record<string, { color: string; label: string }> = {
  ok: { color: 'green', label: 'OK' },
  low: { color: 'orange', label: 'Low' },
  critical: { color: 'red', label: 'Critical' },
  overstock: { color: 'blue', label: 'Overstock' },
};

const InventoryOverview: React.FC = () => {
  const { t } = useTranslation();

  const columns: ColumnsType<StockItem> = [
    { title: t('common.code'), dataIndex: 'code', key: 'code', sorter: true },
    { title: t('common.name'), dataIndex: 'name', key: 'name', sorter: true },
    {
      title: t('materials.currentStock'),
      key: 'stock',
      render: (_: unknown, record: StockItem) => (
        <Space direction="vertical" size={0} style={{ width: 150 }}>
          <span>{record.currentStock} {record.unit}</span>
          <Progress
            percent={Math.round((record.currentStock / record.maximumStock) * 100)}
            size="small"
            strokeColor={record.currentStock <= record.minimumStock ? '#E74C3C' : '#27AE60'}
            showInfo={false}
          />
        </Space>
      ),
    },
    { title: t('materials.minimumStock'), dataIndex: 'minimumStock', key: 'minimumStock', render: (v: number, r: StockItem) => `${v} ${r.unit}` },
    { title: t('inventory.location'), dataIndex: 'location', key: 'location' },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={statusConfig[status]?.color}
          icon={status === 'critical' ? <WarningOutlined /> : undefined}
        >
          {statusConfig[status]?.label}
        </Tag>
      ),
    },
  ];

  const mockData: StockItem[] = [
    { id: '1', code: 'MAT-001', name: 'Sodium Hydroxide', currentStock: 500, minimumStock: 100, maximumStock: 1000, unit: 'kg', location: 'Zone A-1', status: 'ok' },
    { id: '2', code: 'MAT-002', name: 'Hydrochloric Acid', currentStock: 80, minimumStock: 100, maximumStock: 500, unit: 'L', location: 'Zone B-3', status: 'low' },
    { id: '3', code: 'MAT-003', name: 'Ethanol', currentStock: 20, minimumStock: 50, maximumStock: 300, unit: 'L', location: 'Zone C-1', status: 'critical' },
    { id: '4', code: 'MAT-004', name: 'Acetone', currentStock: 450, minimumStock: 50, maximumStock: 400, unit: 'L', location: 'Zone C-2', status: 'overstock' },
  ];

  return (
    <div>
      <Title level={4}>{t('nav.inventoryOverview')}</Title>
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
          pagination={{ pageSize: 10, showSizeChanger: true }}
        />
      </Card>
    </div>
  );
};

export default InventoryOverview;
