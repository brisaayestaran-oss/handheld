import React, { useState } from 'react';
import { brandConfig, buildGeneralWhatsAppLink } from '../config/brand';
import { MessageCircle, MapPin, Truck, HelpCircle, ChevronDown, ShieldAlert } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: '¿Cómo se coordina la compra y la entrega?',
      a: 'La atención es 100% personalizada por WhatsApp. Te compartimos fotos reales de la unidad disponible, número de serie, coordinamos el medio de pago acordado y enviamos el código de seguimiento de Correo Argentino / Andreani en el día.'
    },
    {
      q: '¿Hacen envíos a todo el país?',
      a: 'Sí, despachamos con encomienda asegurada a todas las provincias de Argentina. Para compras en CABA y Gran Buenos Aires, se puede coordinar entrega prioritaria por mensajería privada.'
    },
    {
      q: '¿Qué significa Reacondicionado Certificado?',
      a: 'Cada consola reacondicionada certificada pasa por un testeo riguroso de más de 30 puntos técnicos (salud de batería, calibración de sticks analógicos, puertos, pantalla y temperaturas). Se entregan en estado impecable, limpias, con cargador original y estuche de transporte.'
    },
    {
      q: '¿Steam Deck o Lenovo Legion Go? ¿Cuál me conviene?',
      a: 'Si buscás encender y jugar de inmediato tu biblioteca de Steam con excelente ergonomía y máxima duración de batería, Steam Deck OLED es la reina. Si querés jugar títulos de Xbox Game Pass nativo, juegos competitivos con anti-cheat (como Fortnite o CoD) o buscás la pantalla más grande y nítida a 144Hz, Lenovo Legion Go es la indicada. ¡Escribinos por WhatsApp y analizamos tus juegos!'
    }
  ];

  return (
    <section id="contacto" className="relative py-32 bg-[#050507] border-t border-white/[0.05] overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-radial from-[#3678FF]/15 via-[#7655FF]/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Giant Closing Banner */}
        <div className="p-8 sm:p-16 rounded-3xl bg-gradient-to-b from-[#101115] to-[#0A0B0E] border border-white/[0.12] text-center relative overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.9)] mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#3678FF]" />
            <span className="text-[11px] font-mono-tech text-[#C8CAD1] uppercase tracking-wider">
              ATENCIÓN INMEDIATA · BUENOS AIRES & TODO EL PAÍS
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-display text-white tracking-tight uppercase leading-[1.02] max-w-4xl mx-auto">
            TU PRÓXIMA CONSOLA <br />
            <span className="bg-gradient-to-r from-white via-[#C8CAD1] to-white/70 bg-clip-text text-transparent">
              TE ESTÁ ESPERANDO.
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#C8CAD1] max-w-2xl mx-auto leading-relaxed">
            Escribinos directamente para consultar stock en tiempo real, cotización al día
            o sacarte cualquier duda técnica sobre compatibilidad de juegos.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={buildGeneralWhatsAppLink('Quiero consultar por una consola disponible')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-9 py-4 text-xs sm:text-sm font-black font-display tracking-wider uppercase text-white bg-[#3678FF] hover:bg-[#2563EB] rounded-xl transition-all shadow-[0_0_40px_rgba(54,120,255,0.4)] flex items-center justify-center gap-2.5 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>HABLEMOS POR WHATSAPP</span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono-tech text-[#C8CAD1]/60">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#3678FF]" />
              <span>{brandConfig.city}, {brandConfig.country}</span>
            </div>
            <span aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#7655FF]" />
              <span>Envíos asegurados a todo el país</span>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-mono-tech text-[#3678FF] uppercase tracking-widest block mb-2">
              PREGUNTAS FRECUENTES
            </span>
            <h3 className="text-2xl font-bold font-display text-white uppercase">
              TODO LO QUE NECESITÁS SABER
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#101115] border border-white/[0.06] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-white font-medium hover:text-[#3678FF] transition-colors"
                  >
                    <span className="text-sm font-semibold">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C8CAD1]/60 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#3678FF]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[#C8CAD1] leading-relaxed border-t border-white/[0.04]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
