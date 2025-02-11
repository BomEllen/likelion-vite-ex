import { useEffect, useState } from 'react';
import { getView } from '@/router/manage-view';
import ReactPingIcon from '@/components/react-ping-icon';
import Nav from '@/components/nav';
import Router from '@/router';

function Playground() {
  const [route, setRoute] = useState(getView);

  // [이펙트]
  // 리액트의 외부 시스템과 리액트 앱의 동기화
  // 싱글 페이지 앱의 브라우저 히스토리 탐색(navigation) 기능 구현
  useEffect(() => {
    // 동일한 함수 참조 (구독한 함수와 해지하려는 함수가 동일해야 함)
    const handlePopState = () => {
      // 라우트(route, 길: 전환될 페이지 뷰)
      // 사이드 이펙트 처리
      // 브라우저 히스토리에 상태 푸시(pushState)

      // 변경된 ?view=[????] 읽기
      const params = new URLSearchParams(location.search);
      const nextRoute = params.get('view');

      // ?view=newRoute
      // 리액트 앱 동기화 (표시할 화면)
      // route 상태 변경
      if (nextRoute) setRoute(nextRoute);
    };

    // popstate 이벤트 구독
    globalThis.addEventListener('popstate', handlePopState);

    // popstate 이벤트 구독 해지(정리)
    return () => {
      globalThis.removeEventListener('popstate', handlePopState);
    };
  }, [route]);

  return (
    <section className="Playground bg-euid-gray-200 wrapper">
      <h1 lang="en" className="flex items-center gap-2 font-normal text-react">
        <ReactPingIcon size={24} /> Playground
      </h1>
      <Nav onChangeRoute={setRoute} />
      <Router route={route} />
    </section>
  );
}

export default Playground;
