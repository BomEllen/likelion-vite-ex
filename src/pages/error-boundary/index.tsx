import Wrapper from './wrapper';
import { tm } from '@/utils/tw-merge';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

function ErrorBoundaryDemo() {
  return (
    <section className={tm('flex flex-col gap-2 mt-6')}>
      <h2 className={tm('text-2xl')}>오류 경계 (Error Boundary)</h2>
      <p className={tm('text-sm')}>
        오류 경계는 함수 컴포넌트로 구현 불가능합니다.
        <br />
        오직 클래스 컴포넌트로만 구현 가능합니다.
      </p>

      {/* 오류 발생 가능성이 있는 컴포넌트 집합 */}
      <ErrorBoundary FallbackComponent={Fallback}>
        <Wrapper />
      </ErrorBoundary>
    </section>
  );
}

export default ErrorBoundaryDemo;

// 사용자 정의 오류 경계 대체 컴포넌트
function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>오류가 발생했습니다. 😥</p>
      <pre className="my-3 p-3 border-2 border-red-600 text-red-600">
        {(error as Error).message}
      </pre>
      <button
        type="button"
        className="bg-indigo-600 text-indigo-100 p-2"
        onClick={resetErrorBoundary}
      >
        오류 경계 초기화
      </button>
    </div>
  );
}
