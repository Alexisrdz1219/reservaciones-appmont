import { defineConfig } from 'vite';
import { resolve } from 'path';

// Vite necesita saber explícitamente cuáles archivos .html son "páginas"
// cuando el proyecto tiene más de una. Si agregas una página nueva más
// adelante (por ejemplo reservas.html), agrégala aquí también o Vite
// no la incluirá al hacer `npm run build`.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        register: resolve(import.meta.dirname, 'register.html'),
        recuperar: resolve(import.meta.dirname, 'recuperar.html'),
        dashboard: resolve(import.meta.dirname, 'dashboard.html'),
      },
    },
  },
});
