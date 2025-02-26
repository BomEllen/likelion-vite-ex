import { useTheme } from '@/contexts/theme';
import GrandChild from './grand-child';
import { tm } from '@/utils/tw-merge';

function Child() {
  const { mode } = useTheme();
  const isDarkMode = mode.includes('dark');

  return (
    <div
      className={tm('flex-1 p-5 border-4 rounded-full flex justify-center', {
        'bg-black border-white': isDarkMode,
      })}
    >
      <GrandChild />
    </div>
  );
}

export default Child;
