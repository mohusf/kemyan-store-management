import React from 'react';
import { Table, Card, Tag, Typography, Input, Button, Space, Tabs } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface GRN {
  id: string;
  grnNumber: string;
  poNumber: string;
  supplier: string;
  receivedDate: string;
  receivedBy: string;
  itemCount: number;
  inspectionStatus: 'pending' | 'passed' | 'failed' | 'partial';
}

const inspectionColors: Record<string, string> = {
  pending: 'processing',
  passed: 'green',
  failed: 'red',
  partial: 'orange',
};

const GoodsReceivedNote: React.FC = () => {
  const { t } = useTranslation();

  const columns: ColumnsType<GRN> = [
    { title: t('procurement.grnNumber'), dataIndex: 'grnNumber', key: 'grnNumber', sorter: true },
    { title: t('procurement.orderNumber'), dataIndex: 'poNumber', key: 'poNumber' },
    { title: t('procurement.supplier'), dataIndex: 'supplier', key: 'supplier' },
    { title: t('common.date'), dataIndex: 'receivedDate', key: 'receivedDate', sorter: true },
    { title: 'Received By', dataIndex: 'receivedBy', key: 'receivedBy' },
    { title: 'Items', dataIndex: 'itemCount', key: 'itemCount' },
    {
      title: t('quality.inspectionResult'),
      dataIndex: 'inspectionStatus',
      key: 'inspectionStatus',
      render: (status: string) => <Tag color={inspectionColors[status]}>{status.toUpperCase()}</Tag>,
    },
    {
      title: t('common.actions'),
      key: 'actions',
      render: () => (
        <Space>
          <Button type="link">{t('common.view')}</Button>
        </Space>
      ),
    },
  ];

  const mockData: GRN[] = [
    { id: '1', grnNumber: 'GRN-2026-0045', poNumber: 'PO-2026-0087', supplier: 'AcidSupply Co', receivedDate: '2026-03-28', receivedBy: 'Ahmed Hassan', itemCount: 2, inspectionStatus: 'passed' },
    { id: '2', grnNumber: 'GRN-2026-0044', poNumber: 'PO-2026-0085', supplier: 'ChemCo International', receivedDate: '2026-03-25', receivedBy: 'Omar Khalid', itemCount: 4, inspectionStatus: 'pending' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>{t('nav.goodsReceived')}</Title>
        <Button type="primary" icon={<PlusOutlined />}>
          {t('common.create')} GRN
        </Button>
      </div>
      <Card>
        <Tabs
          defaultActiveKey="list"
          items={[
            {
              key: 'list',
              label: 'GRN List',
              children: (
                <>
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
                </>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default GoodsReceivedNote;
