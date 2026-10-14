import React from 'react';
import { Boxes, BarChart3, ExternalLink, LogOut, Camera, PackageCheck, PackageX, ShieldCheck, Sparkles } from 'lucide-react';
import type { Product } from '../../types/catalog';
import { SHEET_EDIT_URL } from '../../data/liveCatalog';
import { AdminInterestAnalytics } from './AdminInterestAnalytics';
import { getSupabaseClient } from '../../lib/supabase';
import { AdminPhotoUploader } from './AdminPhotoUploader';
interface Props { onExitAdmin: () => void; publicProducts: Product[]; soldCount: number; stockFetchedAt: string; stockWarning: string; }
export const AdminLayout: React.FC<Props> = ({onExitAdmin,publicProducts,soldCount,stockFetchedAt,stockWarning}) => {
 const [tab,setTab]=React.useState<'stock'|'interest'>('stock');
 const [filter,setFilter]=React.useState<'all'|'valve'|'lenovo'>('all');
 const filtered=publicProducts.filter(p=>filter==='all'||(filter==='lenovo'?p.brand==='Lenovo':p.brand==='Valve'));
 return <main className="min-h-screen bg-[#050A15] text-white [background-image:radial-gradient(ellipse_70%_35%_at_15%_5%,rgba(52,104,246,.25),transparent),radial-gradient(ellipse_45%_30%_at_95%_32%,rgba(101,57,206,.16),transparent)]">
  <div className="mx-auto max-w-7xl p-4 sm:p-7 lg:p-10">
   <header className="flex flex-wrap items-center justify-between gap-5 border-b border-white/10 pb-7">
    <div className="space-y-2"><p className="inline-flex items-center gap-2 rounded-full border border-[#5083F9]/35 bg-[#2350AF]/20 px-3 py-1 text-xs font-bold uppercase tracking-[.16em] text-[#A8C8FF]"><ShieldCheck size={14}/> PANEL SEGURO</p>
    <h1 className="text-3xl sm:text-4xl font-black tracking-tight">HANDHELD <span className="text-[#78ACFF]">/ ADMIN</span></h1>
    <p className="text-sm text-[#B0C4E7]">Gestioná las fotos reales de cada consola y descubrí qué buscan tus clientes.</p></div>
    <button onClick={async()=>{await getSupabaseClient()?.auth.signOut();onExitAdmin();location.hash='';}} className="flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white hover:bg-red-500/20"><LogOut size={17}/> Salir</button>
   </header>
   <nav className="mt-7 grid grid-cols-2 gap-3 sm:flex" aria-label="Secciones del administrador">
    <button onClick={()=>setTab('stock')} className={`flex min-h-14 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-bold transition-colors ${tab==='stock'?'bg-[#3678FF] text-white shadow-[0_12px_35px_rgba(54,120,255,.3)]':'bg-[#121D36] text-[#B5CAEC] hover:bg-[#1D3059]'}`}><Boxes size={19}/> Consolas y fotos</button>
    <button onClick={()=>setTab('interest')} className={`flex min-h-14 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-bold transition-colors ${tab==='interest'?'bg-[#3678FF] text-white shadow-[0_12px_35px_rgba(54,120,255,.3)]':'bg-[#121D36] text-[#B5CAEC] hover:bg-[#1D3059]'}`}><BarChart3 size={19}/> Interacciones</button>
   </nav>
   <section className="pt-8">{tab==='interest'?<AdminInterestAnalytics/>:<div className="space-y-7">
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
     <div className="rounded-2xl border border-[#558CFF]/25 bg-gradient-to-br from-[#1B377C]/80 to-[#102047] p-5"><PackageCheck className="mb-3 text-[#87B9FF]"/><p className="text-sm text-[#AFC7EC]">Disponibles</p><p className="mt-1 text-3xl font-black">{stockFetchedAt?publicProducts.length:'—'}</p></div>
     <div className="rounded-2xl border border-amber-400/20 bg-gradient-to-br from-[#49351E]/60 to-[#1D1721] p-5"><PackageX className="mb-3 text-amber-300"/><p className="text-sm text-amber-100/80">Sin stock</p><p className="mt-1 text-3xl font-black">{stockFetchedAt?soldCount:'—'}</p></div>
     <div className="col-span-2 lg:col-span-1 rounded-2xl border border-violet-400/20 bg-gradient-to-br from-[#38215F]/65 to-[#161A3A] p-5"><Camera className="mb-3 text-violet-300"/><p className="text-sm text-violet-100/80">Fotografías</p><p className="mt-1 text-xl font-black">Galerías por unidad</p></div>
    </div>
    {stockWarning&&<p role="alert" className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-amber-100">{stockWarning}</p>}
    <div className="flex flex-wrap items-center justify-between gap-4">
     <div><h2 className="text-2xl font-black">Inventario y fotografías</h2><p className="text-sm text-[#ABBEDE] mt-1">Subí imágenes, elegí la portada y ordená el resto desde cada tarjeta.</p><p className="mt-2 text-xs text-[#829ABA]">Última sincronización: {stockFetchedAt?new Date(stockFetchedAt).toLocaleString('es-AR'):'No disponible'}</p></div>
     <a href={SHEET_EDIT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#588CFF]/40 bg-[#3678FF]/15 px-4 text-sm font-bold text-[#C1D8FF] hover:bg-[#3678FF]/25">Editar precios / stock <ExternalLink size={16}/></a>
    </div>
    <div className="flex flex-wrap gap-2">{([['all','Todas'],['valve','Steam Deck'],['lenovo','Lenovo Legion']] as const).map(([id,label])=><button key={id} onClick={()=>setFilter(id)} className={`rounded-full border px-4 py-2 text-xs font-bold ${filter===id?'border-[#7BA9FF] bg-[#3678FF] text-white':'border-white/10 bg-white/5 text-[#B9C8E2]'}`}>{label}</button>)}</div>
    <div className="grid gap-5 lg:grid-cols-2">{filtered.map(p=><article key={p.id} className="rounded-3xl border border-white/10 bg-[#0D1426]/90 p-4 sm:p-6 shadow-[0_18px_50px_rgba(0,0,0,.2)]">
     <div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0 flex-1"><p className="text-[11px] font-bold tracking-widest uppercase text-[#7FB0FF]">{p.brand} · {p.variants[0]?.capacity}</p><h3 className="mt-2 text-xl font-black">{p.name}</h3><p className="mt-2 text-xs text-[#B0C0DD]">{p.model}</p></div><span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-300">En stock</span></div>
     <p className="mt-4 text-xl font-black text-white">{p.variants[0]?.priceARSApprox.toLocaleString('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0})}</p>
     <AdminPhotoUploader product={p}/>
    </article>)}</div>
    <p className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-[#A9BCE0]"><Sparkles size={16} className="shrink-0 text-[#86AEFF]"/>Precios y disponibilidad se administran en Google Sheets; la galería y el orden se guardan en Supabase. Los cambios de fotografías aparecen al actualizar la tienda.</p>
   </div>}</section>
  </div>
 </main>;
};
