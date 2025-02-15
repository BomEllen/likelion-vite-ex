import { tm } from '@/utils/tw-merge';
import { type ColorMoodItem } from '../types';
import Card from './card';

interface SearchedListProps {
  query: string;
  list: ColorMoodItem[];
  onUpdate: (item: ColorMoodItem, isFavorited: boolean) => void;
}

function SearchedList({ list, query, onUpdate }: SearchedListProps) {
  const words = query
    .split(' ')
    .filter(Boolean)
    .map((word) => word.toLowerCase().trim());

  const filteredList = list.filter((item) => {
    return words.every((word) => {
      if (
        item.title.includes(word) ||
        item.description.includes(word) ||
        item.tags.includes(word)
      ) {
        return true;
      } else {
        return false;
      }
    });
  });

  // console.log(filteredList);

  const filteredCount = filteredList.length;
  const isEmpty = filteredCount === 0;

  return (
    <section className="relative w-full my-8">
      <h3 className="sr-only">검색된 리스트</h3>
      {isEmpty && (
        <p className="text-xl text-slate-700 font-semibold text-center">
          &quot;{query}&quot; 검색된 정보가 없습니다. 🥲
        </p>
      )}
      {!isEmpty && (
        <>
          <p className="absolute left-1/2 -translate-x-1/2 -top-11 text-sky-900 font-semibold">
            {filteredCount}개 검색됨
          </p>
          <ul className={tm('flex flex-col gap-12')}>
            {filteredList.map((item) => (
              <Card key={item.id} item={item} onUpdate={onUpdate} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default SearchedList;
