import { tm } from '@/utils/tw-merge';
import { useState } from 'react';

interface CounterProps {
  count?: number;
  step?: number;
  min?: number;
  max?: number;
}

function Counter({
  count: initialCount = 0,
  step = 1,
  min = 0,
  max = 10,
}: CounterProps) {
  // [상태: derived state from props]
  const [count, setCount] = useState(initialCount);

  // [파생된 상태: derived state form state]
  const doubleCount = count * 2;

  // [이벤트 핸들러: event handlers]
  const handleDecrease = () => {
    const nextCount = count - step;
    if (nextCount < min) return;
    setCount(nextCount);
  };

  const handleIncrease = () => {
    const nextCount = count + step;
    if (nextCount > max) return;
    setCount(nextCount);
  };

  // [렌더]
  return (
    <div className={tm('flex flex-col gap-2 items-start')}>
      <output className={tm('font-semibold text-3xl text-react')}>
        {count} {doubleCount}
      </output>
      <div className={tm('flex', '*:hover:bg-sky-800 *:cursor-pointer')}>
        <button
          type="button"
          className={tm('px-6 py-1 bg-react text-white rounded-l-full')}
          onClick={handleDecrease}
        >
          -{step}
        </button>
        <button
          type="button"
          className={tm('px-6 py-1 bg-react text-white rounded-r-full')}
          onClick={handleIncrease}
        >
          +{step}
        </button>
      </div>
    </div>
  );
}

export default Counter;
