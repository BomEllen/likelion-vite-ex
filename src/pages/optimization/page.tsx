/* eslint-disable react-refresh/only-export-components */
import { createContext, useMemo, useState } from 'react';
import Heading from '@/components/heading';
import Section from '@/components/section';
import Title from '@/components/title';
import Counter from './components/counter';
import Message from './components/message';
import ColorContextSetter from './components/color-context-setter';

export const ColorContext = createContext('');

function OptimizationPage() {
  // 상태
  const [color, setColor] = useState('#45a6d9');

  // 상태 업데이트 로직을 포함하는 이벤트 핸들러
  // 하위 컴포넌트에 전달하는 함수는 매번 렌더링될 때마다 새로운 함수가 된다.... (리-렌더링 주 원인)
  // 하위 컴포넌트 메모 했음에도 왜??? 다시 렌더링되는 것일까? (속성(prop)이 변했기 때문)

  // 이벤트 핸들러(함수) 참조를 하위 컴포넌트에 전달해야 하는 상황
  // 이벤트 핸들러(함수) 참조를 기억해야 한다.
  // useMemo 또는 useCallback
  // 기억하려는 값의 유형은? 함수!!
  // useMemo? useCallback?

  // 원본 함수 (렌더링 될 때마다 새로워짐)
  // const handleColor = (nextColor: string) => setColor(nextColor);

  // useMemo 버전 (함수 값 기억)
  // const handleColorMemo = useMemo(() => 함수값, []);
  // const handleColorMemo = useMemo(() => (nextColor: string) => setColor(nextColor), []);

  // useCallback 버전 (함수 값 기억)
  // const handleColorCb = useCallback(함수값, []);
  // const handleColorCb = useCallback((nextColor: string) => setColor(nextColor), []);
  // const handleColor = useCallback(
  //   (nextColor: string) => setColor(nextColor),
  //   []
  // );

  const [stars, setStars] = useState('⭐️');
  const handleAddStar = () => setStars((s) => s + '⭐️');

  // 4. 값(요소 = 객체) 메모(memo)
  const messageElement = useMemo(
    () => <Message greeting="요소 최적화가 필요해요! 😳" />,
    // 종속성이 변경되지 않는 이상 다시 실행될 일은 없다.
    []
  );

  return (
    <>
      <Title>리액트 앱 성능 최적화</Title>

      <Section level={2}>
        <Heading className="text-2xl font-medium">성능 최적화</Heading>

        <hr className="my-8 border-black/20" />

        <div className="flex gap-0.5 overflow-auto">
          <button
            type="button"
            className="cursor-pointer shrink-0 py-2 px-4 bg-black text-white font-bold rounded-sm"
            onClick={handleAddStar}
          >
            ⭐️ 추가
          </button>
          <output className="py-2 px-3 bg-black text-white rounded-sm tracking-widest">
            {stars}
          </output>
        </div>

        <hr className="my-8 border-black/20" />

        <ColorContext value={color}>
          <ColorContextSetter setColor={setColor} />
          <Counter messageElement={messageElement} />
        </ColorContext>
      </Section>
    </>
  );
}

export default OptimizationPage;
