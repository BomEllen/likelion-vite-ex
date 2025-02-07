import { tm } from '@/utils/tw-merge';

interface StatusProps {
  message: string;
  onReGame?: () => void;
}

function Status({ message, onReGame }: StatusProps) {
  // [파생된 상태]
  const isComplete = !message.includes('넥스트 플레이어');

  return (
    <div className={tm('flex justify-between w-full px-5')}>
      <p>{message}</p>
      {isComplete && (
        <button
          type="button"
          className={tm(
            'cursor-pointer',
            'px-1.5 py-1 border-1 border-slate-900 rounded-sm',
            'text-xs font-semibold',
            'hover:bg-slate-800/10'
          )}
          onClick={onReGame}
        >
          한 게임 더?!
        </button>
      )}
    </div>
  );
}

export default Status;
