import { useEffect, useState } from 'react';
import { tm } from '@/utils/tw-merge';
import Button from './button';

function SideEffectDemo() {
  // useEffect 훅 함수는 React의 외부 시스템과 동기화할 때 사용
  // (필수) 이펙트 함수(effect callback) (외부 시스템과 동기화 코드 작성)
  //       브라우저 이벤트 청취
  // (옵션) 종속성 배열(dependencies) (반응성 데이터(상태 또는 속성)를 설정 가능, 빈 경우는 최초 1회 렌더링 이후 실행 됨)
  // (옵션) 이펙트 클린업(cleanup, 정리) 함수
  //       브라우저 이벤트 청취 해지
  useEffect(() => {
    // React 렌더링과 관련이 없는 브라우저의 타이머 API 사용
    // 타이머 작동
    let clearTimeoutId: NodeJS.Timeout;

    const log = () => {
      console.log(new Date().toLocaleTimeString());
      clearTimeoutId = setTimeout(log, 1000);
    };

    log();

    return () => {
      clearTimeout(clearTimeoutId);
    };

    // 클린업(정리) 함수 = 이펙트 함수가 반환한 함수
    // const cleanup = () => {
    //   // 타이머 중단
    //   clearInterval(clearIntervalId);
    // };

    // return cleanup;

    // return /* cleanup */ () => {
    //   // 타이머 중단
    //   clearInterval(clearIntervalId);
    // };
  }, []);

  // --------------------------------------------------------------------------

  const [message, setMessage] = useState('');

  const handleConfirmStateChange = () => {
    console.group('상태 변경 요청');
    console.log('[전]', { message });
    const nextMessage = message + '🎩';
    setMessage(nextMessage);

    console.log('[후]', { message: nextMessage });
    console.groupEnd();
  };

  useEffect(() => {
    console.log('이펙트 함수 콜백', { message });
  }, [message]);

  // --------------------------------------------------------------------------

  const [count, setCount] = useState(0);

  const handleChangeCount = () => setCount((c) => c + 1);

  useEffect(() => {
    console.log({ count });
  }, [count]);

  // --------------------------------------------------------------------------

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
