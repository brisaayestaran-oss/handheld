import React from 'react';
import type { Product } from '../../types/catalog';
import { SHEET_EDIT_URL } from '../../data/liveCatalog';
import { ArrowUpRight, CheckCircle2, Clock3, FileSpreadsheet, Info } from 'lucide-react';

interface Props {
  products: Product[];
  soldCount: number;
  fetchedAt: string;
  warning: string;
}

export const AdminLiveCatalog: React.FC<Props> = ({ products, soldCount, fetchedAt, warning }) => {
  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-[#3678FF]/30 bg-[#14234A]/45 p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#91B3FF]">INVENTARIO PÚBLICO REAL</p>
            <h2 className="mt-2 text-2xl font-black text-white">Stock de Google Sheets</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#C8CAD1]">
              La tienda consulta la misma planilla aproximadamente cada minuto. Marcá una unidad como «Agotado» en la columna Estado para retirarla de la venta, o actualizá «Precio publicado».
            </p>
          </div>
          <a href={SHEET_EDIT_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#3678FF] px-5 text-sm font-bold text-white hover:bg-[#2563EB]">
            <FileSpreadsheet size={18}/> ABRIR Y EDITAR PLANILLA <ArrowUpRight size={17}/>
          </a>
        </div>
        <p className="mt-4 flex items-center gap-2 text-xs text-[#C8CAD1]/80">
          {fetchedAt ? <CheckCircle2 size={16} className="text-emerald-400"/> : <Clock3 size={16}/>}
          {warning || (fetchedAt ? 'Última actualización: ' + new Date(fetchedAt).toLocaleString('es-AR') : 'Conectando con la planilla…')}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5">
          <p className="text-xs text-white/60">Publicadas ahora</p>
          <p className="mt-2 text-3xl font-black text-white">{products.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5">
          <p className="text-xs text-white/60">Agotadas / no disponibles</p>
          <p className="mt-2 text-3xl font-black text-white">{soldCount}</p>
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white">Unidades visibles en la tienda</h3>
        {products.map(p => <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#101115] p-4">
          <div><p className="font-semibold text-white">{p.name}</p><p className="mt-1 text-xs text-[#B8C6DD]">{p.model}</p></div>
          <div className="text-right"><span className="text-xs text-emerald-300">En stock</span><p className="font-black text-white">$ {p.variants[0]?.priceARSApprox.toLocaleString('es-AR')}</p></div>
        </div>)}
      </div>
      <p className="flex items-start gap-2 text-xs text-[#B8C6DD]"><Info size={17} className="shrink-0"/>Las otras pantallas del administrador todavía contienen datos locales de demostración y no modifican las publicaciones reales. Usá la planilla para cambios de stock y precio hasta que se active el sistema de edición autenticado.</p>
    </div>
  );
};
