import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

/** Una escena editorial completa, sin otra tarjeta de texto + imagen. */
export const SteamDeckShowcaseSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let sourceLoaded = false;
    let visible = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
      if (!visible || document.hidden || reducedMotion.matches || saveData) { video.pause(); return; }
      if (!sourceLoaded) {
        sourceLoaded = true;
        const source = document.createElement('source');
        source.src = '/Steam%20deck/lifestyle_airplane.webm';
        source.type = 'video/webm';
        video.append(source);
        video.load();
      }
      void video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .12, rootMargin: '80px 0px' });
    observer.observe(video);
    document.addEventListener('visibilitychange', sync);
    reducedMotion.addEventListener('change', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); reducedMotion.removeEventListener('change', sync); video.pause(); };
  }, []);
  return (
    <section aria-label="Experiencia de juego portátil" className="relative px-0 py-4 sm:px-8 sm:py-14">
      <div className="relative mx-auto min-h-[390px] max-w-[1440px] overflow-hidden bg-[#0B1222] sm:min-h-[540px] lg:min-h-[630px]">
        <video ref={videoRef} muted loop playsInline preload="none" disablePictureInPicture
          onPlaying={() => setVideoPlaying(true)} onError={() => setVideoPlaying(false)}
          aria-label="Video de gaming portátil durante un viaje"
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ${videoPlaying ? 'opacity-100' : 'opacity-0'}`} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050A15]/95 via-[#050A15]/45 to-[#050A15]/5 lg:bg-gradient-to-r lg:from-[#050A15]/95 lg:via-[#050A15]/65 lg:to-[#050A15]/10" />
        <div className="relative z-10 flex min-h-[390px] flex-col justify-end px-6 pb-8 pt-14 sm:min-h-[540px] sm:px-12 sm:pb-16 lg:min-h-[630px] lg:justify-center lg:px-20">
          <p className="text-xs font-bold uppercase tracking-[.25em] text-[#A6C5FF]">LA EXPERIENCIA HANDHELD</p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(3rem,6vw,6.6rem)] font-black uppercase leading-[.98] tracking-tight text-white">Jugá donde <span className="text-[#95B9FF]">quieras.</span></h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#E2EAF7]">Tus juegos favoritos, tu lugar favorito. Una consola que te acompaña a donde vayas.</p>
          <a href="#catalogo" className="mt-7 inline-flex min-h-12 w-fit items-center gap-2 border-b border-[#B4CFFF] pb-1 text-sm font-bold text-white hover:text-[#A5C6FF]">Encontrá tu consola <ArrowUpRight size={18}/></a>
        </div>
      </div>
    </section>
  );
};
