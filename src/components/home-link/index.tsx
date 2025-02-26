import { HomeSmile } from '@mynaui/icons-react';
import NavLink from '../global-nav/link';

function HomeLink() {
  return (
    <NavLink to="/" aria-label="홈">
      <HomeSmile size={42} className="text-inherit" />
    </NavLink>
  );
}

export default HomeLink;
