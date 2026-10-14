import type { IncomingMessage, ServerResponse } from 'node:http';
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1V0-MULRJHLhf6AEQVDHlecSivd1bv4Pu66Pp3PfPIlc/gviz/tq?tqx=out:csv&sheet=Hoja%201';

export interface LiveSheetRow { row: number; model: string; status: string; priceARS: number; }

function parseCsv(text: string): string[][] {
  const output: string[][] = []; let row: string[] = []; let value = ''; let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quoted && text[i + 1] === '"') { value += '"'; i++; } else quoted = !quoted;
    } else if (c === ',' && !quoted) { row.push(value); value = ''; }
    else if ((c === '\n' || c === '\r') && !quoted) {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(value); value = '';
      if (row.some(cell => cell !== '')) output.push(row);
      row = [];
    } else value += c;
  }
  if (value || row.length) { row.push(value); output.push(row); }
  return output;
}

export async function fetchLiveSheetRows(): Promise<LiveSheetRow[]> {
  const response = await fetch(SHEET_URL, { headers: { Accept: 'text/csv' }, signal: AbortSignal.timeout(12000) });
  if (!response.ok) throw new Error('La planilla no respondiÃ³: ' + response.status);
  const data = parseCsv(await response.text());
  if (data[0]?.[0] !== 'Nombre del articulo' || data[0]?.[7] !== 'Estado') {
    throw new Error('CambiÃ³ la estructura de la planilla. SincronizaciÃ³n detenida para evitar errores.');
  }
  return [13, 14, 15, 16, 17, 18].map(row => {
    const cells = data[row - 1];
    if (!cells || cells.length < 8) throw new Error('Falta la fila ' + row + ' del inventario');
    const number = Number(cells[5].replace(/[^0-9.]/g, ''));
    if (!Number.isFinite(number) || number <= 0) throw new Error('Precio invÃ¡lido en fila ' + row);
    return { row, model: cells[3].trim(), status: cells[7].trim(), priceARS: number };
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
    console.error('Error de sincronizaciÃ³n de planilla:', error);
    res.statusCode = 503;
    res.end(JSON.stringify({ error: 'No se pudo consultar la planilla.' }));
  }
}
