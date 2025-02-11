import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/main.css';
import App from '@/app';

const root = document.getElementById('root');

if (root) {
  const reactDOMRoot = createRoot(root, {
    identifierPrefix: 'euid-',
  });

  reactDOMRoot.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
