import {strict as assert} from 'node:assert';
import {fetchCatalogFromSheet} from '../src/data/liveCatalog.ts';
import {fetchLiveSheetRows} from '../api/stock.ts';

const base = [
  {row:15,name:'Steam Deck',description:'Steam Deck LCD',model:'512gb LCD + Pseudo completa (Se incluyo SD 512gb)',status:'En stock',priceARS:1300000},
  {row:16,name:'Legion Go',description:'Legion con accesorios',model:'512gb Z1 Extreme + Completa (Se incluyeron Adaptadores y funda)',status:'En stock',priceARS:1200000},
  {row:17,name:'Legion Go',description:'Otra Legion',model:'512gb Z1 Extreme + Completa',status:'En stock',priceARS:1400000},
  {row:18,name:'Steam Deck',description:'Agotada',model:'256gb LCD + Completa',status:'Agotado',priceARS:0}
];
const response = rows => new Response(JSON.stringify({rows,fetchedAt:'2026-11-14T12:00:00Z'}),{headers:{'Content-Type':'application/json'}});
globalThis.fetch = async () => response(base);
const first = await fetchCatalogFromSheet();
assert.equal(first.products.length,3);
assert.equal(first.soldCount,1);
assert.equal(first.products[1].photoStorageRow,15,'Las fotos antiguas deben seguir vinculadas a la unidad correcta');
assert.notEqual(first.products[2].photoStorageRow,15,'La consola nueva no debe heredar fotos de otra');
assert.equal(first.products[0].variants[0].priceARSApprox,1300000);
assert.match(first.products[1].packageDetails,/Adaptadores y funda/);

const shifted = base.map(r=>({...r,row:r.row+3}));
globalThis.fetch = async () => response(shifted);
const afterInsertion = await fetchCatalogFromSheet();
assert.deepEqual(afterInsertion.products.map(p=>p.id),first.products.map(p=>p.id),'Las inserciones no deben cambiar IDs únicos');

const duplicate = [...base,{...base[2],row:19,description:'Otra unidad igual'}];
globalThis.fetch = async () => response(duplicate);
const repeated = await fetchCatalogFromSheet();
assert.equal(repeated.products.length,4);
assert.notEqual(repeated.products[2].id,repeated.products[3].id);
assert.equal(repeated.products[2].photoStorageRow,undefined,'No asociar fotos ambiguas');
assert.equal(repeated.products[3].photoStorageRow,undefined,'No asociar fotos ambiguas');
assert.notEqual(repeated.products[2].variants[0].sku,repeated.products[3].variants[0].sku);

const csv = [
  ['Nombre del articulo','Descripción','Tipo','Modelo','Comprado a:','Precio publicado','Fecha posteada','Estado'].join(','),
  ['Steam Deck','Agotada','Handheld','256gb LCD + Completa','-', '', '-','Agotado'].join(','),
  ['Steam Deck','Disponible','Handheld','512gb LCD + Completa','-','1200000','-','En stock'].join(',')
].join('\n');
globalThis.fetch = async () => new Response(csv,{status:200});
const parsed = await fetchLiveSheetRows();
assert.equal(parsed.length,2);
assert.equal(parsed[0].priceARS,0);
assert.equal(parsed[1].priceARS,1200000);

// La Legion Go personal del Excel se vende aunque su Tipo sea Servicio.
const serviceCsv = [
  ['Nombre del articulo','Descripción','Tipo','Modelo','Comprado a:','Precio publicado','Fecha posteada','Estado'].join(','),
  ['Legion Go','Uso personal','Servicio','512gb Z1 Extreme + Completa (Se incluyeron Adaptadores)','800000','1200000','','En stock'].join(','),
  ['Servicio técnico','Reparación','Servicio','Reparación general','0','15000','','En stock'].join(','),
  ['Legion Go','Otra unidad de servicio','Servicio','512gb Z1 Extreme + Completa','800000','1400000','','En stock'].join(',')
].join(String.fromCharCode(10));
globalThis.fetch = async () => new Response(serviceCsv,{status:200});
const serviceRows = await fetchLiveSheetRows();
assert.equal(serviceRows.length,1,'Solo incluir la Legion Go personal, no otros Servicios');
assert.equal(serviceRows[0].name,'Legion Go');
assert.equal(serviceRows[0].priceARS,1200000);
console.log('PASS: stock, inserciones, fotos, duplicados y agotados sin precio');
