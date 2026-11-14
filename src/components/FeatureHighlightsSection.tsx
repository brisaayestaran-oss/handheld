import React from 'react';
import { ArrowUpRight } from 'lucide-react';

/** Bloques editoriales: imagen protagonista y texto sin tarjetas repetidas. */
export const FeatureHighlightsSection: React.FC = () => (
  <section aria-label="Más posibilidades con tu consola" className="relative isolate overflow-hidden">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_25%,rgba(40,70,145,.13),transparent_55%)]" aria-hidden="true" />
    <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
      <div className="grid items-center gap-7 border-t border-white/[.07] py-14 sm:py-20 lg:grid-cols-[1.1fr_.9fr] lg:gap-16 lg:py-24">
        <div className="relative min-w-0 overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-[15%] rounded-full bg-[#3569CC]/15 blur-[90px]"/>
          <img src="/optimized/legion-go-detached.webp" width="1050" height="680" loading="lazy" decoding="async"
            alt="Lenovo Legion Go con controles desmontables"
            className="relative mx-auto aspect-[16/10] max-h-[520px] w-full object-contain drop-shadow-[0_28px_50px_rgba(0,0,0,.5)]"/>
        </div>
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#88AEFF]">LENOVO LEGION GO</p>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,5.6rem)] font-black uppercase leading-[.99] tracking-tight text-white">Más pantalla.<span className="block text-[#86AEFF]">Más control.</span></h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[#B9C9E0]">Pantalla de 8,8 pulgadas, hasta 144 Hz y controles desmontables para jugar a tu manera.</p>
          <a href="#catalogo" className="mt-7 inline-flex min-h-12 items-center gap-2 border-b border-[#83ABFF] pb-1 text-sm font-bold text-white transition-colors hover:text-[#8EBCFF]">Explorar Legion Go <ArrowUpRight size={18}/></a>
        </div>
      </div>

      <div className="grid items-center gap-8 border-t border-white/[.07] py-14 sm:py-20 lg:grid-cols-[.85fr_1.15fr] lg:gap-16 lg:py-24">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#88AEFF]">STEAM DECK · MÁS POSIBILIDADES</p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,4.5vw,5rem)] font-black uppercase leading-[1] tracking-tight text-white">También en tu <span className="text-[#86AEFF]">escritorio.</span></h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#B9C9E0]">Con un dock o adaptador compatible, conectá un monitor, teclado y mouse. Consultá qué accesorios incluye cada unidad.</p>
          <a href="#catalogo" className="mt-7 inline-flex min-h-12 items-center gap-2 border-b border-[#83ABFF] pb-1 text-sm font-bold text-white transition-colors hover:text-[#8EBCFF]">Descubrir Steam Deck <ArrowUpRight size={18}/></a>
        </div>
        <div className="relative grid min-w-0 grid-cols-[1.2fr_.8fr] items-center gap-3 sm:gap-5">
          <img src="/optimized/itsapc.webp" width="1200" height="750" loading="lazy" decoding="async" alt="Steam Deck conectada a un monitor con teclado y mouse" className="aspect-[4/3] w-full rounded-2xl object-contain bg-[#111725]"/>
          <img src="/optimized/dock_top_feature_english.webp" width="1200" height="750" loading="lazy" decoding="async" alt="Estación dock compatible con Steam Deck" className="aspect-[3/4] w-full rounded-2xl object-contain bg-[#111725]"/>
        </div>
      </div>
    </div>
  </section>
);
