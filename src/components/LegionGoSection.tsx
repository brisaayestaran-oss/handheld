import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '../types/catalog';

interface Props {
  onSelectProduct: (product: Product) => void;
  legionGoProduct: Product;
}

export const LegionGoSection: React.FC<Props> = ({ onSelectProduct, legionGoProduct }) => (
  <section id="legion-go" className="relative isolate overflow-hidden bg-[#050507] py-20 sm:py-28 lg:py-36 scroll-mt-20">
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute top-1/2 -right-40 -translate-y-1/2 h-[540px] w-[540px] rounded-full blur-[150px]" style={{ backgroundColor: '#8073FF12' }} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"/>
    </div>
    <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
      <div className="mb-9 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
        <span className="font-mono-tech text-[11px] font-semibold tracking-[.23em] text-white/60">02 / LENOVO LEGION GO</span>
        <span className="hidden sm:inline text-[11px] tracking-[.18em] text-white/35 uppercase">HANDHELD / SELECCIÓN PREMIUM</span>
      </div>
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_.8fr] lg:gap-14">
        <div className="relative flex min-h-[310px] sm:min-h-[440px] lg:min-h-[540px] items-center justify-center group">
          <div className="absolute inset-x-[12%] bottom-[19%] h-[34%] rounded-full blur-[75px] opacity-40" style={{backgroundColor:'#8073FF'}} aria-hidden="true" />
          <img src="/assets/consoles/lenovo-legion-go/legion-go-card.png" alt="Lenovo Legion Go" loading="lazy" decoding="async"
            className="relative z-10 h-auto max-h-[310px] sm:max-h-[440px] lg:max-h-[520px] w-full object-contain drop-shadow-[0_40px_42px_rgba(0,0,0,.75)] transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.035]" />
        </div>
        <div className="flex flex-col items-start">
          <span className="mb-4 text-[11px] font-mono-tech font-semibold tracking-[.25em] uppercase" style={{color:'#8073FF'}}>POTENCIA SIN LÍMITES</span>
          <h2 className="whitespace-pre-line font-display text-[clamp(2.7rem,5.4vw,5.3rem)] font-black leading-[.96] tracking-tight text-white uppercase">MÁS PANTALLA.\nMÁS LIBERTAD.</h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[#C8CAD1]">Potencia Ryzen Z1 Extreme, pantalla QHD+ y controles desmontables. Jugá a tu manera.</p>
          <div className="mt-9 grid w-full grid-cols-3 border-y border-white/15 py-5">
            <div className="px-2 first:pl-0 border-r border-white/10 last:border-0 last:pr-0"><div className="font-display text-xl sm:text-2xl font-bold text-white">144 HZ</div><div className="mt-1 font-mono-tech text-[10px] tracking-[.08em] text-[#C8CAD1]/70">FLUIDEZ</div></div>
            <div className="px-2 first:pl-0 border-r border-white/10 last:border-0 last:pr-0"><div className="font-display text-xl sm:text-2xl font-bold text-white">49,2 Wh</div><div className="mt-1 font-mono-tech text-[10px] tracking-[.08em] text-[#C8CAD1]/70">BATERÍA</div></div>
            <div className="px-2 first:pl-0 border-r border-white/10 last:border-0 last:pr-0"><div className="font-display text-xl sm:text-2xl font-bold text-white">8,8″</div><div className="mt-1 font-mono-tech text-[10px] tracking-[.08em] text-[#C8CAD1]/70">QHD+</div></div>
          </div>
          <button onClick={() => onSelectProduct(legionGoProduct)}
            className="mt-9 inline-flex w-full sm:w-auto items-center justify-between gap-10 rounded-xl bg-white px-7 py-4 text-xs sm:text-sm font-bold tracking-[.08em] text-[#050507] uppercase transition-colors hover:bg-[#CBD7FF]">
            EXPLORAR LEGION GO<ArrowUpRight size={19} />
          </button>
        </div>
      </div>
    </div>
  </section>
);
