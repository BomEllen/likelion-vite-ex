import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import SearchInput from './components/search-input';
import TiltBox from './components/tilt-box';
import { tm } from '@/utils/tw-merge';

function AccessDOMPage() {
  const [isParse, setIsParse] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    console.log('layout effect');
  });

  useEffect(() => {
    console.log('effect');
  });

  useEffect(() => {
    const searchInput = searchInputRef.current;

    if (searchInput) {
      // searchInput 조작
      // 하위 컴포넌트의 DOM에 접근/조작
      // console.log(searchInput);

      setTimeout(() => {
        if (searchInput) {
          searchInput.focus();
        }
      }, 1000);
    }
  }, []);

  return (
    <section>
      <h2 className="text-2xl text-react font-medium mb-3">
        <abbr
          title="Document Object Model"
          className="cursor-help no-underline"
        >
          {isParse ? 'Document Object Model' : 'DOM'}
        </abbr>{' '}
        접근/조작
      </h2>

      <div className="flex items-center gap-3 mb-2">
        <button
          type="button"
          onClick={() => {
            setIsParse((p) => !p);
          }}
          className={tm(
            'order-1',
            'cursor-pointer',
            'inline-flex justify-center',
            'py-2 px-5 rounded-full',
            'bg-black text-white text-xs font-extrabold',
            'active:scale-97 active:opacity-80'
          )}
        >
          DOM 용어 풀이
        </button>
        <form className="my-2 flex">
          {/* React 18  - React.forwardRef() 😥 */}
          {/* React 19+ - ref 😀 */}
          <SearchInput ref={searchInputRef} />
        </form>
      </div>

      <div className="flex flex-wrap">
        {Array(12)
          .fill(null)
          .map((_, index) => (
            <TiltBox key={index} className="overflow-hidden">
              <img
                className="object-cover scale-280 hover:scale-200 transition-all ease-in-out duration-700"
                src={`/furnitures/furniture-${index + 1}.jpg`}
                alt=""
              />
              {/* {index + 1} */}
            </TiltBox>
          ))}
      </div>
    </section>
  );
}

export default AccessDOMPage;
