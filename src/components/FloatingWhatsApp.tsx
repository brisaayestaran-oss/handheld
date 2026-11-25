import React, { useEffect, useState } from 'react';
import { brandConfig, buildGeneralWhatsAppLink } from '../config/brand';
import { MessageCircle } from 'lucide-react';
import { recordInterest } from '../services/interestAnalytics';

export const FloatingWhatsApp: React.FC<{ modalOpen?: boolean }> = ({ modalOpen = false }) => {
  const [catalogVisible, setCatalogVisible] = useState(false);
  useEffect(() => {
    const catalog = document.getElementById('catalogo');
    if (!catalog) return;
    const observer = new IntersectionObserver(([entry]) => setCatalogVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(catalog);
    return () => observer.disconnect();
  }, []);
  return (
    <a
      href={buildGeneralWhatsAppLink('Consulta rápida')}
      onClick={() => recordInterest('purchase_click',undefined,'whatsapp')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      className={`fixed bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] right-4 z-40 p-2.5 sm:bottom-6 sm:right-6 sm:p-4 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group ${catalogVisible ? "max-sm:hidden" : ""} ${modalOpen ? "hidden" : ""}`}
    >
      <MessageCircle className="h-5 w-5 fill-current sm:h-6 sm:w-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 font-display text-xs font-bold transition-all duration-300">
        Consultar por WhatsApp
      </span>
    </a>
  );
};
