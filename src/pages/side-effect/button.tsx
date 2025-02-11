import { useEffect } from 'react';
import { tm } from '@/utils/tw-merge';

interface ButtonProps {
  message: string;
  onMessage: React.Dispatch<React.SetStateAction<string>>;
}

function Button({ message, onMessage }: ButtonProps) {
  // --------------------------------------------------------------------------

  useEffect(() => {
    console.log('[props 변경 감지]\nButton 컴포넌트 내부\n', { message });
  }, [message]);

  // --------------------------------------------------------------------------
  return (
    <button
      type="button"
      title="🧤 추가"
      className={tm(
        'cursor-pointer select-none',
        'rounded-md py-0.5 px-1.5 border-2 border-react',
        'hover:bg-react/10 '
      )}
      onClick={() => {
        onMessage((message) => message + '🧤');
      }}
    >
      🧤 <span className="sr-only">추가</span>
    </button>
  );
}

export default Button;
