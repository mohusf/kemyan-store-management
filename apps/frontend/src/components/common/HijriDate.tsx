import React from 'react';
import { Typography, Space } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

interface HijriDateProps {
  date?: string | Date;
  showGregorian?: boolean;
  style?: React.CSSProperties;
}

const HijriDate: React.FC<HijriDateProps> = ({ date, showGregorian = true, style }) => {
  const { i18n } = useTranslation();
  const dateObj = date ? new Date(date) : new Date();

  const gregorian = dayjs(dateObj).format('YYYY-MM-DD');

  const hijri = new Intl.DateTimeFormat(`${i18n.language}-SA-u-ca-islamic-umalqura`, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);

  return (
    <Space direction="vertical" size={0} style={style}>
      <Text>{hijri}</Text>
      {showGregorian && (
        <Text type="secondary" style={{ fontSize: 12 }}>
          {gregorian}
        </Text>
      )}
    </Space>
  );
};

export default HijriDate;
