import { useCountStore } from '@/stores/count';
import { memo } from 'react';
import CountControllers from './count-controllers';
import CountDisplay from './count-display';

function Counter() {
  // const min = useCountStore((s) => s.min);
  // const max = useCountStore((s) => s.max);
  // const count = useCountStore((s) => s.count);
  // const update = useCountStore((s) => s.update);
  const { min, max, count, update } = useCountStore();

  return (
    <div className="flex flex-col gap-2 items-start">
      <CountDisplay />
      <input
        type="number"
        aria-label="카운트 값"
        className="border bg-white text-black pl-2"
        min={min}
        max={max}
        value={count}
        onChange={(e) => {
          update(Number(e.currentTarget.value));
        }}
      />
      <CountControllers />
    </div>
  );
}

export default memo(Counter);
