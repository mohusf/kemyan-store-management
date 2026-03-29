import React from 'react';
import { Tooltip, Space } from 'antd';

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

const ghsLabels: Record<GHSCode, string> = {
  GHS01: 'Explosive',
  GHS02: 'Flammable',
  GHS03: 'Oxidizer',
  GHS04: 'Compressed Gas',
  GHS05: 'Corrosive',
  GHS06: 'Toxic',
  GHS07: 'Irritant',
  GHS08: 'Health Hazard',
  GHS09: 'Environmental Hazard',
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
  return (
    <Space wrap>
      {codes.map((code) => (
        <Tooltip key={code} title={`${code} - ${ghsLabels[code]}`}>
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
