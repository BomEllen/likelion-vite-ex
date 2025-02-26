import { tm } from '@/utils/tw-merge';
import { FallbackProps } from 'react-error-boundary';

function PrintError({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      role="alert"
      className={tm(
        'flex flex-col gap-2 rounded-md',
        'p-5 bg-black text-red-600 font-semibold',
        'border-4 border-red-600'
      )}
    >
      <h2 className="text-2xl">오류 발생</h2>
      <p className="text-lg text-red-500/90 mb-2">{(error as Error).message}</p>
      <button
        type="button"
        className={tm(
          'cursor-pointer',
          'self-start',
          'px-3 py-1.5 rounded-sm',
          'text-red-500 border-3 border-red-800'
        )}
        onClick={resetErrorBoundary}
      >
        오류 복구
      </button>
    </div>
  );
}

export default PrintError;
