import type { Cells, Winner } from '../constants';
import { tm } from '@/utils/tw-merge';
import Status from './status';
import Grid from './grid';

interface BoardProps {
  cells: Cells;
  winner: Winner;
  statusMessage: string;
  onPlayGame?: (cellIndex: number) => void;
  onReGame?: () => void;
}

function Board({
  cells,
  winner,
  statusMessage,
  onPlayGame,
  onReGame,
}: BoardProps) {
  return (
    <section className={tm('flex flex-col space-y-2 items-center', 'w-60')}>
      <h3 className="sr-only">게임 보드</h3>
      <Status message={statusMessage} onReGame={onReGame} />
      <Grid cells={cells} winner={winner} onPlay={onPlayGame} />
    </section>
  );
}

export default Board;
