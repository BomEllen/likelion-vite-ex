import { animate, stagger } from 'motion';
import { tm } from '@/utils/tw-merge';
import { useEffect, useRef } from 'react';

function StaggerList() {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const listElement = listRef.current;

    if (listElement) {
      const listItems = listElement.querySelectorAll('li');

      animate(
        listItems,
        {
          y: [100, -50, 25, 5, 0],
          opacity: [0, 0.5, 1, 0.5, 1],
        },

        { delay: stagger(0.2) }
      );
    }
  }, []);

  return (
    <ul ref={listRef} className="flex gap-2.5">
      {Array(6)
        .fill(null)
        .map((_, index) => {
          return (
            <li
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
