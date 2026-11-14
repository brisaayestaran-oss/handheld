import React from 'react';
import { ArrowUpRight, MessageCircle, ShoppingBag } from 'lucide-react';
import { buildGeneralWhatsAppLink } from '../config/brand';
import { recordInterest } from '../services/interestAnalytics';

export const SocialSection: React.FC = () => (
  <section id="redes" className="px-4 py-8 sm:px-8 sm:py-12">
    <div className="mx-auto max-w-6xl">
      <p className="text-[11px] font-bold uppercase tracking-[.22em] text-[#92B1FF]">ELEGÍ CÓMO CONSULTAR</p>
      <h2 className="mt-2 font-display text-2xl font-black uppercase text-white sm:text-4xl">Tu consola, a tu manera.</h2>
      <p className="mt-2 text-sm text-[#B5C2D8]">Consultá el precio directo o solicitá las condiciones de una publicación en Mercado Libre.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <a href={buildGeneralWhatsAppLink('Quiero consultar el precio directo y el envío')} onClick={() => recordInterest('purchase_click',undefined,'whatsapp')} target="_blank" rel="noopener noreferrer" className="group flex min-h-32 items-center justify-between gap-4 rounded-2xl border border-[#3678FF]/35 bg-[#142449]/70 p-5 transition-colors hover:bg-[#1B315B]">
          <div><MessageCircle size={22} className="text-[#8BB2FF]"/><h3 className="mt-2 text-lg font-bold text-white">Compra directa</h3><p className="mt-1 text-xs text-[#C3D0E5]">Precio publicado. Envío a cotizar.</p></div><ArrowUpRight className="shrink-0 text-[#B7CBFF]" />
        </a>
        <a href={buildGeneralWhatsAppLink('Solicito enlace, precio y condiciones de Mercado Libre')} onClick={() => recordInterest('purchase_click',undefined,'mercadolibre')} target="_blank" rel="noopener noreferrer" className="group flex min-h-32 items-center justify-between gap-4 rounded-2xl border border-[#FFE071]/25 bg-[#181B28] p-5 transition-colors hover:bg-[#242837]">
          <div><ShoppingBag size={22} className="text-[#FFE071]"/><h3 className="mt-2 text-lg font-bold text-white">Mercado Libre</h3><p className="mt-1 text-xs text-[#C3D0E5]">Pedí el enlace y confirmá el precio de esa publicación.</p></div><ArrowUpRight className="shrink-0 text-[#FFE071]" />
        </a>
      </div>
    </div>
  </section>
);
