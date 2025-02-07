import { tm } from '@/utils/tw-merge';

type CellProps = Omit<React.ComponentProps<'button'>, 'onClick'> & {
  onPlay: () => void;
};

function Cell({ children, className = '', onPlay, ...restProps }: CellProps) {
  // 셀 버튼을 사용자가 더 이상 누르지 못하게 하려면?
  // [조건] 플레이어가 있냐? 없냐?
  // [파생된 상태] 외부에서 전달된 속성(prop)에 의존해 값이 계산
  // hasChildren, isDisabled, ...
  // const hasChildren = Boolean(children);
  const hasChildren = !!children;

  const handlePlay = () => {
    // 화면에 표시한 플레이어(콘텐츠)가 있다면? (함수 종료)
    if (hasChildren) return;
    // 화면에 표시한 플레이어(콘텐츠)가 없다면? (onPlay 함수 실행)
    onPlay?.();
  };

  return (
    <button
      type="button"
      onClick={handlePlay}
      aria-disabled={hasChildren}
      className={tm(
        'cursor-pointer',
        'size-16 border rounded-md',
        'text-2xl font-semibold',
        'border-black/50',
        { 'hover:border-black hover:bg-slate-100/60': !hasChildren },
        { 'cursor-not-allowed bg-black/10': hasChildren },
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
}

export default Cell;
