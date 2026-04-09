import React from 'react';
import { Result, Button } from 'antd';
import i18n from 'i18next';

interface State { hasError: boolean; error?: Error; }

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="500"
          title={i18n.t('errors.somethingWrong')}
          subTitle={this.state.error?.message}
          extra={<Button type="primary" onClick={() => window.location.reload()}>{i18n.t('errors.reload')}</Button>}
        />
      );
    }
    return this.props.children;
  }
}
