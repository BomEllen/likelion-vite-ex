import { tm } from '@/utils/tw-merge';
import { useId } from 'react';

interface SearchFormProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

function SearchForm({ setSearch }: SearchFormProps) {
  const searchId = useId();

  const handleSearch = (formData: FormData) => {
    const search = (formData.get('search') as string).trim();
    if (search.length === 0) {
      return alert('검색어를 입력해주세요.');
    }

    setSearch(search);
  };

  const handleReset = () => {
    setSearch('');
  };

  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-semibold text-xl">메모 검색</h2>
      <form
        action={handleSearch}
        onReset={handleReset}
        className={tm('flex gap-1 items-center')}
      >
        <label htmlFor={searchId} className="sr-only">
          검색
        </label>
        <input
          type="search"
          name="search"
          id={searchId}
          placeholder="제목 또는 내용 검색"
          className={tm(
            'bg-react text-sky-400 placeholder:text-sky-600',
            'px-2.5 py-1 rounded-sm'
          )}
        />
        <div role="group" className={tm('flex')}>
          <button
            className={tm(
              'cursor-pointer px-2 py-1 bg-react text-white',
              'opacity-85 hover:opacity-100',
              'rounded-l-sm'
            )}
            type="submit"
          >
            검색
          </button>
          <button
            className={tm(
              'cursor-pointer px-2 py-1 bg-black/20 text-black',
              'opacity-85 hover:opacity-100',
              'rounded-r-sm'
            )}
            type="reset"
          >
            초기화
          </button>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
