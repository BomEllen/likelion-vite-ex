import { tm } from '@/utils/tw-merge';
import type { FallbackProps } from './types';

function ErrorFallbackUI({
  error,
  errorInfo,
}: FallbackProps): React.ReactElement {
  return (
    <div
      role="alert"
      className={tm(
        'overflow-x-scroll',
        'flex flex-col gap-2',
        'border-4 border-red-600',
        'p-5',
        ' text-red-600'
      )}
    >
      <h2 className={tm('text-xl font-semibold')}>{error?.name} 오류 발생!</h2>
      <p className={tm('text-red-700 font-normal')}>{error?.message}</p>
      <pre className="-ml-8 text-xs leading-[2]">
        {errorInfo?.componentStack}
      </pre>
    </div>
  );
}

export default ErrorFallbackUI;
