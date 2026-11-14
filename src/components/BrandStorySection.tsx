import React from 'react';
import { Camera, ClipboardCheck, MessageCircle, Truck } from 'lucide-react';
import { buildGeneralWhatsAppLink } from '../config/brand';

const details = [
  { icon: Camera, title: 'Fotos de cada unidad', body: 'Consultá las fotos reales y los accesorios antes de decidir.' },
  { icon: ClipboardCheck, title: 'Información clara', body: 'Verificá estado, capacidad y condiciones de la consola que elegís.' },
  { icon: MessageCircle, title: 'Atención directa', body: 'Hablá con HANDHELD por WhatsApp para resolver tus dudas.' },
  { icon: Truck, title: 'Entrega a coordinar', body: 'Consultá cobertura, costo y plazo antes de confirmar la compra.' }
];

export const BrandStorySection: React.FC = () => (
  <section id="nosotros" className="relative scroll-mt-20 px-4 py-10 sm:px-8 sm:py-14">
    <div className="mx-auto max-w-6xl rounded-[1.75rem] border border-white/10 bg-[#101725]/75 p-5 sm:p-9">
      <p className="text-[11px] font-semibold uppercase tracking-[.22em] text-[#91B5FF]">COMPRÁ CON INFORMACIÓN</p>
      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-black uppercase text-white sm:text-4xl">Cada unidad, bien clara.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#B7C5DC]">Somos HANDHELD, una tienda argentina especializada en consolas portátiles. Consultá los detalles concretos antes de comprar.</p>
        </div>
        <a href={buildGeneralWhatsAppLink('Quiero consultar el estado, fotos reales y condiciones de una consola')} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-[#3678FF] px-5 text-sm font-bold text-white hover:bg-[#2563EB]">Hacer una consulta</a>
      </div>
      <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {details.map(({icon: Icon,title,body}) => (
          <div key={title} className="rounded-2xl border border-white/[.07] bg-white/[.035] p-4">
            <Icon size={21} className="text-[#8BAFFF]" />
            <h3 className="mt-3 text-sm font-bold text-white">{title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-[#AFC0D8]">{body}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] leading-relaxed text-[#91A2BC]">El estado, las fotos, los accesorios, los medios de pago, la garantía aplicable y las condiciones de entrega se confirman para cada unidad.</p>
    </div>
  </section>
);
