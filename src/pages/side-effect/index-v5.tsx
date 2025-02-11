import { useEffect, useState } from 'react';

function SideEffectDemo() {
  // [반응성 데이터: 상태] 선언
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // [이펙트] 이벤트 구독 / 취소
  useEffect(() => {
    // 사이드 이펙트 처리
    // 브라우저 시스템(React의 외부 시스템)과 React 앱 동기화(sync)
    // 이벤트 구독
    console.log('이벤트 구독');

    const handleMove = (e: PointerEvent) => {
      // 리액트 상태 업데이트 (리액트 앱과 외부 시스템 동기화)
      setMouse({ x: +e.clientX.toFixed(0), y: +e.clientY.toFixed(0) });
    };

    globalThis.addEventListener('pointermove', handleMove);

    // 이벤트 구독 해지
    return () => {
      console.log('이벤트 구독 해지');
      globalThis.removeEventListener('pointermove', handleMove);
    };
  }, []);

  return (
    <section className="*:text-slate-800">
      <h2 className="text-2xl font-medium mb-2">React.useEffect 훅 함수</h2>
      <output className="inline-flex my-5 py-3 px-5 border-2 text-2xl">
        x = {mouse.x} / y = {mouse.y}
      </output>
    </section>
  );
}

export default SideEffectDemo;
