import './nav.css';

function Nav() {
  return (
    <nav className="nav">
      <h2 className="sr-only">페이지 탐색</h2>
      <a href="/?view=signin">로그인</a>
      <a href="/?view=signup">회원가입</a>
    </nav>
  );
}

export default Nav;
