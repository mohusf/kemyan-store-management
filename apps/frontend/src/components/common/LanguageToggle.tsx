import React from 'react';
import { Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/appStore';

const LanguageToggle: React.FC = () => {
  const { i18n, t } = useTranslation();
  const setLanguage = useAppStore((state) => state.setLanguage);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  return (
    <Button
      type="text"
      icon={<GlobalOutlined />}
      onClick={toggleLanguage}
      title={t('language.toggle')}
    >
      {i18n.language === 'en' ? t('language.ar') : t('language.en')}
    </Button>
  );
};

export default LanguageToggle;
