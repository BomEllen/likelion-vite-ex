import { tm } from '@/utils/tw-merge';
import type { FallbackProps } from 'react-error-boundary';

// 사용자 정의 오류 경계 대체 컴포넌트
function ErrorDisplay({
  error,
  resetErrorBoundary,
}: FallbackProps & {
  error: Error;
}) {
  return (
    <div
      role="alert"
      className={tm(
        'flex flex-col space-y-3 items-start',
        'border-5 border-rose-600 p-4',
        'rouned *:rounded'
      )}
    >
      <p className={tm('text-lg font-semibold text-rose-700')}>
        오류가 발생했습니다. 😥
      </p>
      <pre
        className={tm(
          'cursor-help',
          'p-2 border-1 border-rose-600 w-full',
          'text-rose-600 -tracking-tight',
          'hover:bg-rose-50/20'
        )}
      >
        {(error as Error).message}
      </pre>
      <button
        type="button"
        className={tm(
          'cursor-pointer',
          'bg-rose-600 text-rose-50 py-2 px-3',
          'font-semibold',
          'hover:bg-rose-700'
        )}
        onClick={() => {
          alert('컴포넌트를 다시 렌더링하여 오류 복구를 시도합니다.');
          resetErrorBoundary();
        }}
      >
        오류 복구 시도
      </button>
    </div>
  );
}

export default ErrorDisplay;
