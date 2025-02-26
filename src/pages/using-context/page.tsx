import Title from '@/components/title';
import GrandParent from './components/grand-parent';
import { createContext, useState } from 'react';
import AnotherParent from './components/another-parent';

interface GreetingContextValue {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

// 컨텍스트 생성
export const GreetingContext = createContext<GreetingContextValue>({
  message: '',
  setMessage() {
    console.log('초기 함수');
  },
});

// 컨텍스트.프로바이더(공급자) => 값 공급
// 컨텍스트.컨서머(수요자) <== 공급된 값을 수요 (사용 권장 안함: 오래된 예전 방식)
// 컨텍스트 공급된 값 = useContext(컨텍스트)
// 컨텍스트 === 컨텍스트.프로바이더 (동일한 객체 참조)

function UsingContextPage() {
  // 페이지 컴포넌트 상태
  // 상태 공유의 고민 거리...
  // Prop Drilling
  const [message, setMessage] = useState('안녕! Grand Parent');

  // 고민 거리 해결!!!
  // Context (value providing)
  const value = { message, setMessage };

  return (
    <>
      <Title>컨텍스트를 사용한 상태 공유</Title>
      <section className="flex flex-col gap-5">
        <GreetingContext.Provider value={value}>
          <h2 className="text-2xl font-medium">컨텍스트 활용</h2>
          <h3 className="text-xl font-medium">컨텍스트 범위</h3>
          <GrandParent />
        </GreetingContext.Provider>
        <hr />
        <h3 className="text-xl font-medium">컨텍스트 외부</h3>
        <AnotherParent />
      </section>
    </>
  );
}

export default UsingContextPage;
