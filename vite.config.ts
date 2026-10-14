import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), {
      name: 'handheld-local-stock-api',
      configureServer(server) {
        server.middlewares.use('/api/stock', async (_req, res) => {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Cache-Control', 'no-store, max-age=0');
          try {
            const { fetchLiveSheetRows } = await import('./server/sheetFeed.ts');
            res.statusCode = 200;
            res.end(JSON.stringify({ rows: await fetchLiveSheetRows(), fetchedAt: new Date().toISOString() }));
          } catch (error) {
            console.error('Stock API local:', error);
            res.statusCode = 503;
            res.end(JSON.stringify({ error: 'No se pudo consultar la planilla.' }));
          }
        });
      }
    }],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});