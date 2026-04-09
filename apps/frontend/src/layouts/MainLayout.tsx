import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Badge, Button, Space, Typography } from 'antd';
import {
  DashboardOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  AuditOutlined,
  BarChartOutlined,
  SettingOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DatabaseOutlined,
  WarningOutlined,
  ContainerOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/appStore';
import { useAuthStore } from '../store/authStore';
import LanguageToggle from '../components/common/LanguageToggle';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const MainLayout: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const { user, logout } = useAuthStore();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const menuItems: MenuProps['items'] = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: t('nav.dashboard'),
    },
    {
      key: '/materials',
      icon: <ExperimentOutlined />,
      label: t('nav.materials'),
    },
    {
      key: 'requisitions-group',
      icon: <FileTextOutlined />,
      label: t('nav.requisitions'),
      children: [
        { key: '/requisitions', label: t('nav.requisitions') },
        { key: '/requisitions/new', label: t('nav.newRequisition') },
      ],
    },
    {
      key: 'procurement-group',
      icon: <ShoppingCartOutlined />,
      label: t('nav.procurement'),
      children: [
        { key: '/procurement/orders', label: t('nav.purchaseOrders') },
        { key: '/procurement/grn', label: t('nav.goodsReceived') },
      ],
    },
    {
      key: 'inventory-group',
      icon: <InboxOutlined />,
      label: t('nav.inventory'),
      children: [
        { key: '/inventory', label: t('nav.inventoryOverview') },
        { key: '/inventory/transactions', label: t('nav.transactions') },
        { key: '/inventory/batches', label: t('nav.batches') },
      ],
    },
    {
      key: '/warehouse',
      icon: <DatabaseOutlined />,
      label: t('nav.warehouse'),
    },
    {
      key: '/suppliers',
      icon: <TeamOutlined />,
      label: t('nav.suppliers'),
    },
    {
      key: 'quality-group',
      icon: <SafetyCertificateOutlined />,
      label: t('nav.quality'),
      children: [
        { key: '/quality/inspections', label: t('nav.inspections') },
        { key: '/quality/ncr', label: t('nav.ncr') },
      ],
    },
    {
      key: 'compliance-group',
      icon: <WarningOutlined />,
      label: t('nav.compliance'),
      children: [
        { key: '/compliance/sds', label: t('nav.sds') },
        { key: '/compliance/waste', label: t('nav.wasteTracking') },
      ],
    },
    {
      key: 'documents-group',
      icon: <ContainerOutlined />,
      label: t('nav.documents'),
      children: [
        { key: '/documents/hierarchy', label: t('nav.imsHierarchy', 'IMS Hierarchy') },
        { key: '/documents/list', label: t('nav.documentList', 'Document List') },
      ],
    },
    {
      key: '/equipment',
      icon: <ToolOutlined />,
      label: t('nav.equipment', 'Equipment'),
    },
    {
      key: '/reports',
      icon: <BarChartOutlined />,
      label: t('nav.reports'),
    },
    {
      key: '/audit-log',
      icon: <AuditOutlined />,
      label: t('nav.auditLog'),
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: t('nav.settings'),
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: user?.name || t('common.user'),
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('common.logout'),
      danger: true,
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key.startsWith('/')) {
      navigate(key);
    }
  };

  const handleUserMenu: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      logout();
      navigate('/login');
    }
  };

  const selectedKey = location.pathname;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={sidebarCollapsed}
        onCollapse={toggleSidebar}
        trigger={null}
        width={260}
        theme="dark"
        breakpoint="lg"
        onBreakpoint={(broken) => {
          if (broken) {
            useAppStore.getState().setSidebarCollapsed(true);
          }
        }}
      >
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Text
            strong
            style={{
              color: '#fff',
              fontSize: sidebarCollapsed ? 16 : 20,
              letterSpacing: 2,
            }}
          >
            {sidebarCollapsed ? 'K' : t('app.name')}
          </Text>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          onClick={handleMenuClick}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: '#fff',
          }}
        >
          <Button
            type="text"
            icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            style={{ fontSize: 16 }}
          />
          <Space size="middle">
            <LanguageToggle />
            <Badge count={3} size="small">
              <Button type="text" icon={<BellOutlined />} />
            </Badge>
            <Dropdown menu={{ items: userMenuItems, onClick: handleUserMenu }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1B4F72' }} />
                {!sidebarCollapsed && (
                  <Text>{user?.name || t('common.admin')}</Text>
                )}
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{
            margin: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
