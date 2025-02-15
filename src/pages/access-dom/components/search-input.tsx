import { forwardRef } from 'react';
import { tm } from '@/utils/tw-merge';
import { Search } from '@mynaui/icons-react';

const SearchInput = forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  function SearchInput(props, ref) {
    return (
      <>
        <div>
          <label htmlFor="like-a-book" className="sr-only">
            선호 가구
          </label>
          <input
            ref={ref}
            id="like-a-book"
            type="search"
            placeholder="좋아하는 가구는?"
            className="bg-react text-white px-3 py-2"
            {...props}
          />
        </div>
        <button
          type="submit"
          aria-label="검색"
          className={tm(
            'cursor-pointer',
            'py-2 size-10 grid place-items-center',
            'bg-cyan-700 text-white '
          )}
        >
          <Search />
        </button>
      </>
    );
  }
);

export default SearchInput;
