import React, { useState } from 'react';
import { brandConfig, buildGeneralWhatsAppLink } from '../config/brand';
import { MessageCircle, MapPin, Truck, HelpCircle, ChevronDown, ShieldAlert } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: '¿Cómo se coordina la compra y la entrega?',
      a: 'Coordinamos la compra por WhatsApp. Antes de pagar, solicitá fotografías de la unidad, su estado, los medios de pago disponibles y las condiciones de entrega. Los tiempos se confirman al momento de la compra.'
    },
    {
      q: '¿Hacen envíos a todo el país?',
      a: 'Consultanos tu localidad y código postal por WhatsApp para confirmar cobertura, costo, plazo y condiciones del envío antes de realizar el pago.'
    },
    {
      q: '¿Qué significa caja abierta y poco uso?',
      a: 'Son consolas usadas con poco tiempo de uso y embalaje abierto. El estado exacto, batería, accesorios y condiciones de garantía pueden variar entre unidades. Pedinos fotografías e información de la unidad que te interesa.'
    },
    {
      q: '¿Steam Deck o Lenovo Legion Go? ¿Cuál me conviene?',
      a: 'Steam Deck con SteamOS prioriza una experiencia centrada en Steam y permite comprobar la compatibilidad de los juegos. Legion Go usa Windows y ofrece mayor flexibilidad de lanzadores y pantalla grande. El rendimiento y la compatibilidad varían según título, ajustes y actualizaciones. Consultanos por tus juegos favoritos.'
    }
  ];

  return (
    <section id="contacto" className="relative scroll-mt-20 py-10 sm:py-16 bg-transparent overflow-hidden">
      {/* Background glow */}
      {/* Efecto difuminado compartido con las demas secciones. */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Giant Closing Banner */}
        <div className="p-8 sm:p-16 rounded-3xl bg-gradient-to-b from-[#101115] to-[#0A0B0E] border border-white/[0.12] text-center relative overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.9)] mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#3678FF]" />
            <span className="text-[11px] font-mono-tech text-[#C8CAD1] uppercase tracking-wider">
              ATENCIÓN PERSONALIZADA · BUENOS AIRES & TODO EL PAÍS
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
              <span>Consultá cobertura y costos de envío</span>
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
