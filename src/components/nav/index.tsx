import './style.css';
import NavLink from './nav-link';
import { navList } from '@/router';

interface NavProps {
  onChangeRoute: React.Dispatch<React.SetStateAction<string>>;
}

function Nav({ onChangeRoute }: NavProps) {
  return (
    <nav className="nav">
      <h2 className="sr-only">페이지 탐색</h2>
      {navList.map(({ path, text }) => (
        <NavLink key={path} href={path} onChangeRoute={onChangeRoute}>
          {text}
        </NavLink>
      ))}
    </nav>
  );
}

export default Nav;
