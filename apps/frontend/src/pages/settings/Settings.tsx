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
            label: t('settings.general'),
            children: (
              <Card>
                <Form layout="vertical" style={{ maxWidth: 600 }}>
                  <Form.Item label={t('language.toggle')}>
                    <Select
                      value={language}
                      onChange={handleLanguageChange}
                      options={[
                        { label: t('language.en'), value: 'en' },
                        { label: t('language.ar'), value: 'ar' },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item label={t('settings.dateFormat')}>
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

                  <Title level={5}>{t('settings.notifications')}</Title>

                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>{t('settings.lowStockAlerts')}</Text>
                      <Switch defaultChecked />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>{t('settings.expiryNotifications')}</Text>
                      <Switch defaultChecked />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>{t('settings.requisitionApprovals')}</Text>
                      <Switch defaultChecked />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>{t('settings.qualityResults')}</Text>
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
            label: t('settings.system'),
            children: (
              <Card>
                <Form layout="vertical" style={{ maxWidth: 600 }}>
                  <Form.Item label={t('settings.companyName')}>
                    <Input defaultValue="KEMYAN Chemical Industries" />
                  </Form.Item>
                  <Form.Item label={t('settings.defaultCurrency')}>
                    <Select
                      defaultValue="SAR"
                      options={[
                        { label: 'SAR - Saudi Riyal', value: 'SAR' },
                        { label: 'USD - US Dollar', value: 'USD' },
                        { label: 'EUR - Euro', value: 'EUR' },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item label={t('settings.fiscalYearStart')}>
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
