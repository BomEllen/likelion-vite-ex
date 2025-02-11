import { tm } from '@/utils/tw-merge';
import { useEffect, useState } from 'react';

// 현재 컴포넌트가 마운트 되었는 지 확인하기 위한 변수
// 리액트 컴포넌트 렌더링 프로세스와 무관
let isMounted = false;

function SideEffectDemo() {
  // 리액트의 렌더링과 관련된 상태 변수 (React 로봇 구동 작동법)
  const [message, setMessage] = useState('');

  // --------------------------------------------------------------------------
  // 마운트 이후, 1회 실행되는 이펙트 처리
  // 종속성 배열은 비워두기 []

  // [사이드 이펙트] (React 로봇과 관련없는 주변의 것들)
  // - 외부의 isMounded 변수 값 확인
  // - 리액트 렌더링과 상관 없음
  if (!isMounted) {
    // [결론]
    // 컴포넌트 초기 렌더링 시점에 컴포넌트(함수) 몸체 안에서
    // 실제 DOM 요소 노드에 접근하려 시도하면 안됨!!
    const buttonElement = document.querySelector('button[title="🍏 추가"]');
    console.error('컴포넌트 몸체에서 DOM 노드 접근', buttonElement);
  }

  // 리액트 컴포넌트(함수) 몸체 안에서 useEffect 훅에 설정된
  // 이펙트 함수 안에서는 사이드 이펙트 처리 가능 (즉, 여기엔 외부 시스템 연동 코드 작성해도 됨!!)
  useEffect(
    // 이펙트 콜백 (함수)
    // 언제 실행되는가? (조건 요구)
    // 조건이 일치한다면 렌더링 이후 시점에 콜백 실행
    // 리액트 규칙 (조건문, 반복문 안에서 훅 함수 사용 불가능!)
    () => {
      // 리액트 렌더링 프로세스와 무관한 사이드 이펙트(리액트와 관련 없는 외부 시스템에 접근, 조작 등) 처리
      // 사이드 이펙트 (브라우저 API 활용, React와 무관)
      const buttonElement = document.querySelector('button[title="🧤 추가"]');

      console.group('마운트 이후 1회 실행됨');
      console.log('componentDidMount 라이프 사이클 메서드와 유사');
      console.log('이펙트 콜백 함수 안에서 DOM 노드 접근', buttonElement);
      console.groupEnd();

      // 사이드 이펙트 처리
      // 리액트 렌더링과 상관없는 외부 변수 값 변경 시도
      // 컴포넌트가 렌더링되어 ReactDOM에 의해 실제 DOM으로 마운트 되었음을 보장
      isMounted = true;
    },
    // 이펙트 종속(의존)성 배열
    // 배열 내부에 반응성(reactivity) 상태 변수 설정
    // 반응성 상태 값이 변경되면, 이펙트 콜백(함수) 호출
    // 즉, 이펙트 콜백 함수를 실행하는 조건은 종속성 배열
    []
  );

  // --------------------------------------------------------------------------
  // 마운트 이후 또는 관심을 둔 상태가 변경될 때 마다 이펙트 처리
  // 종속성 배열에 반응성 상태 추가 [message, anotherStateVariable, prop, ...]
  // 클래스 컴포넌트의 componentDidMount + componentDidUpdate 라이프 사이클 메서드와 유사
  useEffect(() => {
    console.log('[state] in SideEffectDemo Component\n', { message });
  }, [message]);

  // useEffect(() => {
  //   console.log({ isMounted });
  // }, [isMounted]);

  // --------------------------------------------------------------------------

  return (
    <section className="*:text-slate-800">
      <h2 className="text-2xl font-medium mb-2">React.useEffect 훅 함수</h2>
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

// --------------------------------------------------------------------------

function Button({
  message,
  onMessage,
}: {
  message: string;
  onMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  useEffect(() => {
    console.log('[props] in Button Component\n', { message });
  }, [message]);

  return (
    <button
      type="button"
      title="🧤 추가"
      className={tm(
        'cursor-pointer select-none',
        'rounded-md py-0.5 px-1.5 border-2 border-react',
        'hover:bg-react/10 '
      )}
      onClick={() => {
        // console.group('상태 업데이트');
        // console.log('[전]', message);
        onMessage((message) => message + '🧤');
        // console.log('[후]', message);
        // console.groupEnd();
      }}
    >
      🧤 <span className="sr-only">추가</span>
    </button>
  );
}
