import {createRoot} from 'react-dom/client';
import {useEffect, useState} from 'react';
import App from './App.tsx';
import LogoLoaderDemo from './components/LogoLoaderDemo.tsx';
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

function HandheldSite() {
  const home = window.location.pathname === '/' || window.location.pathname === '';
  const admin = window.location.hash === '#admin';
  const [showIntro, setShowIntro] = useState(home && !admin && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    if (!showIntro) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [showIntro]);

  return (
    <>
      <div aria-hidden={showIntro} inert={showIntro} style={showIntro ? { visibility: 'hidden' } : undefined}>
        <App />
      </div>
      {showIntro && (
        <div className="fixed inset-0 z-[9999] bg-[#050A15]">
          <LogoLoaderDemo onComplete={() => setShowIntro(false)} />
        </div>
      )}
      <Analytics />
      <SpeedInsights />
    </>
  );
}

const isLogoDemo = window.location.pathname.replace(/\/$/, '') === '/demo/logo-loader';
createRoot(document.getElementById('root')!).render(isLogoDemo ? <LogoLoaderDemo /> : <HandheldSite />);
