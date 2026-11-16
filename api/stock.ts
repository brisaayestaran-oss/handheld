import type { IncomingMessage, ServerResponse } from 'node:http';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1V0-MULRJHLhf6AEQVDHlecSivd1bv4Pu66Pp3PfPIlc/gviz/tq?tqx=out:csv&gid=0';
export interface LiveSheetRow {
  row: number;
  name: string;
  description: string;
  model: string;
  status: string;
  priceARS: number;
}

function parseCsv(text: string): string[][] {
  const output: string[][] = [];
  let row: string[] = [], value = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quoted && text[i + 1] === '"') { value += '"'; i++; }
      else quoted = !quoted;
    } else if (c === ',' && !quoted) { row.push(value); value = ''; }
    else if ((c === '\n' || c === '\r') && !quoted) {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(value); value = '';
      if (row.some(cell => cell.trim())) output.push(row);
      row = [];
    } else value += c;
  }
  if (value || row.length) { row.push(value); output.push(row); }
  return output;
}

function parsePublishedPrice(value: string): number {
  const numeric = value.replace(/[^\d.,]/g, '').replace(/,/g, '');
  return Number(numeric);
}

export async function fetchLiveSheetRows(): Promise<LiveSheetRow[]> {
  const response = await fetch(SHEET_URL, { headers: { Accept: 'text/csv' }, signal: AbortSignal.timeout(12000), cache: 'no-store' });
  if (!response.ok) throw new Error('Google Sheets respondió ' + response.status);
  const data = parseCsv(await response.text());
  if (data[0]?.[0]?.trim() !== 'Nombre del articulo' || data[0]?.[7]?.trim() !== 'Estado') {
    throw new Error('Cambió la estructura del inventario. Se detuvo la sincronización.');
  }
  return data.slice(1).flatMap((cells, i) => {
    const row = i + 2;
    const type = cells[2]?.trim().toLowerCase();
    // Esta Legion Go personal se ofrece en la tienda aunque el Excel la clasifique como Servicio.
    const personalLegionForSale = type === 'servicio' &&
      cells[0]?.trim().toLowerCase() === 'legion go' &&
      cells[3]?.trim().toLowerCase() === '512gb z1 extreme + completa (se incluyeron adaptadores)';
    if (type !== 'handheld' && !personalLegionForSale) return [];
    const name = cells[0]?.trim() ?? '';
    const model = cells[3]?.trim() ?? '';
    const status = cells[7]?.trim() ?? '';
    const priceARS = parsePublishedPrice(cells[5] ?? '');
    if (!name || !model || !['en stock', 'agotado'].includes(status.toLowerCase())) return [];
    if (status.toLowerCase() === 'en stock' && (!Number.isFinite(priceARS) || priceARS <= 0)) {
      throw new Error('Precio publicado inválido en fila ' + row);
    }
    return [{ row, name, description: cells[1]?.trim() ?? '', model, status, priceARS }];
  });
}

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  try {
    const rows = await fetchLiveSheetRows();
    res.statusCode = 200;
    res.end(JSON.stringify({ rows, fetchedAt: new Date().toISOString() }));
  } catch (error) {
    console.error('Error leyendo inventario:', error);
    res.statusCode = 503;
    res.end(JSON.stringify({ error: 'No se pudo consultar la planilla.' }));
  }
}
