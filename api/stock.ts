import type { IncomingMessage, ServerResponse } from 'node:http';
import { fetchLiveSheetRows } from '../server/sheetFeed';

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  try {
    const rows = await fetchLiveSheetRows();
    res.statusCode = 200;
    res.end(JSON.stringify({ rows, fetchedAt: new Date().toISOString() }));
  } catch (error) {
    console.error('Error de sincronización de planilla:', error);
    res.statusCode = 503;
    res.end(JSON.stringify({ error: 'No se pudo consultar la planilla.' }));
  }
}
