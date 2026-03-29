import React from 'react';
import { Result, Button } from 'antd';

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
          title="Something went wrong"
          subTitle={this.state.error?.message}
          extra={<Button type="primary" onClick={() => window.location.reload()}>Reload</Button>}
        />
      );
    }
    return this.props.children;
  }
}
