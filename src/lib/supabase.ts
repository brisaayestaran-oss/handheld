import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables for Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey.length > 20
);

let clientInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!clientInstance) {
    try {
      clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true
        }
      });
    } catch (err) {
      console.warn('Error initializing Supabase client:', err);
      return null;
    }
  }
  return clientInstance;
}

export interface SupabaseConnectionStatus {
  isConfigured: boolean;
  isConnected: boolean;
  message: string;
  url: string;
}

export async function testSupabaseConnection(): Promise<SupabaseConnectionStatus> {
  if (!isSupabaseConfigured) {
    return {
      isConfigured: false,
      isConnected: false,
      message: 'Supabase no está configurado aún en las variables de entorno (.env). Los datos se guardan de forma local en el navegador de la administradora.',
      url: supabaseUrl || 'No definida'
    };
  }

  try {
    const client = getSupabaseClient();
    if (!client) {
      throw new Error('No se pudo inicializar el cliente de Supabase.');
    }

    // Ping check with a minimal query to verify network and credentials
    const { error } = await client.from('inventory_units').select('id').limit(1);

    if (error && error.code === '42P01') {
      // Table doesn't exist yet, but connection was authenticated
      return {
        isConfigured: true,
        isConnected: true,
        message: 'Conexión a Supabase establecida correctamente. Las tablas aún no han sido migradas (podés ejecutar el script SQL provisto en la pestaña Esquema).',
        url: supabaseUrl
      };
    }

    if (error) {
      return {
        isConfigured: true,
        isConnected: false,
        message: `Error al consultar Supabase: ${error.message}`,
        url: supabaseUrl
      };
    }

    return {
      isConfigured: true,
      isConnected: true,
      message: 'Conexión a Supabase activa y sincronizada.',
      url: supabaseUrl
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      isConfigured: true,
      isConnected: false,
      message: `Error de red al conectar con Supabase: ${errorMsg}`,
      url: supabaseUrl
    };
  }
}
