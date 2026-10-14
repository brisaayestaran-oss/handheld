import { PRODUCTS } from './products';
import type { Product } from '../types/catalog';

// Inventario público leído de "Inventario Handheld" (Hoja 1, 13/10/2026).
// Cada fila marcada "En stock" es una publicación independiente.
// No se publican los costos de adquisición de la planilla.
// Los precios son los precios publicados en pesos y el stock corresponde a la fecha de la planilla.
const lcd = PRODUCTS.find(p => p.id === 'steam-deck-lcd-refurbished')!;
const legion = PRODUCTS.find(p => p.id === 'lenovo-legion-go')!;

type Listing = {
  base: Product;
  row: number;
  name: string;
  model: string;
  capacity: string;
  price: number;
  details: string;
  highlights: string[];
};

// La fila 16 se reincorporó según el estado actual de la planilla; la 18 continúa agotada.
// El estado definitivo de publicación se consulta en Google Sheets.
const SOLD_ROWS = new Set([18]);
const rows: Listing[] = [
  {
    base: lcd, row: 13, name: 'Steam Deck LCD 512 GB', model: 'LCD 512 GB · estuche y cargador original',
    capacity: '512 GB', price: 1100000,
    details: 'Steam Deck LCD de 512 GB con muy poco uso. La publicación informa batería al 99% de salud, sin detalles estéticos y sin fallas. Incluye estuche original, cargador original y protectores para pads y joysticks. Confirmá el estado y pedí fotografías actuales de esta unidad antes de comprar.',
    highlights: ['Pantalla LCD de 7 pulgadas y 60 Hz', 'Batería al 99% según la publicación del inventario', 'Estuche, cargador original y protectores incluidos']
  },
  {
    base: lcd, row: 14, name: 'Steam Deck LCD 256 GB + SSD de 256 GB', model: 'LCD 256 GB + SSD de 256 GB',
    capacity: '256 GB + SSD de 256 GB', price: 1000000,
    details: 'Steam Deck LCD de 256 GB. La planilla indica además una memoria SD de 256 GB, batería al 97% según la publicación y accesorios: estuche original, cargador de 50 W, funda protectora y protectores para pads y joysticks. Confirmá capacidad interna y memoria adicional con fotografías de la unidad.',
    highlights: ['Pantalla LCD de 7 pulgadas y 60 Hz', 'Batería al 97% según la publicación del inventario', 'Estuche, cargador de 50 W, funda y protectores']
  },
  {
    base: legion, row: 15, name: 'Lenovo Legion Go Z1 Extreme 512 GB', model: '512 GB · caja y accesorios originales',
    capacity: '512 GB SSD', price: 1100000,
    details: 'Lenovo Legion Go original con AMD Ryzen Z1 Extreme, pantalla de 8,8 pulgadas a 144 Hz, 16 GB de RAM y SSD de 512 GB. La publicación indica batería al 100%, vidrio templado, mandos sin drift y Windows 11 restablecido. Incluye caja original, estuche rígido Legion, base FPS, cargador original de 65 W y adaptadores.',
    highlights: ['Ryzen Z1 Extreme, 16 GB RAM y pantalla a 144 Hz', 'Batería 100% según la publicación del inventario', 'Caja, estuche, base FPS, cargador 65 W y adaptadores']
  },
  {
    base: legion, row: 16, name: 'Lenovo Legion Go Z1 Extreme 512 GB', model: '512 GB · funda y adaptadores',
    capacity: '512 GB SSD', price: 1100000,
    details: 'Lenovo Legion Go con Ryzen Z1 Extreme, 16 GB de RAM, pantalla de 8,8 pulgadas a 144 Hz y SSD de 512 GB. La publicación informa batería al 100%, controles sin drift, Windows 11 reinstalado y vidrio templado. Accesorios: funda rígida Legion, funda protectora, base FPS, cargador Lenovo de 65 W y adaptadores.',
    highlights: ['Ryzen Z1 Extreme y pantalla de 8,8 pulgadas', 'Batería 100% según la publicación del inventario', 'Fundas, base FPS, cargador Lenovo 65 W y adaptadores']
  },
  {
    base: legion, row: 17, name: 'Lenovo Legion Go Z1 Extreme 512 GB', model: '512 GB - cargador original',
    capacity: '512 GB SSD', price: 1200000,
    details: 'Lenovo Legion Go oficial con Ryzen Z1 Extreme, pantalla de 8,8 pulgadas a 144 Hz, 16 GB de RAM y SSD de 512 GB. SegÃºn la descripciÃ³n actualizada de la planilla, baterÃ­a al 100%, joysticks sin drift y Windows 11 instalado. Incluye funda rÃ­gida Legion, funda protectora, base FPS y cargador original Lenovo de 65 W. PedÃ­ fotos reales y confirmÃ¡ los accesorios.',
    highlights: ['Ryzen Z1 Extreme con controles desmontables', 'Capacidad inconsistente en el inventario: confirmar antes de comprar', '32 ciclos de batería según la publicación; caja y accesorios']
  },
  {
    base: legion, row: 18, name: 'Lenovo Legion Go Z1 Extreme 1 TB', model: '1 TB · caja completa',
    capacity: '1 TB SSD', price: 1400000,
    details: 'Lenovo Legion Go Z1 Extreme de 1 TB, versiÃ³n estadounidense. SegÃºn la descripciÃ³n actualizada de la planilla incluye caja, cargador, mouse, estuche original, manuales, vidrio templado y protector. La publicaciÃ³n informa 32 ciclos de baterÃ­a y funcionamiento correcto. PedÃ­ fotos reales antes de comprar.',
    highlights: ['Ryzen Z1 Extreme y pantalla de 8,8 pulgadas', 'Almacenamiento 1 TB según inventario', 'Caja completa según planilla; accesorios a confirmar']
  }
];

export const ALL_SHEET_CATALOG: Product[] = rows.map(({ base, row, name, model, capacity, price, details, highlights }, index) => ({
  ...base,
  id: `inventario-hoja1-fila-${row}`,
  name,
  model,
  slug: `unidad-stock-${row}`,
  subtitle: model,
  shortDescription: model + '. Equipo usado de caja abierta y poco uso.',
  fullDescription: details,
  keyHighlights: highlights,
  condition: 'Caja abierta · poco uso',
  availability: 'Disponible Inmediato',
  displayOrder: index + 1,
  badge: 'En stock según inventario',
  variants: [{
    capacity, priceUSD: 0, priceARSApprox: price, inStock: true, sku: `SHEET-ROW-${row}`
  }]
}));

export const STOCK_CATALOG: Product[] = ALL_SHEET_CATALOG.filter(p => !SOLD_ROWS.has(Number(p.id.split('-').at(-1))));
