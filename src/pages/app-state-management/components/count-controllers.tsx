import { tm } from '@/utils/tw-merge';
import { useCountStore } from '@/stores/count';
import { Minus, Plus, Redo } from '@mynaui/icons-react';
import { memo } from 'react';

function CountControllers() {
  const increment = useCountStore((s) => s.increment);
  const decrement = useCountStore((s) => s.decrement);
  const reset = useCountStore((s) => s.reset);

  return (
    <div className="flex gap-1">
      <button
        type="button"
        className={tm(
          'cursor-pointer',
          'size-10 rounded-full',
          ' bg-react text-white font-black',
          'flex justify-center items-center'
        )}
        onClick={increment}
      >
        <Plus size={24} />
      </button>
      <button
        type="button"
        className={tm(
          'cursor-pointer',
          'size-10 rounded-full',
          ' bg-react text-white font-black',
          'flex justify-center items-center'
        )}
        onClick={decrement}
      >
        <Minus size={24} />
      </button>
      <button
        type="button"
        className={tm(
          'cursor-pointer',
          'size-10 rounded-full',
          ' bg-react text-white font-black',
          'flex justify-center items-center'
        )}
        onClick={reset}
      >
        <Redo size={24} />
      </button>
    </div>
  );
}

export default memo(CountControllers);
