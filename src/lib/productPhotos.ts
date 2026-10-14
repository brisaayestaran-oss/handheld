import { getSupabaseClient } from './supabase';
const BUCKET='handheld-photos';
export interface ProductPhoto { id:number; row:number; path:string; url:string; order:number }
export async function listProductPhotos(row?:number):Promise<ProductPhoto[]>{
 const c=getSupabaseClient();if(!c)throw Error('Supabase no configurado');
 let q=c.from('handheld_product_photos').select('id,sheet_row,storage_path,display_order').order('display_order',{ascending:true}).order('id',{ascending:true});
 if(row)q=q.eq('sheet_row',row);
 const {data,error}=await q;if(error)throw error;
 return (data??[]).map(p=>({id:p.id,row:p.sheet_row,path:p.storage_path,order:p.display_order??999,url:c.storage.from(BUCKET).getPublicUrl(p.storage_path).data.publicUrl}));
}
export async function getProductPhotos():Promise<Record<number,string[]>> {
 const photos=await listProductPhotos();const result:Record<number,string[]>={};
 for(const p of photos)(result[p.row]??=[]).push(p.url);
 return result;
}
export async function uploadProductPhoto(row:number,file:File):Promise<void>{
 const c=getSupabaseClient();if(!c)throw Error('Supabase no configurado');
 if(![13,14,15,16,17,18].includes(row))throw Error('Unidad inválida');
 if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>5*1024*1024)throw Error('Usá JPG, PNG o WebP de hasta 5 MB');
 const {data:{user}}=await c.auth.getUser();if(!user)throw Error('Iniciá sesión primero');
 const previous=await listProductPhotos(row);
 const path=row+'/'+crypto.randomUUID()+'.'+(file.type==='image/png'?'png':file.type==='image/webp'?'webp':'jpg');
 const {error:uploadError}=await c.storage.from(BUCKET).upload(path,file,{contentType:file.type,upsert:false});
 if(uploadError)throw uploadError;
 const {error:dbError}=await c.from('handheld_product_photos').insert({sheet_row:row,storage_path:path,display_order:previous.length?Math.max(...previous.map(p=>p.order))+1:0});
 if(dbError){await c.storage.from(BUCKET).remove([path]);throw dbError;}
}
export async function reorderProductPhotos(row:number,orderedIds:number[]):Promise<void>{
 const c=getSupabaseClient();if(!c)throw Error('Supabase no configurado');
 const current=await listProductPhotos(row);
 if(current.length!==orderedIds.length||current.some(p=>!orderedIds.includes(p.id)))throw Error('El listado cambió. Actualizá las fotos.');
 for(let i=0;i<orderedIds.length;i++){
  const {error}=await c.from('handheld_product_photos').update({display_order:i}).eq('id',orderedIds[i]).eq('sheet_row',row);
  if(error)throw error;
 }
}
export async function deleteProductPhoto(photo:ProductPhoto):Promise<void>{
 const c=getSupabaseClient();if(!c)throw Error('Supabase no configurado');
 const {error:storageError}=await c.storage.from(BUCKET).remove([photo.path]);
 if(storageError)throw storageError;
 const {error}=await c.from('handheld_product_photos').delete().eq('id',photo.id);
 if(error)throw error;
}
