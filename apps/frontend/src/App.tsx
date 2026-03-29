import React, { Suspense } from 'react';
import { ConfigProvider, App as AntApp, Spin } from 'antd';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import arEG from 'antd/locale/ar_EG';
import enUS from 'antd/locale/en_US';
import { kemyanTheme } from './config/theme';
import { queryClient } from './config/queryClient';
import { router } from './router';
import { useAppStore } from './store/appStore';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const direction = useAppStore((state) => state.direction);

  const locale = i18n.language === 'ar' ? arEG : enUS;

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={kemyanTheme}
        direction={direction}
        locale={locale}
      >
        <AntApp>
          <Suspense
            fallback={
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
              </div>
            }
          >
            <RouterProvider router={router} />
          </Suspense>
        </AntApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
