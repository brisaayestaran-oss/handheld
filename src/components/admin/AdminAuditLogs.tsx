import React from 'react';
import { AuditLog } from '../../types/inventory';
import { Clock, ShieldCheck, History } from 'lucide-react';

interface Props {
  logs: AuditLog[];
}

export const AdminAuditLogs: React.FC<Props> = ({ logs }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
          Registro de Auditoría & Trazabilidad
        </h2>
        <p className="text-xs text-[#C8CAD1]/70">
          Bitácora inmutable de todas las operaciones realizadas sobre consolas, ventas y precios.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-[#101115] border border-white/[0.1] space-y-3">
        {logs.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#C8CAD1]/50 font-mono-tech">
            Aún no se han registrado eventos de auditoría.
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {logs.map((log) => (
              <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold bg-[#3678FF]/15 text-[#3678FF]">
                    {log.action}
                  </span>
                  <span className="text-white font-medium">{log.details}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono-tech text-white/40">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(log.timestamp).toLocaleString()}</span>
                  <span>· {log.user}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
