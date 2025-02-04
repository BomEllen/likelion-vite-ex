import { tm } from '@/utils/tw-merge';

function HistoryItem() {
  return (
    <li>
      <button
        type="button"
        className={tm(
          'cursor-pointer',
          'flex place-items-center px-2.5 py-1.5',
          'rounded-md',
          'bg-slate-800 text-white',
          'text-xs',
          'hover:bg-black'
        )}
      >
        게임 시작!
      </button>
    </li>
  );
}

export default HistoryItem;
