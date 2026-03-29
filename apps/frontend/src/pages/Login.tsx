import React from 'react';
import { Card, Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      await authService.login(values);
      message.success(t('auth.welcomeBack'));
      navigate('/dashboard');
    } catch {
      message.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      style={{
        width: '100%',
        maxWidth: 400,
        borderRadius: 12,
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Title level={3} style={{ marginBottom: 4 }}>
          {t('auth.welcomeBack')}
        </Title>
        <Text type="secondary">{t('auth.loginSubtitle')}</Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        size="large"
      >
        <Form.Item
          name="email"
          label={t('auth.email')}
          rules={[
            { required: true, message: `${t('auth.email')} is required` },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder={t('auth.email')} />
        </Form.Item>

        <Form.Item
          name="password"
          label={t('auth.password')}
          rules={[{ required: true, message: `${t('auth.password')} is required` }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder={t('auth.password')} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {t('auth.signIn')}
          </Button>
        </Form.Item>

        <div style={{ textAlign: 'center' }}>
          <Button type="link">{t('auth.forgotPassword')}</Button>
        </div>
      </Form>
    </Card>
  );
};

export default Login;
