import React from 'react';
import { Layout, Typography } from 'antd';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/common/LanguageToggle';

const { Content } = Layout;
const { Text } = Typography;

const AuthLayout: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1B4F72 0%, #154360 50%, #0E2F44 100%)' }}>
      <div style={{ position: 'absolute', top: 16, right: 24, left: 24, display: 'flex', justifyContent: 'flex-end' }}>
        <LanguageToggle />
      </div>
      <Content
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Text
            strong
            style={{ fontSize: 36, color: '#fff', letterSpacing: 4, display: 'block' }}
          >
            {t('app.name')}
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
            {t('app.description')}
          </Text>
        </div>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AuthLayout;
