import React, { useState } from 'react';
import { Monitor, Cpu, Gamepad2 } from 'lucide-react';

const models = [
  { name:'Steam Deck LCD', panel:'7″ IPS LCD · 1280 × 800 · 60 Hz', detail:'Pantalla LCD nítida para jugar en SteamOS.', power:'AMD Zen 2 + RDNA 2', usage:'Ideal para entrar al gaming portátil.', color:'#7CA4CD' },
  { name:'Steam Deck OLED', panel:'7,4″ OLED HDR · 1280 × 800 · 90 Hz', detail:'Negros profundos, mejor contraste y 50 Wh de batería.', power:'AMD Zen 2 + RDNA 2 (6 nm)', usage:'Ideal para quienes priorizan pantalla y autonomía.', color:'#6796FF' },
  { name:'Lenovo Legion Go', panel:'8,8″ IPS QHD+ · 2560 × 1600 · 144 Hz', detail:'Mayor resolución, pantalla grande y controles desmontables.', power:'AMD Ryzen Z1 Extreme', usage:'Ideal para jugar con Windows y más versatilidad.', color:'#A097FF' }
];
const features = [
  {key:'panel', title:'Pantalla', icon:Monitor},
  {key:'power', title:'Procesador', icon:Cpu},
  {key:'usage', title:'¿Para quién?', icon:Gamepad2}
] as const;

export const ExperienceSection: React.FC = () => {
  const [active, setActive] = useState<(typeof features)[number]['key']>('panel');
  return (
    <section id="experiencia" className="relative bg-transparent py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-7">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[.20em] text-[#90A8FF]">COMPARÁ ANTES DE ELEGIR</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">¿Qué consola va con vos?</h2>
          <p className="mt-3 text-base text-[#C8CAD1]">Tres pantallas y tres experiencias diferentes, explicadas sin vueltas.</p>
        </div>
        <div className="mb-6 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap" role="group" aria-label="Comparar características">
          {features.map(item=>{
            const Icon=item.icon;
            return <button key={item.key} onClick={()=>setActive(item.key)} aria-pressed={active===item.key}
              className={`inline-flex min-h-11 min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border px-1.5 sm:px-4 py-2.5 text-[11px] sm:text-sm font-semibold transition-colors ${active===item.key?'bg-[#3678FF] border-[#6D98FF] text-white':'bg-[#151821] border-white/15 text-[#E3E6F0] hover:border-white/40'}`}><Icon size={15} className="shrink-0"/>{item.title}</button>;
          })}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {models.map(item=><article key={item.name} className="rounded-2xl border border-white/10 bg-[#11131A] p-6">
            <div className="mb-4 h-1 w-10 rounded-full" style={{backgroundColor:item.color}}/>
            <h3 className="text-xl font-bold text-white">{item.name}</h3>
            <p className="mt-4 text-base font-semibold leading-snug text-white">{item[active]}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#C8CAD1]">{active==='panel'?item.detail:active==='power'?'Rendimiento para juegos de PC en formato portátil.':'Compará capacidades y disponibilidad en el catálogo.'}</p>
          </article>)}
        </div>
      </div>
    </section>
  );
};
