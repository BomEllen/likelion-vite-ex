import { tm } from '@/utils/tw-merge';
import { useContext } from 'react';
import { TicTacToeContext } from '../contexts/tic-tac-toe';

function Status() {
  const { statusMessage, restartGame } = useContext(TicTacToeContext);

  // [파생된 상태]
  const isComplete = !statusMessage.includes('넥스트 플레이어');

  return (
    <div className={tm('flex justify-between w-full px-5')}>
      <p>{statusMessage}</p>
      {isComplete && (
        <button
          type="button"
          className={tm(
            'cursor-pointer',
            'px-1.5 py-1 border-1 border-slate-900 rounded-sm',
            'text-xs font-semibold',
            'hover:bg-slate-800/10'
          )}
          onClick={restartGame}
        >
          한 게임 더?!
        </button>
      )}
    </div>
  );
}

export default Status;
