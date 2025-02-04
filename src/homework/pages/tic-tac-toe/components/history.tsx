import { tm } from "@/utils/tw-merge";
import HistoryItem from "./history-item";

function History() {
  return (
    <section className={tm(
      'flex flex-col space-y-2 items-center',
      'w-40'
    )}>
      <h3 className="sr-only">게임 히스토리</h3>
      <ol className={tm(
        'flex flex-col space-y-1'
      )}>
        <HistoryItem />
      </ol>
    </section>
  );
}

export default History;
