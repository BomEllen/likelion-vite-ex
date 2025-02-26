import { tm } from '@/utils/tw-merge';
import Status from './status';
import Grid from './grid';

function Board() {
  return (
    <section className={tm('flex flex-col space-y-2 items-center', 'w-60')}>
      <h3 className="sr-only">게임 보드</h3>
      <Status />
      <Grid />
    </section>
  );
}

export default Board;
