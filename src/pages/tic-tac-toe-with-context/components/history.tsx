import { tm } from '@/utils/tw-merge';
import HistoryItem from './history-item';
import { useContext } from 'react';
import { TicTacToeContext } from '../contexts/tic-tac-toe';

function History() {
  const { gameHistory, gameOrder, jumpGame } = useContext(TicTacToeContext);
  const count = gameHistory?.length;
  const historyCount = Array(count).fill(null);

  return (
    <section className={tm('flex flex-col space-y-2 items-center', 'w-40')}>
      <h3 className="sr-only">게임 히스토리</h3>
      <ol className={tm('flex flex-col space-y-1')}>
        {historyCount.map((_, index) => {
          const gameIndex = index + 1;
          const content = `게임 #${gameIndex < 10 ? `0${gameIndex}` : gameIndex}`;
          const isCurrentIndex = gameOrder === index;

          return (
            <li key={index}>
              <HistoryItem
                aria-disabled={isCurrentIndex}
                className={tm({
                  'cursor-not-allowed bg-black/50': isCurrentIndex,
                })}
                onClick={() => {
                  jumpGame?.(index);
                }}
              >
                {index === 0 ? '게임 시작!' : content}
              </HistoryItem>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default History;
