import React from 'react';
import { Tooltip, Space } from 'antd';
import { useTranslation } from 'react-i18next';

export type GHSCode =
  | 'GHS01' // Exploding bomb
  | 'GHS02' // Flame
  | 'GHS03' // Flame over circle
  | 'GHS04' // Gas cylinder
  | 'GHS05' // Corrosion
  | 'GHS06' // Skull and crossbones
  | 'GHS07' // Exclamation mark
  | 'GHS08' // Health hazard
  | 'GHS09'; // Environment

const ghsLabelKeys: Record<GHSCode, string> = {
  GHS01: 'ghs.explosive',
  GHS02: 'ghs.flammable',
  GHS03: 'ghs.oxidizer',
  GHS04: 'ghs.compressedGas',
  GHS05: 'ghs.corrosive',
  GHS06: 'ghs.toxic',
  GHS07: 'ghs.harmful',
  GHS08: 'ghs.healthHazard',
  GHS09: 'ghs.environmental',
};

const ghsSymbols: Record<GHSCode, string> = {
  GHS01: '\u{1F4A5}',
  GHS02: '\u{1F525}',
  GHS03: '\u{26A0}',
  GHS04: '\u{1F5DC}',
  GHS05: '\u{2622}',
  GHS06: '\u{2620}',
  GHS07: '\u{26A0}',
  GHS08: '\u{2623}',
  GHS09: '\u{1F333}',
};

interface GHSPictogramProps {
  codes: GHSCode[];
  size?: number;
}

const GHSPictogram: React.FC<GHSPictogramProps> = ({ codes, size = 40 }) => {
  const { t } = useTranslation();
  return (
    <Space wrap>
      {codes.map((code) => (
        <Tooltip key={code} title={`${code} - ${t(ghsLabelKeys[code])}`}>
          <div
            style={{
              width: size,
              height: size,
              border: '2px solid #E74C3C',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              transform: 'rotate(45deg)',
              cursor: 'default',
            }}
          >
            <span
              style={{
                transform: 'rotate(-45deg)',
                fontSize: size * 0.5,
                lineHeight: 1,
              }}
            >
              {ghsSymbols[code]}
            </span>
          </div>
        </Tooltip>
      ))}
    </Space>
  );
};

export default GHSPictogram;
