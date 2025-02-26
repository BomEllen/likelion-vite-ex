import { Outlet } from 'react-router';
import S from './style.module.css';
import HomeLink from '@/components/home-link';

function AuthLayout() {
  return (
    <div className={S.layout}>
      <HomeLink />
      <div className={S.main}>
        <Outlet />
      </div>
      <div className={S.AD}>PLACEHOLDER</div>
    </div>
  );
}

export default AuthLayout;
