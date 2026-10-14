import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

export const SteamDeckShowcaseSection: React.FC = () => {
  const travelVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = travelVideoRef.current;
    if (!video) return;
    let visible = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (visible && document.visibilityState === 'visible' && !reducedMotion.matches) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { rootMargin: '100px 0px', threshold: 0.1 });
    observer.observe(video);
    document.addEventListener('visibilitychange', sync);
    reducedMotion.addEventListener('change', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reducedMotion.removeEventListener('change', sync);
      video.pause();
    };
  }, []);

  return (
    <section aria-label="La experiencia HANDHELD" className="relative bg-transparent text-white">
      <div className="relative mx-auto max-w-7xl px-5 pt-14 sm:px-10 sm:pt-24">
        <p className="text-[11px] font-bold uppercase tracking-[.3em] text-[#8CAEFF]">LA EXPERIENCIA HANDHELD</p>
        <h2 className="mt-5 max-w-5xl text-[clamp(2.7rem,8vw,8rem)] font-black uppercase leading-[.86] tracking-[-.07em]">
          EL GAMING<br/><span className="text-[#78A7FF]">EN TUS MANOS.</span>
        </h2>
        <p className="mt-6 max-w-md text-base leading-relaxed text-[#AFBED5]">Tus juegos favoritos. Tu lugar favorito. Sin quedarte atado a un escritorio.</p>
      </div>

      <div className="relative mx-auto mt-9 max-w-[1520px] px-5 sm:mt-12 sm:px-8">
        <figure className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-[#141B22] sm:aspect-[16/9]">
          <img src="/Steam%20deck/lifestyle_camping.jpg" loading="lazy" decoding="async"
            alt="Dos personas jugando con una Steam Deck al aire libre"
            className="absolute inset-0 h-full w-full object-contain object-center" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060A13]/75 via-transparent to-[#05070D]/10" />
          <figcaption className="absolute bottom-5 left-5 right-5 sm:bottom-10 sm:left-10">
            <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#C0D4FF]">LIBERTAD EN CADA PARTIDA</p>
            <p className="mt-2 text-xl font-semibold text-white sm:text-3xl">Tu mundo de juegos va con vos.</p>
          </figcaption>
        </figure>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 py-14 sm:px-10 sm:py-20 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[.25em] text-[#8CAEFF]">GAMING SIN FRONTERAS</p>
          <h3 className="mt-4 text-[clamp(2.8rem,6.8vw,6.2rem)] font-black uppercase leading-[.9] tracking-[-.06em]">
            JUGÁ<br/>DONDE<br/><span className="text-[#78A7FF]">QUIERAS.</span>
          </h3>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#AEBAD0] sm:text-base">En casa, de viaje o en una pausa. La partida sigue con vos.</p>
          <a href="#catalogo" className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-full border border-white/25 px-5 text-sm font-semibold hover:border-[#88B3FF] hover:bg-white/10">
            Explorá las consolas <ArrowUpRight size={17}/>
          </a>
        </div>
        <div className="relative h-[260px] overflow-hidden rounded-[1.5rem] bg-[#101726] sm:h-[420px] lg:h-[510px]">
          <video ref={travelVideoRef} autoPlay muted loop playsInline preload="metadata" disablePictureInPicture
            aria-label="Persona jugando en una consola portátil durante un viaje en avión"
            className="absolute inset-0 h-full w-full object-cover object-center">
            <source src="/Steam%20deck/lifestyle_airplane.webm" type="video/webm" />
          </video>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080D18]/55 via-transparent to-transparent" />
          <span className="absolute bottom-5 left-5 text-[11px] font-bold uppercase tracking-[.18em] text-white/90 sm:bottom-8 sm:left-8">LLEVÁ EL JUEGO CON VOS</span>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 pb-16 sm:px-10 sm:pb-24 lg:grid-cols-[1.12fr_.88fr] lg:gap-16">
        <div className="relative order-2 flex min-h-[270px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#101726] sm:min-h-[410px] lg:order-1 lg:min-h-[500px]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(53,100,210,.20),transparent_75%)]" />
          <img src="/assets/consoles/lenovo-legion-go/legion-go-detached.png" loading="lazy" decoding="async"
            alt="Lenovo Legion Go con controles desmontables"
            className="relative max-h-[250px] w-full object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,.6)] sm:max-h-[380px] lg:max-h-[450px]" />
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-[11px] font-bold uppercase tracking-[.25em] text-[#8CAEFF]">LENOVO LEGION GO Z1 EXTREME</p>
          <h3 className="mt-4 text-[clamp(2.8rem,6vw,5.5rem)] font-black uppercase leading-[.92] tracking-[-.06em]">
            MÁS PANTALLA.<br/><span className="text-[#78A7FF]">MÁS CONTROL.</span>
          </h3>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-[#BFCAE0] sm:text-base">Pantalla de 8,8 pulgadas a 144 Hz, Ryzen Z1 Extreme y controles desmontables para jugar a tu manera.</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-[#DCE7FF]">
            <span className="rounded-full border border-white/20 px-3 py-2">8,8″ QHD+</span>
            <span className="rounded-full border border-white/20 px-3 py-2">144 Hz</span>
            <span className="rounded-full border border-white/20 px-3 py-2">Controles desmontables</span>
          </div>
          <a href="#catalogo" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#3678FF] px-5 text-sm font-semibold text-white hover:bg-[#245DDD]">
            Descubrí Legion Go <ArrowUpRight size={17}/>
          </a>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-16 sm:px-10 sm:pb-24">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#8CAEFF]">MÁS POSIBILIDADES</p>
            <h3 className="mt-2 text-3xl font-black uppercase text-white sm:text-5xl">TAMBIÉN EN TU ESCRITORIO.</h3>
          </div>
          <p className="max-w-md text-sm text-[#AEBAD0]">Conectá tu Steam Deck a un monitor, teclado y mouse mediante accesorios compatibles.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-[1.25rem] bg-[#121722]">
            <img src="/Steam%20deck/itsapc.jpg" loading="lazy" decoding="async" alt="Steam Deck conectada a un escritorio"
              className="aspect-[16/10] w-full object-cover" />
            <figcaption className="px-5 py-3 text-sm text-white/80">Steam Deck: una consola que también puede usarse en tu escritorio.</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-[1.25rem] bg-[#121722]">
            <img src="/Steam%20deck/dock_top_feature_english.jpg" loading="lazy" decoding="async" alt="Configuración de Steam Deck con dock"
              className="aspect-[16/10] w-full object-cover" />
            <figcaption className="px-5 py-3 text-sm text-white/80">Con un dock compatible, ampliá las opciones para jugar.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};
