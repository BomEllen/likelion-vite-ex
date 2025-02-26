import { tm } from '@/utils/tw-merge';
import type { MemoItem as MemoItemType } from '../lib/supabase-client';
import MemoItem from './memo-item';

interface SearchedListProps {
  items: MemoItemType[];
  search: string;
}

function SearchedList({ items, search }: SearchedListProps) {
  const searchedItems = items.filter((item) => {
    const query = search.toLowerCase();

    return (
      item.title.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query)
    );
  });

  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-semibold text-xl">메모 리스트</h2>
      <ul className={tm('grid xs:grid-cols-2 sm:grid-cols-3 gap-2')}>
        {searchedItems.map((item) => (
          <MemoItem key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}

export default SearchedList;
