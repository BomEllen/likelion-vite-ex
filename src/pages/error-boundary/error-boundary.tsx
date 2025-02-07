import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  error: null | Error;
}

// ErrorBoudary 컴포넌트는 오직 클래스 컴포넌트로만 구현 가능
class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    error: null,
  };

  render() {
    return !this.state.error ? (
      this.props.children
    ) : (
      <div role="alert" aria-live="polite">
        {this.state.error.message}
      </div>
    );
  }
}

export default ErrorBoundary;
