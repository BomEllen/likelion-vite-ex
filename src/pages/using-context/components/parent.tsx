import { tm } from '@/utils/tw-merge';
import Child from './child';
import { useTheme } from '@/contexts/theme';

function Parent() {
  const { mode } = useTheme();
  const isDarkMode = mode.includes('dark');

  return (
    <div
      className={tm('flex-1 p-5 border-4 rounded-full flex justify-center', {
        'bg-black border-white': isDarkMode,
      })}
    >
      <Child />
    </div>
  );
}

export default Parent;
