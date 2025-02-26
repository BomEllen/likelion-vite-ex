import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router';
import PrintError from './components/error';
import Pokemon from './components/pokemon';
import { ThemeProvider, ThemeSetters } from './contexts/theme';
import AuthLayout from './layouts/auth/layout';
import CommonLayout from './layouts/common/layout';
import DashboardPage from './pages/dashboard/page';
import HomePage from './pages/home/page';
import MemoListPage from './pages/memo-list/page';
import PlaygroundPage from './pages/playground/page';
import SignUpPage from './pages/sign-up/page';
import SuspenseUsePage from './pages/suspense-use/page';
import NotFound from './pages/not-found/page';
import SupaSignUpPage from './pages/supa-signup/page';

function App() {
  return (
    <ErrorBoundary FallbackComponent={PrintError}>
      <ThemeProvider>
        <ThemeSetters />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route element={<CommonLayout />}>
              <Route index Component={HomePage} />
              <Route path="/playground" element={<PlaygroundPage />} />
              <Route path="/memo-list" element={<MemoListPage />} />
              <Route path="/pokemons" element={<SuspenseUsePage />} />
              <Route path="/pokemons/:lang?/:name" element={<Pokemon />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* 경로(route segment) 추가 */}
            <Route path="/dashboard">
              {/* 레이아웃 : 경로 제공 옵션 `/dashboard/auth` */}
              <Route element={<AuthLayout />}>
                {/* 각 레이아웃, 중첩된 페이지 중 인덱스 페이지 */}
                {/* Component 속성에는 컴포넌트(함수) 참조 */}
                {/* <Route index Component={DashboardPage} /> */}
                {/* element 속성에는 엘리먼트 생성해서 반환 */}
                <Route index element={<DashboardPage />} />
                {/* 중첩된 라우트(Nested Routes) */}
                {/* 페이지는 배출구(Outlet)에서 렌더링 */}
                <Route path="signin" element={<SupaSignUpPage />} />
                <Route path="signup" element={<SignUpPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
