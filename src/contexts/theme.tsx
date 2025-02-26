import { tm } from '@/utils/tw-merge';
import { MoonSolid, SunSolid } from '@mynaui/icons-react';
import { createContext, use, useState } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  setMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'light',
  setMode: () => {
    console.log('초기 함수');
  },
});

// 컨텍스트 프로바이더(공급자) 래퍼 컴포넌트
export function ThemeProvider(props: React.PropsWithChildren) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const themeContextValue = {
    mode: themeMode,
    setMode: setThemeMode,
  };

  return <ThemeContext.Provider value={themeContextValue} {...props} />;
}

// 테마 상태 업데이트하는 컴포넌트
export function ThemeSetters() {
  const { mode, setMode } = useTheme();

  const isLightMode = mode.includes('light');
  const label = isLightMode ? '다크 모드' : '라이트 모드';

  const handleToggleTheme = () => {
    setMode(isLightMode ? 'dark' : 'light');
  };

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={tm(
        'cursor-pointer justify-center',
        'fixed top-3 right-3',
        'flex p-1 rounded-full',
        'bg-react text-white ',
        'text-xs font-semibold'
      )}
      onClick={handleToggleTheme}
    >
      {isLightMode ? <MoonSolid size={14} /> : <SunSolid size={14} />}
    </button>
  );
}

// 커스텀 훅 작성: 컨텍스트 값을 앱의 어디에서든 가져오기
// 방법: useContext(ThemeContext) 또는 use(ThemeContext)
export const useTheme = () => {
  const themeContextValue = use(ThemeContext);

  if (!themeContextValue) {
    throw new Error('useTheme 훅은 ThemeContext 안에서 사용해야 합니다.');
  }

  return themeContextValue;
};
