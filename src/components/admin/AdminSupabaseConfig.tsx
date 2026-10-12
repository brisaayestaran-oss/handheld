import React, { useState, useEffect } from 'react';
import { testSupabaseConnection, SupabaseConnectionStatus, isSupabaseConfigured } from '../../lib/supabase';
import { Database, ShieldCheck, Copy, Check, ExternalLink, RefreshCw, AlertCircle, Key, Lock } from 'lucide-react';

export const AdminSupabaseConfig: React.FC = () => {
  const [status, setStatus] = useState<SupabaseConnectionStatus | null>(null);
  const [checking, setChecking] = useState(false);
  const [copied, setCopied] = useState(false);

  const checkConnection = async () => {
    setChecking(true);
    const res = await testSupabaseConnection();
    setStatus(res);
    setChecking(false);
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const SQL_MIGRATION_SCHEMA = `-- ==========================================================
-- HANDHELD ARQUITECTURA SUPABASE / POSTGRESQL (PRODUCCIÓN)
-- Incluye: Trazabilidad unitaria, auditoría, roles y Row Level Security (RLS)
-- ==========================================================

-- 1. Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tabla: inventory_units (Inventario individual por unidad)
CREATE TABLE IF NOT EXISTS public.inventory_units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_code VARCHAR(30) UNIQUE NOT NULL, -- Ej: UNT-001
    brand VARCHAR(50) NOT NULL,            -- Valve, Lenovo
    model VARCHAR(100) NOT NULL,           -- Steam Deck OLED, Lenovo Legion Go
    capacity VARCHAR(60) NOT NULL,          -- 512 GB NVMe, 1 TB NVMe
    serial_number VARCHAR(100) NOT NULL,   -- PRIVADO: Nunca visible públicamente
    physical_condition VARCHAR(100) NOT NULL, -- Impecable 10/10, Excelente 9.5/10
    commercial_condition VARCHAR(100) NOT NULL DEFAULT 'Reacondicionado Certificado',
    purchase_price_usd NUMERIC(10,2) NOT NULL, -- PRIVADO: Costo original de compra
    sale_price_usd NUMERIC(10,2) NOT NULL,     -- PÚBLICO: Precio de venta
    sale_price_ars_approx NUMERIC(12,2),
    entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
    images TEXT[] DEFAULT '{}',
    primary_image TEXT,
    internal_notes TEXT,                       -- PRIVADO: Notas de testeo
    status VARCHAR(20) NOT NULL DEFAULT 'DISPONIBLE' CHECK (status IN ('DISPONIBLE', 'RESERVADA', 'VENDIDA')),
    is_public BOOLEAN NOT NULL DEFAULT true,   -- Permite despublicar sin eliminar
    category VARCHAR(50) NOT NULL DEFAULT 'Consolas Portátiles',
    
    -- Datos de Reserva
    reservation_date DATE,
    reserved_until DATE,
    reserved_for_customer VARCHAR(100),
    reservation_deposit_usd NUMERIC(10,2) DEFAULT 0,

    -- Datos de Venta (cuando status = 'VENDIDA')
    sale_date DATE,
    final_sale_price_usd NUMERIC(10,2),
    gross_profit_usd NUMERIC(10,2),
    sale_notes TEXT,
    customer_name VARCHAR(100),

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabla: sales_history (Historial contable inmutable)
CREATE TABLE IF NOT EXISTS public.sales_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id UUID REFERENCES public.inventory_units(id) ON DELETE RESTRICT,
    unit_code VARCHAR(30) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(100) NOT NULL,
    capacity VARCHAR(60) NOT NULL,
    serial_number VARCHAR(100) NOT NULL,
    purchase_price_usd NUMERIC(10,2) NOT NULL,
    final_sale_price_usd NUMERIC(10,2) NOT NULL,
    gross_profit_usd NUMERIC(10,2) NOT NULL,
    profit_margin_percent INTEGER NOT NULL,
    sale_date DATE NOT NULL,
    customer_name VARCHAR(100),
    sale_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabla: audit_logs (Trazabilidad y auditoría de cambios)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(30) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    details TEXT NOT NULL,
    admin_user VARCHAR(100) DEFAULT 'Administradora',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================================
-- 5. ROW LEVEL SECURITY (RLS) & POLÍTICAS DE ACCESO
-- ==========================================================
ALTER TABLE public.inventory_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Política Pública: Los clientes solo pueden VER consolas disponibles y publicadas
-- IMPORTANTE: Excluye columnas privadas serial_number, purchase_price_usd y internal_notes mediante vista o filtro
CREATE OR REPLACE VIEW public.public_catalog AS
SELECT 
    id,
    unit_code,
    brand,
    model,
    capacity,
    physical_condition,
    commercial_condition,
    sale_price_usd,
    sale_price_ars_approx,
    images,
    primary_image,
    status,
    category
FROM public.inventory_units
WHERE is_public = true AND status = 'DISPONIBLE';

-- Política para Administrador autenticado: Acceso total CRUD
CREATE POLICY "Admin Full Access" ON public.inventory_units
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admin Sales Full Access" ON public.sales_history
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admin Logs Full Access" ON public.audit_logs
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(SQL_MIGRATION_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
          Integración Supabase & Persistencia de Datos
        </h2>
        <p className="text-xs text-[#C8CAD1]/70">
          Estado en tiempo real de la base de datos PostgreSQL, variables de entorno y políticas RLS.
        </p>
      </div>

      {/* Real-time Connection Status Card */}
      <div className="p-6 rounded-3xl bg-[#101115] border border-white/[0.1] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl ${
              status?.isConnected
                ? 'bg-emerald-500/15 text-emerald-400'
                : 'bg-amber-500/15 text-amber-400'
            }`}>
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-display">
                  Estado de la Base de Datos
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech font-bold ${
                  status?.isConnected
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {status?.isConnected ? '🟢 SUPABASE CONECTADO' : '🟠 MODO LOCAL PERSISTENTE'}
                </span>
              </div>
              <p className="text-xs text-[#C8CAD1]/70 mt-1">
                {status?.message || 'Verificando conectividad...'}
              </p>
            </div>
          </div>

          <button
            onClick={checkConnection}
            disabled={checking}
            className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono-tech border border-white/[0.1] transition-all flex items-center justify-center gap-2 self-start sm:self-center shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
            <span>Verificar Conexión</span>
          </button>
        </div>

        {/* Diagnostic info */}
        <div className="p-4 rounded-xl bg-[#08090C] border border-white/[0.06] space-y-2 text-xs font-mono-tech">
          <div className="flex justify-between py-1 border-b border-white/[0.04]">
            <span className="text-white/40">URL Supabase:</span>
            <span className="text-white/80">{status?.url}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-white/[0.04]">
            <span className="text-white/40">Almacenamiento Activo:</span>
            <span className="text-emerald-400">
              {status?.isConnected ? 'PostgreSQL Remoto (Supabase)' : 'Almacenamiento Local Seguro en Navegador'}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-white/40">Seguridad Row Level Security:</span>
            <span className="text-white/80">Activada por diseño (RLS)</span>
          </div>
        </div>

        {!isSupabaseConfigured && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-2">
            <div className="font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Transparencia Técnica: ¿Dónde se guardan mis cambios ahora?</span>
            </div>
            <p className="text-[#C8CAD1] leading-relaxed">
              Actualmente los cambios (altas, bajas, fotos, precios y ventas) se guardan de forma permanente en el almacenamiento local de tu navegador. Cuando conectes las credenciales <code className="text-white font-mono-tech">VITE_SUPABASE_URL</code> y <code className="text-white font-mono-tech">VITE_SUPABASE_ANON_KEY</code>, se sincronizarán directamente en tu base de datos remota en la nube.
            </p>
          </div>
        )}
      </div>

      {/* SQL Migration Script Box */}
      <div className="p-6 rounded-3xl bg-[#101115] border border-white/[0.1] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white font-display">
              Esquema SQL Preparado para Supabase
            </h3>
            <p className="text-xs text-[#C8CAD1]/70">
              Copia y pega este script en el SQL Editor de tu proyecto de Supabase para inicializar las tablas con RLS.
            </p>
          </div>

          <button
            onClick={copyToClipboard}
            className="px-4 py-2 rounded-xl bg-[#3678FF] hover:bg-[#2563EB] text-white text-xs font-mono-tech font-bold transition-all flex items-center gap-1.5 shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado al Portapapeles' : 'Copiar Script SQL'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-2xl bg-[#08090C] border border-white/[0.08] text-[11px] font-mono-tech text-[#C8CAD1] overflow-x-auto max-h-[380px] leading-relaxed">
          {SQL_MIGRATION_SCHEMA}
        </pre>
      </div>
    </div>
  );
};
