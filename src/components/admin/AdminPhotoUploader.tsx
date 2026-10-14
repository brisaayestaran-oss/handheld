import React from 'react';
import { ArrowDown, ArrowUp, Camera, Check, ImagePlus, Star, Trash2, RefreshCw } from 'lucide-react';
import { listProductPhotos, uploadProductPhoto, reorderProductPhotos, deleteProductPhoto, type ProductPhoto } from '../../lib/productPhotos';
import type { Product } from '../../types/catalog';

export function AdminPhotoUploader({ product }: { product: Product }) {
 const [photos,setPhotos]=React.useState<ProductPhoto[]>([]);
 const [busy,setBusy]=React.useState(false);
 const [loading,setLoading]=React.useState(true);
 const [status,setStatus]=React.useState('');
 const row=Number(product.id.split('-').at(-1));
 const refresh=React.useCallback(async()=>{
  setLoading(true);
  try {setPhotos(await listProductPhotos(row));}
  catch(e){setStatus(e instanceof Error?e.message:'No se pudieron consultar las fotos');}
  finally {setLoading(false);}
 },[row]);
 React.useEffect(()=>{void refresh();},[refresh]);
 async function upload(files:FileList|null){
  if(!files?.length)return;
  setBusy(true);setStatus('');
  try {for(const file of Array.from(files))await uploadProductPhoto(row,file);
   await refresh();setStatus('Fotos guardadas. La primera es la portada de la tienda.');
  }catch(e){setStatus(e instanceof Error?e.message:'No se pudo cargar');}
  finally{setBusy(false);}
 }
 async function move(index:number,target:number){
  if(target<0||target>=photos.length||busy)return;
  setBusy(true);setStatus('');
  try {const next=[...photos];[next[index],next[target]]=[next[target],next[index]];
   await reorderProductPhotos(row,next.map(p=>p.id));setPhotos(next);setStatus('Orden guardado.');}
  catch(e){setStatus(e instanceof Error?e.message:'No se pudo guardar el orden');await refresh();}
  finally{setBusy(false);}
 }
 async function asCover(index:number){
  if(index===0||busy)return;
  setBusy(true);setStatus('');
  try {const next=[photos[index],...photos.filter((_,i)=>i!==index)];
   await reorderProductPhotos(row,next.map(p=>p.id));setPhotos(next);setStatus('Nueva portada guardada.');}
  catch(e){setStatus(e instanceof Error?e.message:'No se pudo guardar la portada');await refresh();}
  finally{setBusy(false);}
 }
 async function remove(photo:ProductPhoto){
  if(!window.confirm('¿Eliminar esta foto de la tienda?'))return;
  setBusy(true);setStatus('');
  try{await deleteProductPhoto(photo);await refresh();setStatus('Foto eliminada.');}
  catch(e){setStatus(e instanceof Error?e.message:'No se pudo eliminar');}
  finally{setBusy(false);}
 }
 return <div className="mt-5 rounded-2xl border border-[#3678FF]/25 bg-gradient-to-br from-[#152448]/80 to-[#0A1120] p-4 sm:p-5 space-y-4">
  <div className="flex flex-wrap items-center justify-between gap-3">
   <div><h3 className="flex items-center gap-2 font-bold text-white"><Camera size={19} className="text-[#80AEFF]"/> Galería de esta unidad</h3>
   <p className="text-xs text-[#ABBDDF] mt-1">La primera imagen es la portada. Usá las flechas o elegí una nueva.</p></div>
   <button type="button" aria-label="Actualizar fotos" onClick={()=>void refresh()} disabled={busy||loading} className="p-2.5 rounded-xl border border-white/15 text-[#C5D6FA] hover:bg-white/10"><RefreshCw size={17}/></button>
  </div>
  <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#6193FF]/45 bg-[#3678FF]/10 px-3 py-5 text-center text-white hover:border-[#8DB5FF] hover:bg-[#3678FF]/20 transition-colors">
   <ImagePlus size={26} className="text-[#A4C8FF]"/>
   <strong className="text-sm">{busy?'Guardando…':'Agregar fotografías reales'}</strong>
   <span className="text-xs text-[#B8C8E7]">Seleccioná varias fotos · JPG, PNG o WebP · hasta 5 MB cada una</span>
   <input type="file" multiple accept="image/jpeg,image/png,image/webp" disabled={busy} className="sr-only" onChange={e=>{void upload(e.currentTarget.files);e.currentTarget.value='';}}/>
  </label>
  {loading ? <p className="text-sm text-[#B7C8E5]">Cargando galería…</p> : photos.length===0 ? <div className="rounded-xl bg-white/5 p-5 text-center text-sm text-[#B7C8E5]">Todavía no hay fotografías reales. Subí la primera para crear la portada.</div> :
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
   {photos.map((photo,index)=><div key={photo.id} className={`relative overflow-hidden rounded-xl border ${index===0?'border-[#77ACFF] shadow-[0_0_0_1px_rgba(119,172,255,.55)]':'border-white/15'} bg-[#081124]`}>
    <div className="relative aspect-[4/3]">
     <img src={photo.url} alt={`Foto real ${index+1} de ${product.name}`} className="h-full w-full object-cover"/>
     <span className={`absolute top-2 left-2 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${index===0?'bg-[#3678FF] text-white':'bg-black/75 text-white'}`}>{index===0?<><Star size={12} fill="currentColor"/> PORTADA</>:`FOTO ${index+1}`}</span>
    </div>
    <div className="flex flex-wrap gap-1.5 p-2">
     <button disabled={busy||index===0} onClick={()=>void asCover(index)} className="flex-1 min-w-0 rounded-lg bg-[#3678FF]/25 px-2 py-2 text-[11px] font-semibold text-[#D2E3FF] disabled:opacity-40">Portada</button>
     <button title="Mover antes" aria-label="Mover antes" disabled={busy||index===0} onClick={()=>void move(index,index-1)} className="rounded-lg bg-white/10 p-2 disabled:opacity-30"><ArrowUp size={15}/></button>
     <button title="Mover después" aria-label="Mover después" disabled={busy||index===photos.length-1} onClick={()=>void move(index,index+1)} className="rounded-lg bg-white/10 p-2 disabled:opacity-30"><ArrowDown size={15}/></button>
     <button title="Eliminar foto" aria-label="Eliminar foto" disabled={busy} onClick={()=>void remove(photo)} className="rounded-lg bg-red-500/15 p-2 text-red-300 disabled:opacity-30"><Trash2 size={15}/></button>
    </div>
   </div>)}
  </div>}
  {status&&<p role="status" className="flex items-center gap-2 rounded-lg bg-[#3678FF]/15 p-3 text-xs text-[#D1E2FF]"><Check size={15}/>{status}</p>}
 </div>;
}
