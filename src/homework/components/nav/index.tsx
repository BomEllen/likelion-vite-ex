import './style.css';
import NavLink from './nav-link';

const navList = [
  { id: 'item-1', content: '로그인', href: 'signin' },
  { id: 'item-2', content: '회원가입', href: 'signup' },
  { id: 'item-3', content: '상태 관리 전략', href: 'state-management' },
  { id: 'item-4', content: '틱택토', href: 'tic-tac-toe' },
];

function Nav() {
  return (
    <nav className="nav">
      <h2 className="sr-only">페이지 탐색</h2>
      {navList.map((navItem) => (
        <NavLink key={navItem.id} href={navItem.href}>
          {navItem.content}
        </NavLink>
      ))}
    </nav>
  );
}

export default Nav;
