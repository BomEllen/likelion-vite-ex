import AccessDOMPage from '@/pages/access-dom/page';
import AnimationWithMotionPage from '@/pages/animation-with-motion/page';
import AppStateManagementPage from '@/pages/app-state-management/page';
import AuthManagementPage from '@/pages/auth-management/page';
import AutoHeadingsLevelPage from '@/pages/auto-headings-level/page';
import CustomHookPage from '@/pages/custom-hook/page';
import DataFetchingPage from '@/pages/data-fetching/page';
import ErrorBoundaryDemo from '@/pages/error-boundary/page';
import LifecycleDemo from '@/pages/lifecycle/page';
import MemoListPage from '@/pages/memo-list/page';
import MemoryComponentDataPage from '@/pages/memory-component-data/page';
import NotFound from '@/pages/not-found/page';
import OptimizationPage from '@/pages/optimization/page';
import SearchListPage from '@/pages/search-list/page';
import SideEffectDemo from '@/pages/side-effect/page';
import SignInForm from '@/pages/sign-in/page';
import SignUpForm from '@/pages/sign-up/page';
import StateManagement from '@/pages/state-management/page';
import SuspenseUsePage from '@/pages/suspense-use/page';
import TicTacToeWithContext from '@/pages/tic-tac-toe-with-context/page';
import TicTacToe from '@/pages/tic-tac-toe/page';
import UnderstandingContextPage from '@/pages/understanding-context/page';
import UsingContextPage from '@/pages/using-context/page';

// --------------------------------------------------------------------------
// 내비게이션 리스트 데이터

// Routes
export const navList = [
  // Route
  {
    path: 'auth',
    text: '사용자 관리',
    element: <AuthManagementPage />,
  },
  // Route
  {
    path: 'app-state-management',
    text: '앱 상태 관리',
    element: <AppStateManagementPage />,
  },
  // Route
  {
    path: 'react-optimization',
    text: '성능 최적화',
    element: <OptimizationPage />,
  },
  {
    path: 'understanding-context',
    text: '컨텍스트 이해',
    element: <UnderstandingContextPage />,
  },
  {
    path: 'auto-headings-level',
    text: '제목 레벨 자동 구성 (with 컨텍스트)',
    element: <AutoHeadingsLevelPage />,
  },
  {
    path: 't3-with-context',
    text: '틱택토 게임 (with 컨텍스트)',
    element: <TicTacToeWithContext />,
  },
  {
    path: 'context-api',
    text: '컨텍스트',
    element: <UsingContextPage />,
  },
  {
    path: 'streaming',
    text: '스트리밍',
    element: <SuspenseUsePage />,
  },
  {
    path: 'react-custom-hook',
    text: '로직 재사용',
    element: <CustomHookPage />,
  },
  {
    path: 'supabase-memo-list',
    text: '메모 리스트 (with Supabase)',
    element: <MemoListPage />,
  },
  {
    path: 'data-fetching',
    text: '데이터 쿼리/뮤테이션',
    element: <DataFetchingPage />,
  },
  {
    path: 'animation',
    text: '모션 애니메이션',
    element: <AnimationWithMotionPage />,
  },
  {
    path: 'accessing-dom',
    text: 'DOM 접근/조작',
    element: <AccessDOMPage />,
  },
  {
    path: 'memory-component-data',
    text: '데이터 메모리',
    element: <MemoryComponentDataPage />,
  },
  { path: 'search-list', text: '검색 리스트', element: <SearchListPage /> },
  { path: 'side-effect', text: '이펙트 처리', element: <SideEffectDemo /> },
  {
    path: 'error-boundary',
    text: '에러 바운더리',
    element: <ErrorBoundaryDemo />,
  },
  { path: 'lifecycles', text: '라이프 사이클', element: <LifecycleDemo /> },
  { path: 'tic-tac-toe', text: '틱택토', element: <TicTacToe /> },
  {
    path: 'state-management',
    text: '상태 관리 전략',
    element: <StateManagement />,
  },
  { path: 'signup', text: '회원가입', element: <SignUpForm /> },
  { path: 'signin', text: '로그인', element: <SignInForm /> },
];

// --------------------------------------------------------------------------
// 라우터 컴포넌트

// BrowserRouter
function Router({ route }: { route: string }) {
  return navList.find(({ path }) => path === route)?.element ?? <NotFound />;
}

export default Router;
