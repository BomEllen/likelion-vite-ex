function Prose() {
  return (
    <div className="prose">
      <header>
        <h1 lang="en">Custom Vite Template</h1>
      </header>
      <main>
        <p>React 프로젝트 시작을 위한 사용자 정의 템플릿</p>
      </main>
      <footer>
        <small lang="en">
          &copy; {new Date().getFullYear()} EUID. All rights reserved.
        </small>
      </footer>
    </div>
  );
}

export default Prose;
