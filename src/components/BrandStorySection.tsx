import React from 'react';
import { Instagram, Facebook, MessageCircle, ArrowUpRight } from 'lucide-react';
import { brandConfig, buildGeneralWhatsAppLink } from '../config/brand';
import { recordInterest } from '../services/interestAnalytics';

export const BrandStorySection: React.FC = () => (
  <section id="nosotros" className="relative isolate scroll-mt-20 overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[580px] w-[850px] -translate-x-1/2 rounded-full bg-[#326AC4]/[.13] blur-[150px]" />
    <div className="relative mx-auto max-w-6xl border-t border-white/10 pt-12 sm:pt-16">
      <p className="text-xs font-bold uppercase tracking-[.25em] text-[#8EB5FF]">QUIÉNES SOMOS / HANDHELD ARGENTINA</p>
      <h2 className="mt-7 max-w-5xl font-display text-[clamp(2.5rem,7vw,7.3rem)] font-black uppercase leading-[.97] tracking-tight text-white">Desde Argentina,<span className="block text-[#8BB5FF]">para todos los argentinos.</span></h2>
      <div className="mt-9 grid items-start gap-8 sm:mt-12 lg:grid-cols-[1fr_.8fr] lg:gap-20">
        <div>
          <p className="max-w-2xl text-lg leading-relaxed text-[#D7E2F4] sm:text-2xl">Nos apasiona el gaming portátil y queremos acercarte una forma distinta de jugar.</p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#B3C4DE] sm:text-base">HANDHELD es un emprendimiento argentino. Escuchamos qué jugás, qué buscás y cuál es tu presupuesto para ayudarte a elegir tu próxima consola. Sin discursos complicados: una charla de persona a persona.</p>
        </div>
        <div className="border-l-2 border-[#6A9EFF]/65 pl-5 sm:pl-7">
          <p className="text-xs font-bold uppercase tracking-[.17em] text-[#91B7FF]">CERCA TUYO</p>
          <p className="mt-3 text-base leading-relaxed text-white">Conocé las fotos, los accesorios y las condiciones particulares de cada equipo antes de decidir.</p>
          <a href={buildGeneralWhatsAppLink('Quiero hablar con HANDHELD sobre una consola')} onClick={() => recordInterest('purchase_click',undefined,'whatsapp')} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#A7C7FF] hover:text-white">Hablemos por WhatsApp <ArrowUpRight size={17}/></a>
        </div>
      </div>
      <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-8 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-white">Seguinos. El gaming también es compartir.</h3>
          <p className="mt-1 text-sm text-[#AFC0DA]">Novedades, fotos y contacto directo.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={brandConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-semibold text-white hover:border-[#8DB8FF] hover:bg-white/[.05]"><Instagram size={17}/> Instagram</a>
          <a href={brandConfig.facebookUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-semibold text-white hover:border-[#8DB8FF] hover:bg-white/[.05]"><Facebook size={17}/> Facebook</a>
          <a href={buildGeneralWhatsAppLink('Quiero consultar por HANDHELD')} onClick={() => recordInterest('purchase_click',undefined,'whatsapp')} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#3678FF] px-5 text-sm font-bold text-white hover:bg-[#2866E8]"><MessageCircle size={17}/> WhatsApp</a>
        </div>
      </div>
    </div>
  </section>
);
