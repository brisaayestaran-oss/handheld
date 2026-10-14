import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import type { Product } from '../types/catalog';
import { recordInterest } from '../services/interestAnalytics';

interface Props {
  steamDeckProduct: Product;
  steamDeckLcdProduct: Product;
  legionGoProduct: Product;
  hasOledStock: boolean;
  onSelectProduct: (product: Product) => void;
}

export const ConsoleComparisonSection: React.FC<Props> = ({
  steamDeckProduct, steamDeckLcdProduct, legionGoProduct, hasOledStock, onSelectProduct
}) => {
  const models = [
    { name: 'Steam Deck OLED', point: 'Pantalla OLED HDR · 90 Hz', os: 'SteamOS', product: steamDeckProduct, available: hasOledStock },
    { name: 'Steam Deck LCD', point: 'Pantalla LCD · 60 Hz', os: 'SteamOS', product: steamDeckLcdProduct, available: steamDeckLcdProduct.variants.some(v => v.inStock) },
    { name: 'Lenovo Legion Go', point: 'Pantalla de 8,8″ · 144 Hz', os: 'Windows', product: legionGoProduct, available: legionGoProduct.variants.some(v => v.inStock) }
  ];

  const seeCatalog = () => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="experiencia" className="relative scroll-mt-24 bg-transparent px-5 py-12 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-[#8FA9FF]">COMPARÁ EN UN VISTAZO</p>
        <h2 className="mt-3 text-2xl font-black uppercase text-white sm:text-4xl">¿CUÁL VA CON VOS?</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#C8CAD1]">Steam Deck usa SteamOS y Legion Go usa Windows. La compatibilidad de juegos depende de cada título.</p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {models.map((model, index) => (
            <article key={model.name} className="flex flex-col justify-between rounded-2xl bg-white/[.045] p-5 sm:p-6">
              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8FA9FF]">{model.os}</span>
                  <span className={model.available ? 'text-xs font-semibold text-emerald-300' : 'text-xs font-bold text-[#FFC7C7]'}>
                    {model.available ? 'Disponible' : 'Sin stock :('}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">{model.name}</h3>
                <p className="mt-2 text-sm text-[#C8CAD1]">{model.point}</p>
                {index === 0 && !model.available && models[1].available &&
                  <p className="mt-3 flex items-start gap-2 text-sm text-[#BFD3FF]"><CheckCircle2 size={16} className="mt-0.5 shrink-0"/>Te recomendamos la Steam Deck LCD, disponible en el catálogo.</p>}
              </div>
              <button onClick={() => { recordInterest('options_click', {id: model.product.id, name: model.name, capacity: model.product.variants[0]?.capacity}); model.available ? onSelectProduct(model.product) : seeCatalog(); }}
                className="mt-5 inline-flex min-h-11 items-center justify-between gap-2 rounded-xl bg-white/10 px-4 text-sm font-bold text-white transition-colors hover:bg-[#3678FF]">
                {model.available ? 'Ver opciones' : index === 0 && models[1].available ? 'Ver Steam Deck LCD' : 'Ver alternativas'}
                <ArrowUpRight size={17}/>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
