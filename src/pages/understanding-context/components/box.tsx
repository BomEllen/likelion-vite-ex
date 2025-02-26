import { tm } from '@/utils/tw-merge';
import { BoxLevelContext, useBoxLevel } from '../context/box-level';

interface BoxProps {
  level?: number;
  children?: React.ReactNode;
}

function Box({ level, children }: BoxProps) {
  // const boxLevel = use(BoxLevelContext);
  const boxLevel = useBoxLevel();
  const nextBoxLevel = level ?? boxLevel + 1;

  if (nextBoxLevel > 4) {
    throw new Error('box level은 4까지만 가능합니다.');
  }

  return (
    <BoxLevelContext value={nextBoxLevel}>
      <div
        className={tm(
          'relative w-full',
          'shrink-0 flex flex-col justify-center items-center',
          'bg-black/35 text-white py-10 px-8'
        )}
      >
        <span
          className={tm(
            'absolute top-0 left-0',
            'grid place-items-center',
            'size-5 text-xs bg-black'
          )}
        >
          {nextBoxLevel}
        </span>
        {children}
      </div>
    </BoxLevelContext>
  );
}

export default Box;
