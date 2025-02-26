import { createContext, useContext } from 'react';

// React Context 생성
// 용도: Box 레벨을 증가

export const BoxLevelContext = createContext(0);

/* -------------------------------------------------------------------------- */

// 컴포넌트에서 BoxLevelContext의 값에 접근할 수 있는 커스텀 훅 작성
export const useBoxLevel = () => {
  // 컨텍스트 값을 가져오기
  const boxLevel = useContext(BoxLevelContext);

  // 유효성 검사
  if (boxLevel === undefined) {
    throw new Error(
      'useBoxLevel 훅은 BoxLevelContext 안에서만 사용이 가능합니다.'
    );
  }

  // 검사 통과 시, 컨텍스트 값을 반환
  return boxLevel;
};
