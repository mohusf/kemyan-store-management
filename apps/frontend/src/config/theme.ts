import type { ThemeConfig } from 'antd';

export const kemyanTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1B4F72',
    colorSuccess: '#27AE60',
    colorWarning: '#F39C12',
    colorError: '#E74C3C',
    colorInfo: '#1B4F72',
    borderRadius: 6,
    fontFamily: "'Segoe UI', 'Noto Sans Arabic', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: 14,
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f5f7fa',
  },
  components: {
    Layout: {
      siderBg: '#1B4F72',
      headerBg: '#ffffff',
      bodyBg: '#f5f7fa',
    },
    Menu: {
      darkItemBg: '#1B4F72',
      darkItemSelectedBg: '#154360',
      darkSubMenuItemBg: '#163D5C',
      darkItemColor: 'rgba(255, 255, 255, 0.85)',
      darkItemHoverColor: '#ffffff',
    },
    Button: {
      primaryShadow: '0 2px 0 rgba(27, 79, 114, 0.1)',
    },
    Card: {
      headerBg: 'transparent',
    },
  },
};
