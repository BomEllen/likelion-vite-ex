import StateManagement from '@/pages/state-management';
import ErrorBoundaryDemo from '@/pages/error-boundary';
import SideEffectDemo from '@/pages/side-effect';
import SearchListPage from '@/pages/search-list';
import LifecycleDemo from '@/pages/lifecycle';
import TicTacToe from '@/pages/tic-tac-toe';
import SignInForm from '@/pages/sign-in';
import SignUpForm from '@/pages/sign-up';
import NotFound from '@/pages/not-found';

// --------------------------------------------------------------------------
// 내비게이션 리스트 데이터

export const navList = [
  { path: 'search-list', text: '검색 리스트', element: <SearchListPage /> },
  { path: 'side-effect', text: '이펙트 처리', element: <SideEffectDemo /> },
  { path: 'error-boundary', text: '에러 바운더리', element: <ErrorBoundaryDemo /> },
  { path: 'lifecycles', text: '라이프 사이클', element: <LifecycleDemo /> },
  { path: 'tic-tac-toe', text: '틱택토', element: <TicTacToe /> },
  { path: 'state-management', text: '상태 관리 전략', element: <StateManagement /> },
  { path: 'signup', text: '회원가입', element: <SignUpForm /> },
  { path: 'signin', text: '로그인', element: <SignInForm /> },
];

// --------------------------------------------------------------------------
// 라우터 컴포넌트

function Router({ route }: { route: string }) {
  return navList.find(({ path }) => path === route)?.element ?? <NotFound />;
}

export default Router;
