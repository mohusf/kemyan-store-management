import React from 'react';
import { Card, Form, Input, Select, Button, Space, Typography, Table, InputNumber, DatePicker } from 'antd';
import { PlusOutlined, ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;

interface RequisitionItem {
  key: string;
  materialId: string;
  materialName: string;
  quantity: number;
  unit: string;
}

const RequisitionForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const isEditing = Boolean(id);

  const [items, setItems] = React.useState<RequisitionItem[]>([
    { key: '1', materialId: '', materialName: '', quantity: 0, unit: 'kg' },
  ]);

  const addItem = () => {
    setItems([...items, { key: String(Date.now()), materialId: '', materialName: '', quantity: 0, unit: 'kg' }]);
  };

  const removeItem = (key: string) => {
    setItems(items.filter((item) => item.key !== key));
  };

  const handleSubmit = () => {
    form.validateFields().then(() => {
      navigate('/requisitions');
    });
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/requisitions')}>
          {t('common.back')}
        </Button>
        <Title level={4} style={{ margin: 0 }}>
          {isEditing ? `${t('common.edit')} ${t('requisitions.title')}` : t('nav.newRequisition')}
        </Title>
      </Space>

      <Card>
        <Form form={form} layout="vertical">
          <Form.Item
            name="department"
            label={t('requisitions.department')}
            rules={[{ required: true }]}
          >
            <Select
              placeholder={t('requisitions.department')}
              options={[
                { label: t('departments.labA'), value: 'lab-a' },
                { label: t('departments.labB'), value: 'lab-b' },
                { label: t('departments.production'), value: 'production' },
                { label: t('departments.qcLab'), value: 'qc-lab' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="priority"
            label={t('requisitions.priority')}
            rules={[{ required: true }]}
          >
            <Select
              placeholder={t('requisitions.priority')}
              options={[
                { label: t('priority.low'), value: 'low' },
                { label: t('priority.medium'), value: 'medium' },
                { label: t('priority.high'), value: 'high' },
                { label: t('priority.urgent'), value: 'urgent' },
              ]}
            />
          </Form.Item>

          <Form.Item name="requiredDate" label={t('common.date')}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Title level={5}>{t('materials.title')}</Title>
          <Table
            dataSource={items}
            rowKey="key"
            pagination={false}
            columns={[
              {
                title: t('common.name'),
                dataIndex: 'materialName',
                render: (_: unknown, _record: RequisitionItem, index: number) => (
                  <Select
                    placeholder={t('materials.title')}
                    style={{ width: '100%' }}
                    onChange={(value: string) => {
                      const newItems = [...items];
                      newItems[index].materialId = value;
                      setItems(newItems);
                    }}
                    options={[
                      { label: 'Sodium Hydroxide', value: 'mat-001' },
                      { label: 'Hydrochloric Acid', value: 'mat-002' },
                      { label: 'Ethanol', value: 'mat-003' },
                    ]}
                  />
                ),
              },
              {
                title: t('common.quantity'),
                dataIndex: 'quantity',
                width: 150,
                render: (_: unknown, _record: RequisitionItem, index: number) => (
                  <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    onChange={(value) => {
                      const newItems = [...items];
                      newItems[index].quantity = value || 0;
                      setItems(newItems);
                    }}
                  />
                ),
              },
              {
                title: t('common.unit'),
                dataIndex: 'unit',
                width: 120,
                render: (_: unknown, _record: RequisitionItem, index: number) => (
                  <Select
                    defaultValue="kg"
                    onChange={(value: string) => {
                      const newItems = [...items];
                      newItems[index].unit = value;
                      setItems(newItems);
                    }}
                    options={[
                      { label: 'kg', value: 'kg' },
                      { label: 'L', value: 'L' },
                      { label: 'g', value: 'g' },
                      { label: 'mL', value: 'mL' },
                    ]}
                  />
                ),
              },
              {
                title: '',
                width: 50,
                render: (_: unknown, record: RequisitionItem) => (
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeItem(record.key)}
                    disabled={items.length === 1}
                  />
                ),
              },
            ]}
          />
          <Button type="dashed" onClick={addItem} block icon={<PlusOutlined />} style={{ marginTop: 8 }}>
            {t('common.add')}
          </Button>

          <Form.Item name="notes" label={t('common.notes')} style={{ marginTop: 16 }}>
            <TextArea rows={3} />
          </Form.Item>

          <Space style={{ marginTop: 16 }}>
            <Button type="primary" onClick={handleSubmit}>
              {t('common.submit')}
            </Button>
            <Button onClick={() => navigate('/requisitions')}>
              {t('common.cancel')}
            </Button>
          </Space>
        </Form>
      </Card>
    </div>
  );
};

export default RequisitionForm;
