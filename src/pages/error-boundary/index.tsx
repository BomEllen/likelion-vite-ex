import { ErrorInfo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorDisplay from './user-defined-fallback-ui';
import { tm } from '@/utils/tw-merge';
import Wrapper from './wrapper';

function ErrorBoundaryDemo() {
  const handleError = (_error: Error, info: ErrorInfo) => {
    console.error(info.componentStack);
  };

  return (
    <section className={tm('flex flex-col gap-2 mt-6')}>
      <h2 className={tm('text-2xl')}>오류 경계 (Error Boundary)</h2>
      <p className={tm('text-sm')}>
        오류 경계는 함수 컴포넌트로 구현 불가능합니다.
        <br />
        오직 클래스 컴포넌트로만 구현 가능합니다.
      </p>

      {/* 오류 발생 가능성이 있는 컴포넌트 집합 */}
      <ErrorBoundary FallbackComponent={ErrorDisplay} onError={handleError}>
        <Wrapper />
      </ErrorBoundary>
    </section>
  );
}

export default ErrorBoundaryDemo;
