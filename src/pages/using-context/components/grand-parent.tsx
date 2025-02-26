import { useTheme } from '@/contexts/theme';
import Parent from './parent';
import { tm } from '@/utils/tw-merge';

function GrandParent() {
  const { mode } = useTheme();
  const isDarkMode = mode.includes('dark');

  return (
    <div
      className={tm('flex-1 p-5 border-4 rounded-full flex justify-center', {
        'bg-black border-white': isDarkMode,
      })}
    >
      <Parent />
    </div>
  );
}

export default GrandParent;
