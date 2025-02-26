import { useCountStore } from '@/stores/count';
import { memo } from 'react';

function CountDisplay() {
  const { count, square } = useCountStore();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 items-center">
        <span>카운트(count)</span>
        <output className="font-black text-3xl">{count}</output>
      </div>
      <div className="flex gap-1 items-center">
        <span>제곱(square)</span>
        <output className="font-black text-3xl">{square}</output>
      </div>
    </div>
  );
}

export default memo(CountDisplay);
