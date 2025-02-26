import { useContext } from 'react';
import { GreetingContext } from '../page';

function AnotherChild() {
  const { message, setMessage } = useContext(GreetingContext);

  console.log(message, setMessage);

  return (
    <div className="flex-1 flex flex-col gap-3 p-5 border-4 rounded-full items-center justify-center text-center">
      {message}
      <button
        type="button"
        className="bg-react text-white p-2 text-sm rounded-full w-50"
        onClick={() => {
          setMessage('반갑습니다. Mr. 페이지! 저는 AnotherChild에요!');
        }}
      >
        Page 컴포넌트에게 인사하기
      </button>
    </div>
  );
}

export default AnotherChild;
