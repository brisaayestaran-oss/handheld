export type InterestEvent = 'product_view' | 'purchase_click' | 'options_click' | 'capacity_select';
export interface InterestSummary {
  event_type: InterestEvent;
  product_id: string;
  product_name: string;
  channel: string;
  total: number;
}
export function recordInterest(
  type: InterestEvent,
  product?: { id: string; name: string; capacity?: string },
  channel?: 'whatsapp' | 'mercadolibre'
): void {
  if (!product?.id || !product.name) return;
  const payload = {
    event_type: type,
    product_id: product.id.slice(0, 120),
    product_name: [product.name, product.capacity].filter(Boolean).join(' · ').slice(0, 180),
    channel: type === 'purchase_click' ? (channel ?? 'whatsapp') : null
  };
  void import('../lib/supabase').then(({ getSupabaseClient }) => {
    const client = getSupabaseClient();
    if (!client) return;
    void client.from('handheld_interest_events').insert(payload).then(({ error }) => {
      if (error && import.meta.env.DEV) console.warn('Error de registro de interés:', error.message);
    });
  });
}
export async function fetchInterestSummary(days?: number): Promise<InterestSummary[]> {
  const { getSupabaseClient } = await import('../lib/supabase');
  const client = getSupabaseClient();
  if (!client) throw new Error('Supabase sin configurar');
  const since = days ? new Date(Date.now() - days * 86400000).toISOString() : null;
  const { data, error } = await client.rpc('handheld_interest_summary', { p_since: since });
  if (error) throw error;
  return (data ?? []) as InterestSummary[];
}
