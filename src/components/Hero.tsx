import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { buildGeneralWhatsAppLink } from '../config/brand';
import { HeroConsoleCarousel } from './HeroConsoleCarousel';

export interface HeroProps {
  onExplore: (brand?: 'Valve' | 'Lenovo') => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
  <section id="inicio" className="relative overflow-hidden bg-transparent text-white scroll-mt-20">
    {/* Texto y carrusel optimizados por separado para pantallas grandes y móviles. */}
    <div className="relative z-20 mx-auto flex min-h-[420px] max-w-7xl flex-col items-center justify-center px-5 pb-12 pt-[86px] text-center sm:min-h-0 sm:justify-start sm:pb-0 sm:pt-24 lg:pt-24">
      <p className="mb-4 font-mono-tech text-[10px] font-semibold uppercase tracking-[.20em] text-[#B4C9EF] sm:mb-4 sm:tracking-[.24em] sm:text-xs">
        <span className="inline-flex items-center gap-3 rounded-full border border-[#8AC7FF]/30 bg-[#74ACDF]/[.08] px-4 py-2 text-xs font-bold tracking-[.12em] text-[#D3E9FF]">
          <span aria-label="Bandera argentina" className="inline-flex h-5 w-8 items-center justify-center overflow-hidden rounded-sm bg-[linear-gradient(to_bottom,#74ACDF_0%,#74ACDF_33%,#FFFFFF_33%,#FFFFFF_66%,#74ACDF_66%)]"><span className="h-1.5 w-1.5 rounded-full bg-[#E3B945]"/></span>
          <span className="sm:hidden">GAMING PORTÁTIL EN ARGENTINA</span>
          <span className="hidden sm:inline">EMPRENDIMIENTO ARGENTINO</span>
        </span>
      </p>
      <h1 className="w-full max-w-5xl font-display text-[clamp(2rem,6vw,5rem)] font-black uppercase leading-[1.06] tracking-tight text-white sm:leading-[.98]">
        <span className="block sm:hidden">TU PRÓXIMA</span>
        <span className="block sm:hidden">AVENTURA</span>
        <span className="block sm:hidden text-[#B5CAFF]">EMPIEZA ACÁ.</span>
        <span className="hidden sm:block">ENCONTRÁ TU</span>
        <span className="hidden sm:block">PRÓXIMA CONSOLA</span>
      </h1>
      <p className="mx-auto mt-4 max-w-[340px] text-sm leading-relaxed text-[#D1DCF1] sm:mt-3 sm:max-w-2xl sm:text-lg">
        <span className="sm:hidden">Descubrí nuestras Steam Deck y Lenovo Legion Go. Elegí cómo y dónde jugar.</span>
        <span className="hidden sm:inline">Descubrí la consola que va con vos. Tu próxima aventura empieza acá.</span>
      </p>
      <div className="mx-auto mt-7 flex w-full max-w-[650px] flex-col justify-center gap-2 sm:mt-6 sm:w-auto sm:flex-row">
        <button type="button" onClick={() => onExplore()}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#3678FF] px-6 py-3.5 text-xs font-bold uppercase text-white transition-colors hover:bg-[#2563EB] sm:text-sm">
          EXPLORAR CONSOLAS <ArrowRight size={16} />
        </button>
        <a href={buildGeneralWhatsAppLink('Consulta desde portada')} target="_blank" rel="noopener noreferrer"
          className="hidden min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-[#0B1020]/90 px-6 py-3.5 text-xs font-bold uppercase text-white transition-colors hover:border-[#7AA6FF] sm:inline-flex sm:text-sm">
          <MessageCircle size={16} className="text-[#5691FF]" /> CONSULTAR POR WHATSAPP
        </a>
      </div>
    </div>

    {/* Tres consolas existentes en la portada; portada y contenido sin reemplazar. */}
    <HeroConsoleCarousel />
  </section>
  );
};
