import type { Product } from '../types/catalog';
import { ALL_SHEET_CATALOG, STOCK_CATALOG } from './stockCatalog';

export interface SheetStockState {
  products: Product[];
  soldCount: number;
  fetchedAt: string;
}

export const SHEET_EDIT_URL = 'https://docs.google.com/spreadsheets/d/1V0-MULRJHLhf6AEQVDHlecSivd1bv4Pu66Pp3PfPIlc/edit?gid=0#gid=0';

export async function fetchCatalogFromSheet(): Promise<SheetStockState> {
  const response = await fetch('/api/stock?t=' + Date.now(), { cache: 'no-store' });
  if (!response.ok) throw new Error('No pudimos leer el stock de Google Sheets');
  const data = await response.json() as {
    rows: { row: number; model: string; status: string; priceARS: number }[];
    fetchedAt: string;
  };
  if (!Array.isArray(data.rows) || data.rows.length !== ALL_SHEET_CATALOG.length) {
    throw new Error('La respuesta del inventario está incompleta');
  }
  const rows = new Map(data.rows.map(r => [r.row, r]));
  const photos = await import('../lib/productPhotos').then(m => m.getProductPhotos()).catch(() => ({} as Record<number,string[]>));
  const products = ALL_SHEET_CATALOG.flatMap(product => {
    const rowNumber = Number(product.id.split('-').at(-1));
    const current = rows.get(rowNumber);
    if (!current || current.status.trim().toLowerCase() !== 'en stock') return [];
    if (!Number.isFinite(current.priceARS) || current.priceARS <= 0) return [];
    return [{
      ...product,
      model: current.model,
      subtitle: current.model,
      shortDescription: current.model + '. Equipo usado; confirmá estado y accesorios antes de comprar.',
      realPhotos: photos[rowNumber] ?? [],
      variants: product.variants.map(v => ({ ...v, priceARSApprox: current.priceARS, inStock: true })),
      badge: 'En stock'
    }];
  });
  return { products, soldCount: data.rows.length - products.length, fetchedAt: data.fetchedAt };
}

export const FALLBACK_STOCK: SheetStockState = {
  products: STOCK_CATALOG,
  soldCount: ALL_SHEET_CATALOG.length - STOCK_CATALOG.length,
  fetchedAt: ''
};
