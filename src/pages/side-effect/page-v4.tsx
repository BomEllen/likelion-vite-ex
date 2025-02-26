import { useEffect, useState } from 'react';
import { tm } from '@/utils/tw-merge';
import Button from './button';

function SideEffectDemo() {
  // 정리(cleanup) 함수의 필요성(중요성)!!
  // 메모리 누수 방지 (성능 저하 차단, 책임을 지는 행위)
  useEffect(() => {
    let clearTimeoutId: NodeJS.Timeout;

    const log = () => {
      console.log(new Date().toLocaleTimeString());
      clearTimeoutId = setTimeout(log, 1000);
    };

    log();

    return () => {
      clearTimeout(clearTimeoutId);
    };
  }, []);

  // --------------------------------------------------------------------------

  // [상태]
  const [message, setMessage] = useState('');

  // [이벤트 핸들러]
  const handleConfirmStateChange = () => {
    console.group('상태 변경 요청');
    console.log('[전]', { message });
    const nextMessage = message + '🎩';
    setMessage(nextMessage);

    console.log('[후]', { message: nextMessage });
    console.groupEnd();
  };

  // [이펙트]
  useEffect(() => {
    console.log('이펙트 함수 콜백', { message });
  }, [message]);

  // --------------------------------------------------------------------------

  // [상태] count (반응성 데이터)
  const [count, setCount] = useState(0);

  // [이벤트 핸들러] setCount를 사용해 상태 변경 (화면 업데이트)
  const handleChangeCount = () => setCount((c) => c + 1);

  // [이펙트] React 외부 시스템과 React 앱의 동기화 처리
  useEffect(() => {
    console.log({ count });
  }, [count]);

  return (
    <section className="*:text-slate-800">
      <h2 className="text-2xl font-medium mb-2">React.useEffect 훅 함수</h2>
      <button
        type="button"
        className={tm(
          'cursor-pointer',
          'px-2.5 py-1 rounded-tl-md',
          'bg-black !text-white'
        )}
        onClick={handleConfirmStateChange}
      >
        상태 변경 (요청)
      </button>
      <hr />
      <button
        type="button"
        className={tm(
          'cursor-pointer',
          'flex justify-center items-center',
          'size-8 my-2 p-0 rounded-full',
          'bg-black !text-white font-extrabold'
        )}
        onClick={handleChangeCount}
      >
        {count}
      </button>
      <div className="flex gap-3 items-center">
        <p>Console 패널을 열고 🧤 버튼을 눌러보세요.</p>
        <Button message={message} onMessage={setMessage} />
      </div>

      <p
        className={tm(
          'select-none',
          'text-5xl mt-5 leading-tight text-lime-700'
        )}
      >
        {message}
      </p>
    </section>
  );
}

export default SideEffectDemo;
