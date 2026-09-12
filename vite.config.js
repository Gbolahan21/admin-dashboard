import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: env.PORT ? Number(env.PORT) : 5173,
      hmr: true,
      open: true,
    },
    plugins: [
      react({
        include: /\.(js|jsx|ts|tsx)$/,
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // add .jsx explicitly
    },
  };
});
