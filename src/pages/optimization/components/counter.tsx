import { useState, memo } from 'react';

// const messageElement = createElement(Message, {
//   greeting: '요소 최적화가 필요해요! 😳',
// });

// const messageElement = <Message greeting="요소 최적화가 필요해요! 😳" />;

/* -------------------------------------------------------------------------- */

interface CounterProps {
  messageElement?: React.ReactElement;
}

function Counter({ messageElement }: CounterProps) {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);

  return (
    <div className="flex gap-2 items-center">
      <button
        type="button"
        className="cursor-pointer bg-react text-white size-10 font-black rounded-full"
        onClick={increment}
      >
        {count}
      </button>
      <div className="bg-react py-2 px-4 rounded-sm">{messageElement}</div>
    </div>
  );
}

// 5. 컴포넌트 메모(memo)
export default memo(Counter);
