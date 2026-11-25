import React from 'react';

const consoles = [
  { name: 'Steam Deck LCD negra', src: '/Steam%20deck/steam_deck_oled/press_front_home.png?v=20261124-selected', detail: 'Pantalla LCD · Biblioteca Steam', size: 'scale-[1.07]', color: '48,108,216' },
  { name: 'Lenovo Legion Go', src: '/optimized/hero-legion-go.webp', detail: 'Pantalla 8,8" · Ryzen Z1 Extreme', size: 'scale-[.94]', color: '112,72,218' },
  { name: 'Steam Deck OLED blanca', src: '/optimized/hero-steam-deck-white.webp', detail: 'Edición limitada · Pantalla OLED', size: 'scale-[1.10] sm:scale-[1.27]', color: '80,165,225' },
] as const;
const wrap = (n: number) => (n + consoles.length) % consoles.length;

export function HeroConsoleCarousel() {
  const [selected, setSelected] = React.useState(1);
  const [reduced, setReduced] = React.useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [mobile, setMobile] = React.useState(() => window.matchMedia('(max-width: 639px)').matches);
  const [ready, setReady] = React.useState(false);
  const drag = React.useRef<{ x: number; y: number; active: boolean } | null>(null);
  const [showHint, setShowHint] = React.useState(() => {
    try { return sessionStorage.getItem('handheld-carousel-hint-v1') !== 'seen'; } catch { return false; }
  });
  const ignoreClick = React.useRef(false);
  const section = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(true);
  const [isHidden, setIsHidden] = React.useState(document.hidden);
  const hideHint = React.useCallback(() => {
    setShowHint(false);
    try { sessionStorage.setItem('handheld-carousel-hint-v1', 'seen'); } catch { /* almacenamiento opcional */ }
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    Promise.all([...consoles.map(c => { const i = new Image(); i.src = c.src; return i.decode().catch(() => undefined); }), document.fonts.ready])
      .then(() => { if (!cancelled) setReady(true); });
    return () => { cancelled = true; };
  }, []);
  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);
  React.useEffect(() => {
    const el = section.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .04 });
    observer.observe(el);
    const onVisibility = () => setIsHidden(document.hidden);
    const onPageHide = () => setIsHidden(true);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('pageshow', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('pageshow', onVisibility);
    };
  }, []);
  React.useEffect(() => {
    if (!showHint) return;
    const timer = window.setTimeout(hideHint, 11000);
    return () => window.clearTimeout(timer);
  }, [showHint, hideHint]);
  React.useEffect(() => {
    const query = window.matchMedia('(max-width: 639px)');
    const onChange = () => setMobile(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);
  const move = (step: number) => { hideHint(); setSelected(v => wrap(v + step)); };
  const key = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
  };
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.isPrimary) return;
    drag.current = { x: e.clientX, y: e.clientY, active: false };
    ignoreClick.current = false;
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (!start.active && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      start.active = true;
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    }
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    drag.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    if (start.active && Math.abs(dx) > 38) {
      hideHint();
      ignoreClick.current = true;
      move(dx < 0 ? 1 : -1);
    }
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };
  const animationOn = ready && !reduced && inView && !isHidden;

  return (
    <div ref={section} className="relative isolate mx-auto mt-0 hidden w-full max-w-[1500px] overflow-hidden px-0 pt-1 sm:mt-7 sm:block sm:px-4" aria-label="Presentación de consolas HANDHELD">



      <div className="relative mx-auto hidden h-[375px] w-full max-w-[1200px] touch-pan-y select-none sm:block lg:h-[455px]" tabIndex={mobile ? -1 : 0} onKeyDown={mobile ? undefined : key}
        onPointerDown={mobile ? undefined : onPointerDown} onPointerMove={mobile ? undefined : onPointerMove} onPointerUp={mobile ? undefined : onPointerUp} onPointerCancel={() => { drag.current = null; }}
        role="group" aria-roledescription="carrusel" aria-label="Seleccioná una consola tocando las laterales o deslizando">
        {consoles.map((item, index) => {
          const diff = wrap(index - selected);
          const side = diff === 0 ? 0 : diff === 1 ? 1 : -1;
          const active = side === 0;
          return (
            <button key={item.name} type="button" onClick={() => { if (ignoreClick.current) { ignoreClick.current = false; return; } hideHint(); setSelected(index); }}
              aria-label={item.name + (active ? ', seleccionada' : ', mostrar al centro')}
              aria-pressed={active} aria-hidden={mobile && !active} tabIndex={active || mobile ? -1 : 0}
              className={'absolute h-[82%] origin-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7DA7FF] sm:h-[87%] ' + (active ? 'z-20' : 'z-10')}
              style={{
                left: side === 0 ? '50%' : side === -1 ? '27%' : '73%',
                top: side === 0 ? '49%' : '57%',
                width: mobile ? (index === 2 ? 'min(90vw, 850px)' : 'min(84vw, 850px)') : 'min(90vw, 850px)',
                transform: `translate(-50%, -50%) perspective(1400px) rotateY(${side * -11}deg) rotateZ(${side * -4}deg) scale(${active ? 1.02 : .59})`,
                opacity: mobile ? (active ? 1 : 0) : active ? 1 : .84,
                pointerEvents: mobile || active ? 'none' : 'auto',
                filter: active ? 'drop-shadow(0 28px 28px rgba(0,0,0,.60))' : 'brightness(.86) saturate(.94) drop-shadow(0 20px 22px rgba(0,0,0,.38))',
                transition: reduced ? 'none' : 'left 1050ms cubic-bezier(.2,.78,.2,1), top 1050ms cubic-bezier(.2,.78,.2,1), transform 1050ms cubic-bezier(.2,.78,.2,1), opacity 850ms ease, filter 1050ms ease'
              }}>
              <span className="pointer-events-none block h-full w-full" style={{ animation: animationOn ? `handheldCarouselBob 7s ease-in-out ${index * -.65}s infinite` : 'none' }}>
                <img src={item.src} alt="" draggable={false} className={`h-full w-full object-contain ${item.size}`} loading="eager" decoding="async" />
              </span>
            </button>
          );
        })}
      </div>

      {showHint && <div aria-hidden="true" className="pointer-events-none relative z-30 mx-auto mt-1 hidden w-max max-w-[95%] items-center gap-3 rounded-full px-4 py-1.5 text-center text-[10px] font-medium tracking-wide text-[#B1C4E7] sm:flex"><span aria-hidden="true" className="text-[#779DDE]">‹</span>Tocá una consola para cambiar<span aria-hidden="true" className="text-[#779DDE]">›</span></div>}
      <style>{`@keyframes handheldCarouselBob {0%,100% {transform:translateY(0)}50%{transform:translateY(-12px)}}`}</style>
    </div>
  );
}
