import { useContext, createElement } from 'react';

import HeadingsLevelContext from '@/contexts/level';
import { tm } from '@/utils/tw-merge';

type HeadingProps = React.PropsWithChildren<React.ComponentProps<'h1'>> & {
  showLevel?: boolean;
  className?: string;
};

function Heading({
  showLevel = false,
  className,
  children,
  ...restProps
}: HeadingProps) {
  const level = useContext(HeadingsLevelContext);

  if (level < 1) {
    throw new Error(
      'Heading 컴포넌트는 Section 컴포넌트 내부에서만 사용해야 합니다.'
    );
  }

  if (level > 6) {
    throw new Error(`<h${level}> 요소는 존재하지 않습니다.`);
  }

  return createElement(
    `h${level}`,
    {
      className: tm(
        {
          'flex items-center gap-2': showLevel,
        },
        className
      ),
      ...restProps,
    },
    <>
      {children}
      {showLevel && (
        <span
          className={tm(
            'grid place-items-center',
            'text-[9px] font-black size-5 bg-indigo-950/90 text-white/80 rounded-sm'
          )}
        >
          h{level}
        </span>
      )}
    </>
  );
}

export default Heading;
