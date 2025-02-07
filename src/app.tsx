import { ErrorBoundary } from 'react-error-boundary';
import Playground from './playground';

function App() {
  return (
    <ErrorBoundary fallback={<p>Oops... 오류 발생! 😥</p>}>
      <Playground />
    </ErrorBoundary>
  );
}

export default App;
