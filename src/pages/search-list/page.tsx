/*
  useImperativeHandle 한번 요약해주실 수 있나요?

상태 관리 목적 훅
(용도: 상태 선언 후, 상태 변경이 되면 리액트가 화면을 업데이트)
useState

이펙트 처리 목적 훅
(용도: 브라우저 API를 사용해 외부 시스템과 리액트 동기화)
useEffect

렌더링과 무관하게 데이터를 기억할 때 사용할 목적 훅
(기억할 데이터: 이전 상태 값 참조, DOM 참조, 어떤 값이든 참조 가능)
useRef

하위 컴포넌트 내부에 작성한 핸들(함수, 기능)을 상위 컴포넌트에 공유할 목적 훅
(용도: 하위 컴포넌트 내부의 DOM을 모두 노출하지 않고, DOM 제어 기능(함수)만 공개)
useImperativeHandle
  
*/

import { tm } from '@/utils/tw-merge';
import { useEffect, useRef, useState } from 'react';
import SearchForm from './components/search-form-18-version';
import SearchedList from './components/searched-list';
import colorMoodList from './data/color-mood-list';
import { type ColorMoodItem } from './types';
import { getQueryParam } from './utils/query-param';
import Title from '@/components/title';

const getQueryState = () => getQueryParam() ?? '';

function SearchListPage() {
  console.log('render: search list page');
  const [list, setList] = useState<ColorMoodItem[]>(colorMoodList);

  const handleUpdateList = (item: ColorMoodItem, isFavorited: boolean) => {
    setList(
      list.map((it) => (it.id === item.id ? { ...it, isFavorited } : it))
    );
  };

  const [query, setQuery] = useState(getQueryState);

  useEffect(() => {
    const handlePopState = () => {
      setQuery(getQueryState);
    };

    globalThis.addEventListener('popstate', handlePopState);

    return () => {
      globalThis.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // --------------------------------------------------------------------------

  // 참조 객체
  const sharedImperativeHandlesRef = useRef<{
    focus: () => void;
    select: () => void;
    remove: () => void;
  }>(null);

  useEffect(() => {
    console.log('effect callback: use effect');
    const clearId = setTimeout(() => {
      const handles = sharedImperativeHandlesRef.current;
      if (handles) {
        handles.select();

        // [문제 상황]
        // 자식이 모든 권한을 부여했으므로
        // 자식 내부에 있는 감춰진 요소에 무슨 짓을 해도 된다.
        // 문제가 발생할 수 있다. 누군가에 의해....
        // 그 코드를 디버깅하기가 쉽지 않다.

        // [문제 해결]
        // 이런 어처구니 없는 상황이 누군가에 의해 발생하지 않도록
        // 컴포넌트 DOM을 전면 공개할 것이 아니라, 일부 명령형 기능(함수)만
        // 상위 컴포넌트에 공유하겠노라!!!
        // sharedImperativeHandlesRef.current.remove();
      }
    }, 900);

    return () => {
      clearTimeout(clearId);
    };
  });

  return (
    <>
      <Title>검색 리스트 UI</Title>
      <section className={tm('flex flex-col gap-5 items-center')}>
        <h2 className="text-2xl font-medium text-react">카드 검색 리스트</h2>
        <SearchForm
          ref={sharedImperativeHandlesRef}
          query={query}
          setQuery={setQuery}
        />
        <SearchedList list={list} query={query} onUpdate={handleUpdateList} />
      </section>
    </>
  );
}

export default SearchListPage;
