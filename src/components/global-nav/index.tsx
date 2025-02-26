import NavLink from './link';
import HomeLink from '../home-link';

function GlobalNav() {
  return (
    <nav>
      <h2 className="sr-only">페이지 탐색</h2>
      <ul className="p-4 flex gap-5 bg-black items-center">
        <li className="shrink-0">
          <HomeLink />
        </li>
        <li className="shrink-0">
          <NavLink to="/playground">플레이그라운드</NavLink>
        </li>
        <li className="shrink-0">
          <NavLink to="/memo-list">메모리스트</NavLink>
        </li>
        <li className="shrink-0">
          <NavLink to="/pokemons">포켓몬스</NavLink>
        </li>
        <li className="shrink-0">
          <NavLink className="p-2 bg-black text-white" to="/dashboard">
            대시보드
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default GlobalNav;
