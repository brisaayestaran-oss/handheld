import React from 'react';
import { BarChart3, Eye, MousePointerClick, MessageCircle, ShoppingBag, RefreshCw, TrendingUp } from 'lucide-react';
import { fetchInterestSummary, type InterestSummary } from '../../services/interestAnalytics';
export const AdminInterestAnalytics:React.FC=()=>{
 const [days,setDays]=React.useState(7);
 const [rows,setRows]=React.useState<InterestSummary[]>([]);
 const [error,setError]=React.useState('');
 const [loading,setLoading]=React.useState(false);
 const refresh=React.useCallback(async()=>{setLoading(true);setError('');
  try{setRows(await fetchInterestSummary(days));}
  catch{setRows([]);setError('No se pudieron consultar métricas. Revisá tu sesión.');}
  finally{setLoading(false);}
 },[days]);
 React.useEffect(()=>{void refresh();},[refresh]);
 const sum=(type:string,channel?:string)=>rows.filter(r=>r.event_type===type&&(!channel||r.channel===channel)).reduce((s,r)=>s+Number(r.total),0);
 const stats=[
  {name:'Fichas abiertas',value:sum('product_view'),icon:Eye,style:'from-[#224B9F] to-[#142B5F]',color:'text-[#A1C7FF]'},
  {name:'Ver opciones',value:sum('options_click'),icon:MousePointerClick,style:'from-[#55329B] to-[#2B1D5A]',color:'text-[#D5B5FF]'},
  {name:'WhatsApp',value:sum('purchase_click','whatsapp'),icon:MessageCircle,style:'from-[#126656] to-[#103B37]',color:'text-[#92F8CC]'},
  {name:'Mercado Libre',value:sum('purchase_click','mercadolibre'),icon:ShoppingBag,style:'from-[#715B23] to-[#42361A]',color:'text-[#FFE18D]'}
 ];
 const byProduct=new Map<string,number>();
 for(const r of rows.filter(r=>r.event_type==='product_view'))byProduct.set(r.product_name,(byProduct.get(r.product_name)||0)+Number(r.total));
 const ranking=[...byProduct].sort((a,b)=>b[1]-a[1]);
 const max=Math.max(1,...ranking.map(x=>x[1]));
 const total=ranking.reduce((s,r)=>s+r[1],0);
 const families=[{name:'Steam Deck',value:ranking.filter(x=>/steam deck/i.test(x[0])).reduce((s,x)=>s+x[1],0),color:'bg-[#518CF9]'},{name:'Lenovo Legion',value:ranking.filter(x=>/legion|lenovo/i.test(x[0])).reduce((s,x)=>s+x[1],0),color:'bg-[#B58AFB]'}];
 return <div className="space-y-7">
  <div className="flex flex-wrap items-center justify-between gap-4">
   <div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#90B9FF]"><TrendingUp size={16}/> COMPORTAMIENTO REAL</p><h2 className="mt-2 text-2xl sm:text-3xl font-black">Interacciones verificadas</h2><p className="mt-2 text-sm text-[#ADC2E1]">Qué productos miran y qué canales eligen tus visitantes.</p></div>
   <div className="flex items-center gap-2"><select aria-label="Período" value={days} onChange={e=>setDays(Number(e.target.value))} className="min-h-11 rounded-xl border border-white/15 bg-[#152747] px-3 text-sm text-white"><option value={7}>7 días</option><option value={30}>30 días</option><option value={90}>90 días</option><option value={365}>365 días</option></select><button onClick={()=>void refresh()} className="min-h-11 rounded-xl border border-[#6398FF]/30 bg-[#3678FF]/20 px-4 text-sm font-bold text-white hover:bg-[#3678FF]/40"><RefreshCw size={17}/></button></div>
  </div>
  {error&&<p role="alert" className="rounded-xl bg-red-500/10 p-4 text-red-200">{error}</p>}
  {loading?<div className="rounded-2xl bg-white/5 p-8 text-center text-[#B9CDEF]">Consultando Supabase…</div>:error?null:<>
   <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">{stats.map(s=><div key={s.name} className={`rounded-2xl border border-white/10 bg-gradient-to-br ${s.style} p-4 sm:p-5 shadow-[0_12px_35px_rgba(0,0,0,.15)]`}><s.icon size={23} className={s.color}/><p className="mt-4 text-xs sm:text-sm text-[#D7E3F7]">{s.name}</p><p className="mt-1 text-3xl sm:text-4xl font-black tabular-nums">{s.value.toLocaleString('es-AR')}</p></div>)}</div>
   <div className="grid gap-5 lg:grid-cols-5">
    <div className="lg:col-span-3 rounded-3xl border border-white/10 bg-[#101A30]/90 p-5 sm:p-7"><div className="mb-6 flex items-center gap-2"><BarChart3 className="text-[#94B9FF]"/><h3 className="text-xl font-bold">Consolas más vistas</h3></div>{ranking.length===0?<p className="text-[#9FB5D9] text-sm">Todavía no hay vistas de fichas en este período.</p>:<div className="space-y-5">{ranking.map(([name,value],i)=><div key={name}><div className="mb-2 flex items-start justify-between gap-3 text-xs sm:text-sm"><span className="text-[#DCE8FC]">{i+1}. {name}</span><strong className="shrink-0 text-white">{value}</strong></div><div className="h-3 overflow-hidden rounded-full bg-[#23314B]"><div className="h-full rounded-full bg-gradient-to-r from-[#3678FF] to-[#9C7EFF]" style={{width:`${100*value/max}%`}}/></div></div>)}</div>}</div>
    <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-[#101A30]/90 p-5 sm:p-7"><h3 className="text-xl font-bold">Por familia</h3><p className="mt-1 text-xs text-[#9FB5D9]">Vistas de fichas por marca</p><div className="mt-6 space-y-5">{families.map(f=><div key={f.name}><div className="flex justify-between gap-2 text-sm"><span>{f.name}</span><strong>{f.value}</strong></div><div className="mt-2 h-3 rounded-full bg-[#23314B] overflow-hidden"><div className={`h-full rounded-full ${f.color}`} style={{width:`${total?100*f.value/total:0}%`}}/></div></div>)}</div><p className="mt-6 text-xs text-[#93A9CD]">Los clics no equivalen a clientes únicos ni ventas confirmadas.</p></div>
   </div>
   <div className="rounded-3xl border border-white/10 bg-[#101A30]/90 p-5 sm:p-7"><h3 className="text-xl font-bold">Todas las acciones</h3><p className="mt-1 text-xs text-[#9FB5D9]">Detalle por modelo, capacidad y canal</p><div className="mt-4 divide-y divide-white/10">{rows.length===0?<p className="py-5 text-sm text-[#A6BCD9]">Sin interacciones registradas.</p>:rows.map((r,i)=><div key={i} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"><div><p className="font-semibold text-[#E6EFFF]">{r.product_name||'Consulta general'}</p><p className="mt-1 text-xs text-[#9FB9E5]">{r.event_type==='product_view'?'Ficha abierta':r.event_type==='options_click'?'Ver opciones':r.event_type==='purchase_click'?'Consulta de compra':r.event_type}{r.channel?' · '+r.channel:''}</p></div><span className="rounded-full border border-[#6398FF]/20 bg-[#3678FF]/15 px-3 py-1 font-black text-[#BBD6FF]">{Number(r.total).toLocaleString('es-AR')}</span></div>)}</div></div>
  </>}
 </div>;
};
