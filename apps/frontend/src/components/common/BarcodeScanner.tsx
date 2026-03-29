import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, message } from 'antd';
import { ScanOutlined } from '@ant-design/icons';
import { Html5Qrcode } from 'html5-qrcode';
import { useTranslation } from 'react-i18next';

interface BarcodeScannerProps {
  onScan: (value: string) => void;
  buttonText?: string;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, buttonText }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<string>('barcode-scanner-' + Date.now());

  useEffect(() => {
    if (!isOpen) return;

    const scanner = new Html5Qrcode(containerRef.current);
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          onScan(decodedText);
          handleClose();
          message.success(`${t('barcode.scanned')}: ${decodedText}`);
        },
        () => {
          // Ignore scan failures (no QR code found in frame)
        },
      )
      .catch((err: Error) => {
        message.error(`${t('barcode.cameraError')}: ${err.message}`);
      });

    return () => {
      scanner
        .stop()
        .catch(() => {
          // Scanner might already be stopped
        });
    };
  }, [isOpen]);

  const handleClose = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().catch(() => {});
    }
    setIsOpen(false);
  };

  return (
    <>
      <Button icon={<ScanOutlined />} onClick={() => setIsOpen(true)}>
        {buttonText || t('common.search')}
      </Button>
      <Modal
        open={isOpen}
        onCancel={handleClose}
        footer={null}
        title={t('barcode.scanTitle')}
        destroyOnClose
      >
        <div id={containerRef.current} style={{ width: '100%' }} />
      </Modal>
    </>
  );
};

export default BarcodeScanner;
