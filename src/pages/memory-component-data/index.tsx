import CounterFunction from './components/counter.function';
import StopWatch from './components/stop-watch';

function MemoryComponentDataPage() {
  return (
    <section>
      <h2 className="text-2xl text-slate-800 font-medium mb-4">
        컴포넌트 데이터 메모리
      </h2>

      <h3 className="text-lg text-slate-700 font-medium mb-4">
        StopWatch 컴포넌트
      </h3>

      <div className="my-5">
        <StopWatch />
      </div>

      <div className="my-5">
        <StopWatch />
      </div>

      <h3 className="text-lg text-slate-700 font-medium my-4">
        Counter 컴포넌트 (렌더링과 무관한 데이터 메모리)
      </h3>
      <CounterFunction />
    </section>
  );
}

export default MemoryComponentDataPage;
