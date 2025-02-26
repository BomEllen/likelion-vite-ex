import { tm } from '@/utils/tw-merge';
import { useContext } from 'react';
import { TicTacToeContext } from '../contexts/tic-tac-toe';
import { useTheme } from '@/contexts/theme';

type CellProps = Omit<React.ComponentProps<'button'>, 'onClick'> & {
  index: number;
};

function Cell({ index, children, className = '', ...restProps }: CellProps) {
  const { mode } = useTheme();

  const { playGame } = useContext(TicTacToeContext);

  const hasChildren = !!children;

  const handlePlay = () => {
    if (hasChildren) return;
    playGame(index);
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
        { 'bg-black text-white': mode.includes('dark') },
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
}

export default Cell;
