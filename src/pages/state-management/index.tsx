import AccordionList from './components/accordion-list';

function StateManagement() {
  return (
    <section className="transform">
      <h2 className="sr-only">상태 관리</h2>
      <AccordionList title="넷플릭스 서비스" />
      <DoNotRenderUnnecessary />
    </section>
  );
}

export default StateManagement;

function DoNotRenderUnnecessary() {
  return (
    <article>
      <h3>나는 상태 공유를 원하지 않아요~</h3>
      <p>상태 공유해주지 마세요. 저는 다시 렌더링 되고 싶지 않답니다. 🥲</p>
    </article>
  );
}
