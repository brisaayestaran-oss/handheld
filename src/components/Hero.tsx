import React from 'react';
import { ArrowRight, ChevronDown, MessageCircle } from 'lucide-react';
import { buildGeneralWhatsAppLink } from '../config/brand';

export interface HeroProps { onExplore: () => void; }

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = React.useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  React.useEffect(() => {
    const syncSize = () => setShowVideo(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    window.addEventListener('resize', syncSize);
    return () => window.removeEventListener('resize', syncSize);
  }, []);
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let inViewport = false;
    const syncPlayback = () => {
      if (inViewport && document.visibilityState === 'visible') {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.1 });
    observer.observe(video);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
    };
  }, [showVideo]);
  return (
  <section id="inicio" className="relative isolate overflow-hidden bg-transparent text-white">
    {/* Texto y acciones ocupan su propia zona. Nunca se superponen con la consola. */}
    <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-5 pt-28 text-center sm:pt-32 lg:pt-36">
      <p className="mb-4 font-mono-tech text-[10px] font-semibold uppercase tracking-[.24em] text-[#B4C9EF] sm:text-xs">
        <span className="inline-flex items-center gap-3 rounded-full border border-[#8AC7FF]/30 bg-[#74ACDF]/[.08] px-4 py-2 text-xs font-bold tracking-[.12em] text-[#D3E9FF]">
          <span aria-label="Bandera argentina" className="inline-flex h-5 w-8 items-center justify-center overflow-hidden rounded-sm bg-[linear-gradient(to_bottom,#74ACDF_0%,#74ACDF_33%,#FFFFFF_33%,#FFFFFF_66%,#74ACDF_66%)]"><span className="h-1.5 w-1.5 rounded-full bg-[#E3B945]"/></span>
          EMPRENDIMIENTO ARGENTINO
        </span>
      </p>
      <h1 className="w-full max-w-5xl font-display text-[clamp(1.4rem,6vw,5.9rem)] font-black uppercase leading-[1.04] tracking-tight text-white sm:leading-[.98]">
        <span className="block">ENCONTRÁ TU</span>
        <span className="block">PRÓXIMA CONSOLA</span>
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#E1E7F6] sm:text-lg">
        Descubrí la consola que va con vos. Tu próxima aventura empieza acá.
      </p>
      <div className="mx-auto mt-8 flex w-full max-w-[650px] flex-col justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row">
        <button type="button" onClick={onExplore}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#3678FF] px-6 py-3.5 text-xs font-bold uppercase text-white transition-colors hover:bg-[#2563EB] sm:text-sm">
          EXPLORAR CONSOLAS <ArrowRight size={16} />
        </button>
        <a href={buildGeneralWhatsAppLink('Consulta desde portada')} target="_blank" rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-[#0B1020]/90 px-6 py-3.5 text-xs font-bold uppercase text-white transition-colors hover:border-[#7AA6FF] sm:text-sm">
          <MessageCircle size={16} className="text-[#5691FF]" /> CONSULTAR POR WHATSAPP
        </a>
      </div>
    </div>

    {/* Video de portada: movimiento sutil con imagen de respaldo. */}
    {showVideo && <div className="relative mx-auto mt-5 w-full max-w-[1640px] px-0 sm:mt-0 sm:-mt-2 lg:-mt-5" aria-label="Presentación de consola Steam Deck">
      <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" onError={() => setShowVideo(false)}
        aria-label="Video de presentación Steam Deck"
        className="block aspect-video w-full object-contain"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 11%, black 89%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 13%, black 87%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 11%, black 89%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 13%, black 87%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}>
        <source src="/Steam%20deck/overview_oled%20(1).webm" type="video/webm" />
      </video>
    </div>}

    <div className={`mx-auto mt-7 w-full max-w-md justify-center px-6 ${showVideo ? "hidden" : "flex"}`}><img src="/Steam%20deck/steam_deck_oled/press_front_home.webp" alt="Consola Steam Deck" className="max-h-52 w-full object-contain" decoding="async" /></div>
    <div className="relative z-10 flex justify-center px-5 pb-8 pt-5 sm:pb-14">
      <button type="button" onClick={onExplore}
        className="inline-flex items-center gap-3 rounded-full border border-[#A1B5ED]/35 bg-[#070C18]/85 px-5 py-3 text-[11px] font-bold uppercase tracking-[.13em] text-white transition-colors hover:border-[#91B2FF]">
        DESLIZÁ PARA EXPLORAR <ChevronDown size={16} />
      </button>
    </div>
  </section>
  );
};
