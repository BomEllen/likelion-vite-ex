import { animate } from 'motion';
import { tm } from '@/utils/tw-merge';
import { useEffect, useRef } from 'react';

function StaggerList() {
  const itemMapRef = useRef<null | Map<number, HTMLLIElement>>(null);

  const getItemMap = () => {
    // 최초 렌더링 시, Map 객체 생성
    if (itemMapRef.current === null) {
      itemMapRef.current = new Map();
    }

    // 이후 렌더링 시에는 기억된 Map 객체 반환
    return itemMapRef.current;
  };

  useEffect(() => {
    const itemMap = getItemMap();
    const items = Array.from(itemMap.values());

    items.forEach((item, index) => {
      animate(
        item,
        {
          // keyframes 애니메이션
          y: [100, -50, 25, 5, 0],
          opacity: [0, 1],
        },
        // 스태거(stagger) 애니메이션
        { delay: 0.2 * index }
      );
    });
  }, []);

  return (
    <ul className="flex gap-2.5">
      {Array(6)
        .fill(null)
        .map((_, index) => {
          return (
            <li
              ref={
                /* ref 콜백 함수 */
                (element) => {
                  // Map 객체에 <li> DOM 요소 수집
                  const itemMap = getItemMap();

                  if (element) {
                    itemMap.set(index, element);
                  }

                  // 클린업(정리)
                  return () => {
                    itemMap.delete(index);
                  };
                }
              }
              key={index}
              className={tm(
                'flex justify-center items-center size-16 rounded-lg',
                'bg-react text-white text-lg font-medium'
              )}
            >
              {index + 1}
            </li>
          );
        })}
    </ul>
  );
}

export default StaggerList;
