import clsx from 'clsx/lite';
import { useState } from 'react';
import { getUIView, type UIView } from '@/homework/lib/ui-view';
import './style.css';

function Nav() {
  // 상태
  const [uiView] = useState<UIView>(getUIView);

  // 파생된 상태
  const isSignInView = uiView.includes('signin');
  const isSignUpView = uiView.includes('signup');
  const isStateManagementView = uiView.includes('state-management');

  return (
    <nav className="nav">
      <h2 className="sr-only">페이지 탐색</h2>
      <a
        href="/?view=signin"
        className={clsx(isSignInView && 'active')}
        aria-current={isSignInView ? 'page' : undefined}
      >
        로그인
      </a>
      <a
        href="/?view=signup"
        className={clsx(isSignUpView && 'active')}
        aria-current={isSignUpView ? 'page' : undefined}
      >
        회원가입
      </a>
      <a
        href="/?view=state-management"
        className={clsx(isStateManagementView && 'active')}
        aria-current={isStateManagementView ? 'page' : undefined}
      >
        상태 관리 전략
      </a>
    </nav>
  );
}

export default Nav;
