import React from 'react';
import { Instagram, Facebook, MessageCircle, HeartHandshake, Eye, ShieldCheck } from 'lucide-react';
import { brandConfig, buildGeneralWhatsAppLink } from '../config/brand';
import { recordInterest } from '../services/interestAnalytics';

const pillars = [
  { icon: HeartHandshake, title: 'Atención cercana', body: 'Nos interesa qué jugás, qué necesitás y qué presupuesto tenés.' },
  { icon: Eye, title: 'Equipos concretos', body: 'Consultá las fotos, el estado y los accesorios de cada unidad.' },
  { icon: ShieldCheck, title: 'Información antes de comprar', body: 'Precio, entrega y condiciones se confirman antes de cerrar.' }
];
export const BrandStorySection: React.FC = () => (
  <section id="nosotros" className="relative scroll-mt-20 px-4 py-12 sm:px-8 sm:py-20">
    <div className="mx-auto max-w-6xl">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-[#678FE0]/20 bg-[radial-gradient(ellipse_at_top_right,rgba(44,82,155,.27),transparent_60%),#101725] px-6 py-9 sm:px-10 sm:py-12">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-[#91B6FF]">QUIÉNES SOMOS · HANDHELD ARGENTINA</p>
        <h2 className="mt-4 max-w-4xl font-display text-[clamp(2rem,5vw,4.6rem)] font-black uppercase leading-[1.07] tracking-tight text-white">Desde Argentina,<span className="block text-[#89B2FF]">para todos los argentinos.</span></h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#CBD7EA]">Nos apasiona el gaming portátil. HANDHELD nació para acercar Steam Deck y Lenovo Legion Go a quienes quieren jugar de otra manera, con una atención real y sin complicaciones.</p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#B7C8E1]">No queremos que elijas una consola solo por una ficha técnica: queremos escucharte, conocer tus juegos y ayudarte a comparar alternativas para que decidas con información y confianza.</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {pillars.map(({icon:Icon,title,body}) => <div key={title} className="rounded-2xl border border-white/10 bg-white/[.045] p-4"><Icon size={21} className="text-[#94B8FF]"/><h3 className="mt-3 text-sm font-bold text-white">{title}</h3><p className="mt-2 text-xs leading-relaxed text-[#B7C8E1]">{body}</p></div>)}
        </div>
        <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div><h3 className="text-sm font-bold text-white">Seguinos y hablemos de gaming.</h3><p className="mt-1 text-xs text-[#B4C7E2]">Encontrá novedades en redes y consultanos por WhatsApp cuando quieras.</p></div>
          <div className="flex flex-wrap gap-2">
            <a href={brandConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 px-4 text-xs font-bold text-white hover:bg-white/10"><Instagram size={17}/> Instagram</a>
            <a href={brandConfig.facebookUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 px-4 text-xs font-bold text-white hover:bg-white/10"><Facebook size={17}/> Facebook</a>
            <a href={buildGeneralWhatsAppLink('Quiero hacer una consulta sobre HANDHELD')} onClick={() => recordInterest('purchase_click',undefined,'whatsapp')} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#3678FF] px-4 text-xs font-bold text-white hover:bg-[#2563EB]"><MessageCircle size={17}/> WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
