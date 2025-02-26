import throttle from '@/utils/throttle';
import { useEffect, useState } from 'react';

function SideEffectDemo() {
  // 관심사 별 묶음(상태, 파생된 상태, 상태 업데이트 로직 포함하는 이벤트 핸들러, 종속성 배열에 상태가 포함된 이펙트)

  // [상태]
  const [count, setCount] = useState(10); // 10

  // [파생된 상태]
  const doubleCount = count ** 2; // 100

  // [이벤트 핸들러]
  const handleChangeCount = () => setCount((c) => c + 2);

  // [이펙트]
  useEffect(() => {
    console.log({ updatedCountValue: count, doubleCount });
  }, [count, doubleCount]);

  // --------------------------------------------------------------------------

  // [상태]
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // [파생된 상태]
  const mouseOverTheCenterOfTheScreen = mouse.x > globalThis.innerWidth / 2;

  // [이펙트]
  // mouseOverTheCenterOfTheScreen 파생된 상태가 변경될 때마다 이펙트 함수 실행
  useEffect(() => {
    console.log({ mouseOverTheCenterOfTheScreen });

    // 명령형 프로그래밍
    // if (mouseOverTheCenterOfTheScreen) {
    //   document.body.classList.add('bg-white', 'text-react');
    // } else {
    //   document.body.classList.remove('bg-white', 'text-react');
    // }
  }, [mouseOverTheCenterOfTheScreen]);

  // 마운트 시, 1회 이벤트 구독/취소 설정
  useEffect(() => {
    // [이벤트 핸들러]
    // JSX에서 해당 이벤트 핸들러를 사용하는 것이 아니라,
    // 이펙트 함수 안에서 이벤트 구독, 취소가 이뤄지므로 이 안에 있는 것이 적절하다.
    const handleMove = throttle((e: PointerEvent) => {
      setMouse({ x: +e.clientX.toFixed(0), y: +e.clientY.toFixed(0) });
    }, 20);

    console.log('이벤트 구독');
    globalThis.addEventListener('pointermove', handleMove);

    return () => {
      console.log('이벤트 구독 해지');
      globalThis.removeEventListener('pointermove', handleMove);
    };
  }, []);

  return (
    <section className="*:text-slate-800 flex flex-col space-y-10">
      <h2 className="text-2xl font-medium mb-2">React.useEffect 훅 함수</h2>

      <button
        type="button"
        className="px-2 py-1 border text-xl"
        onClick={handleChangeCount}
      >
        {count}
      </button>

      <output className="inline-flex my-5 py-3 px-5 border-6 text-2xl">
        x = {mouse.x} / y = {mouse.y}
      </output>
    </section>
  );
}

export default SideEffectDemo;
