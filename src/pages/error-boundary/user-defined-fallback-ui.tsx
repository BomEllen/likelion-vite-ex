import { tm } from '@/utils/tw-merge';
import type { FallbackProps } from '@/components/error-boundary/types';

export default function ErrorDisplay({ error }: FallbackProps) {
  return (
    <div role="alert" className={tm('p-8 bg-red-600 text-white')}>
      <h2 className="font-extrabold rounded-2xl">{error?.name} 오류!!</h2>
      <p>{error?.message}</p>
    </div>
  );
}
