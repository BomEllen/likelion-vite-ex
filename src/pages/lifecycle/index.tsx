import { tm } from '@/utils/tw-merge';
import Counter from './components/counter';

function LifecycleDemo() {
  return (
    <section className={tm('flex flex-col gap-2 mt-6')}>
      <h2 className={tm('text-2xl')}>라이프사이클 (Lifecycles)</h2>
      <p className={tm('text-sm')}>
        클래스 컴포넌트의 라이프 사이클 메서드에 대해 알아봅니다.
      </p>
      <Counter />
    </section>
  );
}

export default LifecycleDemo;
