import { tm } from '@/utils/tw-merge';

type CellProps = Omit<React.ComponentProps<'button'>, 'onClick'> & {
  onPlay: () => void;
};

function Cell({ children, className = '', onPlay, ...restProps }: CellProps) {
  const handlePlay = () => {
    onPlay?.();
  };

  return (
    <button
      type="button"
      className={tm(
        'cursor-pointer',
        'size-16 border rounded-md',
        'text-2xl font-semibold',
        'border-black/50',
        'hover:border-black hover:bg-slate-100/60',
        className
      )}
      onClick={handlePlay}
      {...restProps}
    >
      {children}
    </button>
  );
}

export default Cell;
