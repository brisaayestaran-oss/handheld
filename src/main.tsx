import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Al recargar o restaurar la pestaña, mostrar siempre el comienzo de la web.
// Los enlaces internos siguen funcionando normalmente durante la navegación.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
const goToStart = () => {
  // Respetar los enlaces directos al catálogo y a otras secciones.
  if (window.location.hash && window.location.hash !== '#inicio') return;
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
};
window.addEventListener('pageshow', goToStart);
window.addEventListener('load', goToStart);
goToStart();

createRoot(document.getElementById('root')!).render(<><App /><Analytics /><SpeedInsights /></>);
