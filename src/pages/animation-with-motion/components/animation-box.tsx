import { type Ref, useEffect, useRef } from 'react';
import { tm } from '@/utils/tw-merge';
import { animate } from 'motion';

type AnimationBoxProps = Omit<React.ComponentProps<'div'>, 'ref'> & {
  ref: Ref<HTMLButtonElement>;
};

function AnimationBox({
  className,
  children,
  ref,
  ...restProps
}: AnimationBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const boxElement = boxRef.current;

    if (boxElement) {
      animate(
        // 애니메이션 대상
        boxElement,
        // 애니메이션 속성 (CSS 속성, JavaScript 객체 또는 배열 데이터, SVG, ...)
        {
          // x: 240 /* 24px 만큼 이동 */,
          rotate: -360 /* -360deg 만큼 회전 */,
          scale: 0.55,
          x: -28,
          y: -32,
          // opacity: [0, 1],
        },
        // 애니메이션 옵션
        {
          type: 'spring',
          // repeat: 1,
          // repeatDelay: 0.5,
        }
      );
    }
  }, []);

  return (
    <div
      ref={boxRef}
      className={tm(
        'flex justify-center items-center',
        'size-30',
        'bg-react text-white text-lg font-medium',
        'rounded-xl',
        className
      )}
      {...restProps}
    >
      <button
        ref={ref}
        type="button"
        className="cursor-pointer bg-slate-600/60 p-2 rounded-xl"
      >
        {children}
      </button>
    </div>
  );
}

export default AnimationBox;
