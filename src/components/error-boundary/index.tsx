import { Component, type ErrorInfo } from 'react';
import ErrorFallbackUI from './error-fallback-ui';

interface Props {
  FallbackComponent?: typeof ErrorFallbackUI;
  children: React.ReactNode;
}

interface State {
  error: null | Error;
  errorInfo: null | ErrorInfo;
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    error: null,
    errorInfo: null,
    hasError: false,
  };

  // 오류 감지하기 위한 라이프 사이클 메서드
  // static getDerivedStateFromError(error: Error) {
  //   // 상태 업데이트
  //   return {
  //     hasError: true,
  //     error,
  //   };
  // }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      errorInfo,
      error,
    });
  }

  render() {
    // 오류가 있으면
    // 대체(fallback) 컴포넌트를 렌더링
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;
      const { FallbackComponent } = this.props;

      return FallbackComponent ? (
        <FallbackComponent error={error} errorInfo={errorInfo} />
      ) : (
        <ErrorFallbackUI error={error} errorInfo={errorInfo} />
      );
    }

    // 오류가 없으면
    // 하위 컴포넌트 렌더링
    return this.props.children;
  }
}

export default ErrorBoundary;
