import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const viteConfig = defineConfig((env) => {
  const isDevMode = env.mode.includes('development');

  return {
    base: isDevMode ? '/' : '/likelion-react-12/',
    plugins: [
      react({
        jsxRuntime: 'automatic',
        babel: {
          plugins: [
            [
              '@locator/babel-jsx/dist',
              {
                env: 'development',
              },
            ],
          ],
        },
      }),
      tailwindcss(),
    ],
    server: {
      host: 'localhost',
      port: 3000,
    },
    preview: {
      host: 'localhost',
      port: 8080,
    },
    css: {
      devSourcemap: true,
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: isDevMode
          ? '_[local]_[hash:base64:3]'
          : '_[hash:base64:6]',
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});

export default viteConfig;
