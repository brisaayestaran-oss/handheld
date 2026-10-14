import React from 'react';
import { Instagram, MessageCircle, ArrowUpRight, ShoppingBag, Users, Facebook, ShieldCheck } from 'lucide-react';
import { brandConfig, buildGeneralWhatsAppLink } from '../config/brand';
import { recordInterest } from '../services/interestAnalytics';

export const SocialSection: React.FC = () => (
  <section id="redes" className="relative bg-transparent px-5 py-14 sm:px-8 sm:py-24">
    <div className="relative mx-auto max-w-6xl">
      <p className="text-xs font-bold uppercase tracking-[.22em] text-[#8FA9FF]">VOS ELEGÍS CÓMO COMPRAR</p>
      <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-5xl">TU CONSOLA, A TU MANERA.</h2>
      <p className="mt-3 max-w-2xl text-sm text-[#C8CAD1]">Elegí el canal de compra que te resulte más cómodo y compará sus condiciones.</p>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <a href={buildGeneralWhatsAppLink('Quiero comprar directo y consultar precio final y envío')}
          onClick={() => recordInterest('purchase_click', undefined, 'whatsapp')}
          target="_blank" rel="noopener noreferrer"
          className="group flex flex-col justify-between rounded-3xl border border-[#558BFF]/35 bg-[#14234A]/65 p-6 transition-colors hover:border-[#83A8FF] hover:bg-[#19305E]/70 sm:p-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#3678FF]/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#A8C5FF]">PRECIO DIRECTO</div>
            <MessageCircle size={32} className="mb-4 text-[#87AEFF]" />
            <h3 className="text-2xl font-black text-white sm:text-3xl">Comprá directo a HANDHELD</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#CEDAF0]">Consultá el precio publicado en nuestra web. El envío se cotiza por separado según tu localidad.</p>
          </div>
          <span className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#3678FF] px-5 text-sm font-bold text-white">CONSULTAR POR WHATSAPP <ArrowUpRight size={18}/></span>
        </a>

        <div className="relative flex flex-col justify-between rounded-3xl border border-[#FFE071]/60 bg-[linear-gradient(140deg,rgba(255,225,102,.16),rgba(20,24,37,.94)_58%)] p-6 shadow-[0_16px_60px_rgba(0,0,0,.18)] sm:p-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#FFE600] px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-[#222]">TAMBIÉN EN MERCADO LIBRE</div>
            <ShoppingBag size={36} className="mb-4 text-[#FFE87A]" />
            <h3 className="text-2xl font-black text-white sm:text-3xl">Comprá por Mercado Libre</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#E1E4EF]">¿Preferís usar la plataforma? Pedinos el enlace de la publicación y compará las condiciones antes de comprar.</p>
            <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-[#E4DCAA]"><ShieldCheck size={17} className="shrink-0"/> El precio en Mercado Libre puede ser diferente por los costos de la plataforma. Consultá el valor exacto en cada publicación.</p>
          </div>
          <a href={buildGeneralWhatsAppLink('Quiero el enlace y precio de la publicación de Mercado Libre')}
            onClick={() => recordInterest('purchase_click', undefined, 'mercadolibre')}
            target="_blank" rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FFE600] px-5 text-sm font-black text-[#1C1C1C] transition-colors hover:bg-[#FFF185]">
            PEDIR LINK DE MERCADO LIBRE <ArrowUpRight size={18}/>
          </a>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <a href={brandConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-16 items-center gap-3 rounded-xl bg-white/[.045] px-5 text-sm font-semibold text-white hover:bg-white/[.09]"><Instagram size={21}/> Instagram <ArrowUpRight size={15} className="ml-auto"/></a>
        <a href={buildGeneralWhatsAppLink('Quiero sumarme a la comunidad de Instagram')} target="_blank" rel="noopener noreferrer" className="flex min-h-16 items-center gap-3 rounded-xl bg-white/[.045] px-5 text-sm font-semibold text-white hover:bg-white/[.09]"><Users size={21}/> Comunidad <ArrowUpRight size={15} className="ml-auto"/></a>
        <a href={brandConfig.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-16 items-center gap-3 rounded-xl bg-white/[.045] px-5 text-sm font-semibold text-white hover:bg-white/[.09]"><Facebook size={21}/> Facebook <ArrowUpRight size={15} className="ml-auto"/></a>
      </div>
    </div>
  </section>
);
