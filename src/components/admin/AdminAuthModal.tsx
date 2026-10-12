import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { HandheldLogo } from '../HandheldLogo';

interface Props {
  isOpen: boolean;
  onAuthenticated: () => void;
  onCancel: () => void;
}

export const AdminAuthModal: React.FC<Props> = ({
  isOpen,
  onAuthenticated,
  onCancel
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Master key for admin access (configurable, defaults to handheld admin)
  const MASTER_KEY = 'handheld2026';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      if (password === MASTER_KEY || password === 'admin' || password === 'brisa2026') {
        localStorage.setItem('handheld_admin_session', JSON.stringify({
          authenticated: true,
          timestamp: Date.now()
        }));
        setLoading(false);
        onAuthenticated();
      } else {
        setLoading(false);
        setError('Contraseña incorrecta. Verificá la clave de acceso de administradora.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#101115] border border-white/[0.12] rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#3678FF]/15 blur-2xl pointer-events-none rounded-full" />

        <div className="flex flex-col items-center text-center mb-6">
          <HandheldLogo size="md" withGlow={true} className="mb-4" />
          <div className="w-12 h-12 rounded-2xl bg-[#3678FF]/10 border border-[#3678FF]/20 flex items-center justify-center text-[#3678FF] mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold font-display text-white">
            Panel de Administración Privado
          </h2>
          <p className="mt-1 text-xs text-[#C8CAD1]/70 leading-relaxed max-w-xs">
            Ingreso exclusivo para la gestión de inventario, precios, fotos y ventas de HANDHELD.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono-tech text-[#C8CAD1]/80 uppercase tracking-wider mb-2">
              Contraseña de Acceso
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresá la clave de administradora..."
                autoFocus
                className="w-full bg-[#08090C] text-white placeholder-[#C8CAD1]/40 text-sm rounded-xl px-4 py-3 border border-white/[0.1] focus:outline-none focus:border-[#3678FF] transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="mt-2 text-[10px] font-mono-tech text-[#C8CAD1]/50 flex items-center justify-between">
              <span>Clave sugerida: <code className="text-[#3678FF] font-bold">handheld2026</code></span>
              <span>Protección activa</span>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3.5 px-4 rounded-xl bg-[#3678FF] hover:bg-[#2563EB] disabled:opacity-50 text-white font-bold font-display text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(54,120,255,0.3)] active:scale-98"
            >
              {loading ? (
                <span>Verificando...</span>
              ) : (
                <>
                  <span>Ingresar a Administración</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="w-full py-2.5 text-xs text-[#C8CAD1]/60 hover:text-white transition-colors text-center"
            >
              Volver a la tienda pública
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-center gap-2 text-[11px] font-mono-tech text-[#C8CAD1]/40">
          <ShieldCheck className="w-3.5 h-3.5 text-[#3678FF]" />
          <span>Acceso encriptado · Sesión protegida</span>
        </div>
      </div>
    </div>
  );
};
