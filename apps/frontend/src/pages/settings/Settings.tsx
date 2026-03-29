import React from 'react';
import { Card, Form, Select, Switch, Divider, Typography, Button, Space, Tabs, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/appStore';

const { Title, Text } = Typography;

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useAppStore();

  const handleLanguageChange = (value: 'en' | 'ar') => {
    i18n.changeLanguage(value);
    setLanguage(value);
  };

  return (
    <div>
      <Title level={4}>{t('nav.settings')}</Title>

      <Tabs
        defaultActiveKey="general"
        items={[
          {
            key: 'general',
            label: 'General',
            children: (
              <Card>
                <Form layout="vertical" style={{ maxWidth: 600 }}>
                  <Form.Item label={t('language.toggle')}>
                    <Select
                      value={language}
                      onChange={handleLanguageChange}
                      options={[
                        { label: 'English', value: 'en' },
                        { label: 'العربية', value: 'ar' },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item label="Date Format">
                    <Select
                      defaultValue="gregorian"
                      options={[
                        { label: 'Gregorian (YYYY-MM-DD)', value: 'gregorian' },
                        { label: 'Hijri', value: 'hijri' },
                        { label: 'Both', value: 'both' },
                      ]}
                    />
                  </Form.Item>

                  <Divider />

                  <Title level={5}>Notifications</Title>

                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>Low stock alerts</Text>
                      <Switch defaultChecked />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>Expiry notifications</Text>
                      <Switch defaultChecked />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>Requisition approvals</Text>
                      <Switch defaultChecked />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>Quality inspection results</Text>
                      <Switch defaultChecked />
                    </div>
                  </Space>

                  <Divider />

                  <Button type="primary">{t('common.save')}</Button>
                </Form>
              </Card>
            ),
          },
          {
            key: 'system',
            label: 'System',
            children: (
              <Card>
                <Form layout="vertical" style={{ maxWidth: 600 }}>
                  <Form.Item label="Company Name">
                    <Input defaultValue="KEMYAN Chemical Industries" />
                  </Form.Item>
                  <Form.Item label="Default Currency">
                    <Select
                      defaultValue="SAR"
                      options={[
                        { label: 'SAR - Saudi Riyal', value: 'SAR' },
                        { label: 'USD - US Dollar', value: 'USD' },
                        { label: 'EUR - Euro', value: 'EUR' },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item label="Fiscal Year Start">
                    <Select
                      defaultValue="january"
                      options={[
                        { label: 'January', value: 'january' },
                        { label: 'April', value: 'april' },
                        { label: 'July', value: 'july' },
                        { label: 'October', value: 'october' },
                      ]}
                    />
                  </Form.Item>
                  <Button type="primary">{t('common.save')}</Button>
                </Form>
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Settings;
