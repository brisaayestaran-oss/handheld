import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const FeatureHighlightsSection: React.FC = () => (
  <section aria-label="Más posibilidades con tu consola" className="relative mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
    <div className="grid items-center gap-5 overflow-hidden rounded-[1.75rem] border border-white/[.09] bg-[#101B2D]/75 p-4 sm:p-7 lg:grid-cols-2 lg:gap-10">
      <div className="relative flex min-h-[230px] items-center justify-center overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(54,92,190,.22),transparent_70%)] sm:min-h-[340px]">
        <img src="/optimized/legion-go-detached.webp" loading="lazy" decoding="async" width="1050" height="680" alt="Lenovo Legion Go con sus controles desmontados" className="max-h-[310px] w-full object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,.5)]"/>
      </div>
      <div className="px-2 py-3 sm:px-5">
        <p className="text-[11px] font-bold uppercase tracking-[.22em] text-[#91B5FF]">LENOVO LEGION GO</p>
        <h2 className="mt-3 font-display text-3xl font-black uppercase leading-tight text-white sm:text-5xl">Más pantalla.<span className="block text-[#82ADFF]">Más control.</span></h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[#B8C9E1]">Pantalla de 8,8 pulgadas, hasta 144 Hz y controles desmontables. Descubrí las distintas formas de jugar con Legion Go.</p>
        <a href="#catalogo" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#3678FF] px-5 text-sm font-bold text-white hover:bg-[#2563EB]">Ver las Legion Go disponibles <ArrowUpRight size={17}/></a>
      </div>
    </div>
    <div className="mt-5 grid items-center gap-5 overflow-hidden rounded-[1.75rem] border border-white/[.08] bg-[#101725]/80 p-4 sm:p-7 lg:grid-cols-2 lg:gap-10">
      <div className="px-2 py-3 sm:px-5">
        <p className="text-[11px] font-bold uppercase tracking-[.22em] text-[#91B5FF]">MÁS POSIBILIDADES</p>
        <h2 className="mt-3 font-display text-3xl font-black uppercase leading-tight text-white sm:text-4xl">También en tu escritorio.</h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[#B8C9E1]">Con un dock o adaptador compatible, podés conectar tu Steam Deck a un monitor, teclado y mouse. Los accesorios se consultan por unidad.</p>
        <a href="#catalogo" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 px-5 text-sm font-bold text-white hover:bg-white/10">Explorar Steam Deck <ArrowUpRight size={17}/></a>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <img src="/optimized/itsapc.webp" loading="lazy" decoding="async" width="1200" height="750" alt="Steam Deck como computadora de escritorio" className="aspect-[4/5] w-full rounded-2xl object-cover"/>
        <img src="/optimized/dock_top_feature_english.webp" loading="lazy" decoding="async" width="1200" height="750" alt="Steam Deck conectada a un dock compatible" className="aspect-[4/5] w-full rounded-2xl object-cover"/>
      </div>
    </div>
  </section>
);
