import React from 'react';
import { HandheldLogo } from './HandheldLogo';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="bg-transparent py-8 text-[#C8CAD1]">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 text-center sm:flex-row sm:px-8 sm:text-left">
      <HandheldLogo size="md" showWordmark={true} />
      <p className="text-xs text-[#C8CAD1]/70">© {new Date().getFullYear()} HANDHELD</p>
      <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className="inline-flex items-center gap-2 text-xs font-semibold text-white/75 hover:text-white">
        VOLVER ARRIBA <ArrowUp size={16}/>
      </button>
    </div>
  </footer>
);
