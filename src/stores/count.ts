import { create } from 'zustand';
import {
  combine,
  devtools,
  persist,
  subscribeWithSelector,
} from 'zustand/middleware';

// 초기 상태
const initialState = {
  count: 1,
  step: 1,
  min: 1,
  max: 100,
};

// 파생된 상태
const derivedState = {
  square: initialState.count ** 2,
};

export const useCountStore = create(
  // 셀렉터 구독 미들웨어
  subscribeWithSelector(
    // 스토리지 저장(유지) 미들웨어
    persist(
      // 개발도구 미들웨어
      devtools(
        // 병합(combine) 미들웨어
        // 상태 + 스토어 생성 함수(액션만 포함)
        combine(
          {
            ...initialState,
            ...derivedState,
          },
          (set, get) => ({
            increment: () =>
              set(
                ({ count, step, max }) => {
                  const nextCount = count + step;
                  return {
                    ...get(),
                    count: nextCount > max ? max : nextCount,
                  };
                },
                undefined,
                'counter/increment'
              ),
            update: (value: number) =>
              set(
                ({ min, max }) => {
                  if (value < min) {
                    value = min;
                  }

                  if (value > max) {
                    value = max;
                  }

                  return { count: value };
                },
                undefined,
                'counter/update'
              ),
            decrement: () =>
              set(
                ({ count, step, min }) => {
                  const nextCount = count - step;
                  return {
                    count: nextCount < min ? min : nextCount,
                  };
                },
                undefined,
                'counter/decrement'
              ),
            reset: () => set(initialState, undefined, 'counter/reset'),
          })
        )
      ),
      {
        name: 'store/counter',
      }
    )
  )
);

useCountStore.subscribe(
  // 셀렉터
  (s) => s.count,
  // 리스너
  (count) => {
    useCountStore.setState({
      square: count ** 2,
    });
  }
);
