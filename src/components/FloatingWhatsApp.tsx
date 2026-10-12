import React from 'react';
import { brandConfig, buildGeneralWhatsAppLink } from '../config/brand';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href={buildGeneralWhatsAppLink('Consulta rápida')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      className="fixed bottom-6 right-6 z-40 p-3.5 sm:p-4 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 font-display text-xs font-bold transition-all duration-300">
        Consultar por WhatsApp
      </span>
    </a>
  );
};
