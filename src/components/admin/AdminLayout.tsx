import React, { useState, useEffect } from 'react';
import { InventoryUnit, InventoryMetrics, SaleRecord, AuditLog } from '../../types/inventory';
import { inventoryService } from '../../services/inventoryService';
import { AdminDashboard } from './AdminDashboard';
import { AdminInventoryList } from './AdminInventoryList';
import { AdminSalesHistory } from './AdminSalesHistory';
import { AdminSupabaseConfig } from './AdminSupabaseConfig';
import { AdminAuditLogs } from './AdminAuditLogs';
import { AdminUnitFormModal } from './AdminUnitFormModal';
import { SellModal, ReserveModal, RevertSaleModal } from './AdminActionModals';
import { HandheldLogo } from '../HandheldLogo';
import {
  LayoutDashboard,
  Boxes,
  CheckCircle2,
  Database,
  History,
  LogOut,
  ArrowLeft,
  Plus,
  ShieldCheck
} from 'lucide-react';

interface Props {
  onExitAdmin: () => void;
}

export const AdminLayout: React.FC<Props> = ({ onExitAdmin }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'sales' | 'schema' | 'logs'>('dashboard');

  // Live inventory state
  const [units, setUnits] = useState<InventoryUnit[]>([]);
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [metrics, setMetrics] = useState<InventoryMetrics>(inventoryService.getMetrics());

  // Modals state
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<InventoryUnit | null>(null);

  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [sellingUnit, setSellingUnit] = useState<InventoryUnit | null>(null);

  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [reservingUnit, setReservingUnit] = useState<InventoryUnit | null>(null);

  const [isRevertModalOpen, setIsRevertModalOpen] = useState(false);
  const [revertingUnit, setRevertingUnit] = useState<InventoryUnit | null>(null);

  const refreshData = () => {
    setUnits(inventoryService.getAllUnits());
    setSales(inventoryService.getSalesHistory());
    setAuditLogs(inventoryService.getAuditLogs());
    setMetrics(inventoryService.getMetrics());
  };

  useEffect(() => {
    refreshData();
    const unsubscribe = inventoryService.subscribe(refreshData);
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('handheld_admin_session');
    onExitAdmin();
  };

  // Action handlers
  const handleOpenCreateUnit = () => {
    setEditingUnit(null);
    setIsUnitModalOpen(true);
  };

  const handleEditUnit = (unit: InventoryUnit) => {
    setEditingUnit(unit);
    setIsUnitModalOpen(true);
  };

  const handleDeleteUnit = (id: string) => {
    if (window.confirm('¿Seguro que deseás eliminar esta consola del inventario?')) {
      inventoryService.deleteUnit(id);
    }
  };

  const handleToggleVisibility = (id: string) => {
    inventoryService.toggleVisibility(id);
  };

  const handleOpenSellModal = (unit: InventoryUnit) => {
    setSellingUnit(unit);
    setIsSellModalOpen(true);
  };

  const handleConfirmSell = (unitId: string, finalPriceUSD: number, saleDate: string, customerName?: string, notes?: string) => {
    inventoryService.markAsSold(unitId, finalPriceUSD, saleDate, customerName, notes);
  };

  const handleOpenReserveModal = (unit: InventoryUnit) => {
    setReservingUnit(unit);
    setIsReserveModalOpen(true);
  };

  const handleConfirmReserve = (unitId: string, customerName: string, depositUSD: number, reservedUntil?: string) => {
    inventoryService.reserveUnit(unitId, customerName, depositUSD, reservedUntil);
  };

  const handleOpenRevertModal = (unit: InventoryUnit) => {
    setRevertingUnit(unit);
    setIsRevertModalOpen(true);
  };

  const handleConfirmRevert = (unitId: string, reason: string) => {
    inventoryService.revertSale(unitId, reason);
  };

  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory' as const, label: 'Inventario', icon: Boxes, badge: metrics.availableCount },
    { id: 'sales' as const, label: 'Vendidas', icon: CheckCircle2, badge: metrics.soldCount },
    { id: 'schema' as const, label: 'Base de Datos', icon: Database },
    { id: 'logs' as const, label: 'Auditoría', icon: History }
  ];

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col justify-between selection:bg-[#3678FF]/30 pb-20 md:pb-8">
      {/* Top Floating Admin Header */}
      <header className="sticky top-0 z-40 bg-[#08090C]/90 backdrop-blur-2xl border-b border-white/[0.08] px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand & Mode */}
          <div className="flex items-center gap-3">
            <HandheldLogo size="sm" withGlow={true} />
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/[0.1]">
              <span className="text-[11px] font-mono-tech px-2 py-0.5 rounded bg-[#3678FF]/15 text-[#3678FF] font-bold">
                PANEL ADMIN
              </span>
              <span className="text-xs text-white/50">Gestión Privada</span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-[#101115] rounded-xl border border-white/[0.06]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#20232B] text-white shadow-sm border border-white/[0.1]'
                      : 'text-[#C8CAD1]/70 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className={`text-[10px] font-mono-tech px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-[#3678FF] text-white font-bold' : 'bg-white/10 text-white/70'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onExitAdmin}
              className="px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono-tech border border-white/[0.08] transition-colors flex items-center gap-1.5"
              title="Volver a la portada de la web"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ver Tienda</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
              title="Cerrar sesión administrativa"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <AdminDashboard
            metrics={metrics}
            onNavigateToTab={setActiveTab}
            onOpenCreateUnit={handleOpenCreateUnit}
          />
        )}

        {activeTab === 'inventory' && (
          <AdminInventoryList
            units={units}
            onOpenCreate={handleOpenCreateUnit}
            onEditUnit={handleEditUnit}
            onDeleteUnit={handleDeleteUnit}
            onToggleVisibility={handleToggleVisibility}
            onOpenSellModal={handleOpenSellModal}
            onOpenReserveModal={handleOpenReserveModal}
          />
        )}

        {activeTab === 'sales' && (
          <AdminSalesHistory
            sales={sales}
            allUnits={units}
            onOpenRevertModal={handleOpenRevertModal}
          />
        )}

        {activeTab === 'schema' && <AdminSupabaseConfig />}

        {activeTab === 'logs' && <AdminAuditLogs logs={auditLogs} />}
      </main>

      {/* Mobile Bottom Navigation Bar (Ultra-convenient for Smartphone touch use) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#08090C]/95 backdrop-blur-2xl border-t border-white/[0.1] px-2 py-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-mono-tech transition-colors ${
            activeTab === 'dashboard' ? 'text-[#3678FF] font-bold' : 'text-white/60'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Inicio</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-mono-tech transition-colors relative ${
            activeTab === 'inventory' ? 'text-[#3678FF] font-bold' : 'text-white/60'
          }`}
        >
          <Boxes className="w-4 h-4" />
          <span>Stock ({metrics.availableCount})</span>
        </button>

        {/* Quick Add Button */}
        <button
          onClick={handleOpenCreateUnit}
          className="flex flex-col items-center justify-center w-11 h-11 -mt-4 rounded-full bg-[#3678FF] text-white shadow-[0_0_20px_rgba(54,120,255,0.4)] active:scale-95"
          title="Agregar Consola"
        >
          <Plus className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTab('sales')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-mono-tech transition-colors ${
            activeTab === 'sales' ? 'text-purple-400 font-bold' : 'text-white/60'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Vendidas ({metrics.soldCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('schema')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-mono-tech transition-colors ${
            activeTab === 'schema' ? 'text-[#3678FF] font-bold' : 'text-white/60'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Supabase</span>
        </button>
      </div>

      {/* Operational Modals */}
      <AdminUnitFormModal
        isOpen={isUnitModalOpen}
        unit={editingUnit}
        onClose={() => setIsUnitModalOpen(false)}
        onSaved={refreshData}
      />

      <SellModal
        isOpen={isSellModalOpen}
        unit={sellingUnit}
        onClose={() => setIsSellModalOpen(false)}
        onConfirm={handleConfirmSell}
      />

      <ReserveModal
        isOpen={isReserveModalOpen}
        unit={reservingUnit}
        onClose={() => setIsReserveModalOpen(false)}
        onConfirm={handleConfirmReserve}
      />

      <RevertSaleModal
        isOpen={isRevertModalOpen}
        unit={revertingUnit}
        onClose={() => setIsRevertModalOpen(false)}
        onConfirm={handleConfirmRevert}
      />
    </div>
  );
};
