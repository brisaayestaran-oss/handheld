import type { Product } from '../types/catalog';
import { PRODUCTS } from './products';

export interface SheetStockState {
  products: Product[];
  soldCount: number;
  fetchedAt: string;
}

interface LiveSheetRow {
  row: number;
  name: string;
  description: string;
  model: string;
  status: string;
  priceARS: number;
}

export const SHEET_EDIT_URL = 'https://docs.google.com/spreadsheets/d/1V0-MULRJHLhf6AEQVDHlecSivd1bv4Pu66Pp3PfPIlc/edit?gid=0#gid=0';

const normalize = (s: string): string => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();

function stablePhotoRow(name: string, model: string): number {
  // Las fotos antiguas se vinculan por identidad de modelo, nunca por posición actual.
  const legacyModels: Array<[number, string]> = [
    [13, '512gb LCD + Pseudo completa (Cargador)'],
    [14, '256gb LCD + Semi completa (Se incluyo SD 256gb)'],
    [15, '512gb Z1 Extreme + Completa (Se incluyeron Adaptadores y funda)'],
    [16, '512gb Z1 Extreme + Estuche'],
    [17, '512gb Z1 Extreme + Pseudo completa (Ugreen + SD 128gb)'],
    [18, '1tb Z1 Extreme + Completa']
  ];
  const legacy = legacyModels.find(([, oldModel]) => normalize(oldModel) === normalize(model));
  if (legacy) return legacy[0];

  // Identificador determinista fuera del rango histórico 13-18; no depende de la fila.
  let hash = 2166136261;
  for (const ch of normalize(name + '|' + model)) {
    hash ^= ch.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return 100000 + ((hash >>> 0) % 1900000000);
}

function toProduct(row: LiveSheetRow, index: number): Product {
  const isLenovo = /legion/i.test(row.name);
  const isOled = /oled/i.test(row.model);
  const baseId = isLenovo ? 'lenovo-legion-go' : isOled ? 'steam-deck-oled' : 'steam-deck-lcd-refurbished';
  const base = PRODUCTS.find(p => p.id === baseId);
  if (!base) throw new Error('No se encontró la plantilla para ' + row.name);
  const capacity = row.model.match(/\b(\d+)\s*(tb|gb)\b/i);
  const label = capacity ? capacity[1] + ' ' + capacity[2].toUpperCase() : row.model;
  const name = isLenovo ? 'Lenovo Legion Go Z1 Extreme ' + label : 'Steam Deck ' + (isOled ? 'OLED ' : 'LCD ') + label;
  const photoStorageRow = stablePhotoRow(row.name, row.model);
  return {
    ...base,
    id: 'inventario-unidad-' + photoStorageRow,
    photoStorageRow,
    name,
    model: row.model,
    subtitle: row.model,
    slug: 'unidad-' + photoStorageRow,
    shortDescription: row.model + '. Consultá el estado y accesorios de esta unidad.',
    fullDescription: row.description || row.model,
    keyHighlights: row.description ? row.description.split(/[\r\n]+/).map(s => s.trim()).filter(Boolean).slice(0, 4) : [row.model],
    displayOrder: index + 1,
    availability: 'Disponible Inmediato',
    badge: 'En stock',
    variants: [{ capacity: label, priceARSApprox: row.priceARS, priceUSD: 0, inStock: true, sku: 'SHEET-UNIT-' + photoStorageRow }]
  };
}

export async function fetchCatalogFromSheet(): Promise<SheetStockState> {
  const response = await fetch('/api/stock?t=' + Date.now(), { cache: 'no-store' });
  if (!response.ok) throw new Error('No pudimos leer el stock de Google Sheets');
  const data = await response.json() as { rows: LiveSheetRow[]; fetchedAt: string };
  if (!Array.isArray(data.rows)) throw new Error('Respuesta inválida del inventario');
  const available = data.rows.filter(r => normalize(r.status) === 'en stock');
  const photos = await import('../lib/productPhotos').then(m => m.getProductPhotos()).catch(() => ({} as Record<number, string[]>));
  const products = available.map((r, index) => {
    const product = toProduct(r, index);
    return { ...product, realPhotos: photos[product.photoStorageRow!] ?? [] };
  });
  return { products, soldCount: data.rows.length - available.length, fetchedAt: data.fetchedAt };
}
