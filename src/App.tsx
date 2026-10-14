/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense } from 'react';
import { PRODUCTS } from './data/products';
import { STOCK_CATALOG } from './data/stockCatalog';
import { fetchCatalogFromSheet } from './data/liveCatalog';
import { recordInterest } from './services/interestAnalytics';
import { Product } from './types/catalog';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SteamDeckShowcaseSection } from './components/SteamDeckShowcaseSection';
import { ConsoleComparisonSection } from './components/ConsoleComparisonSection';
import { CatalogSection } from './components/CatalogSection';
import { BrandStorySection } from './components/BrandStorySection';
import { SocialSection } from './components/SocialSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
const AdminLayout = React.lazy(() => import('./components/admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminAuthModal = React.lazy(() => import('./components/admin/AdminAuthModal').then(m => ({ default: m.AdminAuthModal })));

export default function App() {
  // Cada consola en stock se muestra como unidad independiente según Google Sheets.
  // La sincronización con Supabase se implementará cuando exista inventario verificado allí.
  const [products, setProducts] = useState<Product[]>([]);
  const [stockFetchedAt, setStockFetchedAt] = useState('');
  const [soldCount, setSoldCount] = useState(0);
  const [stockWarning, setStockWarning] = useState('');

  useEffect(() => {
    let active = true;
    const sync = async () => {
      try {
        const result = await fetchCatalogFromSheet();
        if (!active) return;
        setProducts(result.products);
        setSoldCount(result.soldCount);
        setStockFetchedAt(result.fetchedAt);
        setStockWarning('');
      } catch (error) {
        if (active) {
          setProducts([]);
          setSoldCount(0);
          setStockFetchedAt('');
          setStockWarning('Inventario temporalmente no disponible. Consultá stock y precio por WhatsApp.');
        }
        console.warn('Stock de Google Sheets:', error);
      }
    };
    void sync();
    const interval = window.setInterval(() => { void sync(); }, 60000);
    const onVisibility = () => { if (document.visibilityState === 'visible') void sync(); };
    document.addEventListener('visibilitychange', onVisibility);
    return () => { active = false; window.clearInterval(interval); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);

  // Admin routing state
  const [viewMode, setViewMode] = useState<'public' | 'admin'>(() => {
    return window.location.hash === '#admin' || window.location.pathname === '/admin'
      ? 'admin'
      : 'public';
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  useEffect(() => {
    let mounted = true;
    void import('./lib/supabase').then(async ({ getSupabaseClient }) => {
      const client = getSupabaseClient();
      if (!client) return;
      const { data: { user } } = await client.auth.getUser();
      if (!user) return;
      const { data: admin, error } = await client.from('handheld_admins').select('user_id').eq('user_id', user.id).maybeSingle();
      if (mounted && !error && admin) setIsAdminAuthenticated(true);
    });
    return () => { mounted = false; };
  }, []);

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  // Sync route with browser history
  useEffect(() => {
    const handleHashOrPop = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setViewMode('admin');
      } else {
        setViewMode('public');
      }
    };

    window.addEventListener('hashchange', handleHashOrPop);
    window.addEventListener('popstate', handleHashOrPop);
    return () => {
      window.removeEventListener('hashchange', handleHashOrPop);
      window.removeEventListener('popstate', handleHashOrPop);
    };
  }, []);

  // Update hash when viewMode changes
  useEffect(() => {
    if (viewMode === 'admin') {
      if (window.location.hash !== '#admin') {
        window.location.hash = 'admin';
      }
      if (!isAdminAuthenticated) {
        setShowAuthModal(true);
      }
    } else {
      if (window.location.hash === '#admin') {
        window.location.hash = '';
      }
      setShowAuthModal(false);
    }
  }, [viewMode, isAdminAuthenticated]);

  // Flagship products for editorial showcases
  const steamDeckOled = products.find((p) => p.id === 'steam-deck-oled') || PRODUCTS.find((p) => p.id === 'steam-deck-oled')!;
  const steamDeckLcd = products.find((p) => p.brand === 'Valve' && p.name.toLowerCase().includes('lcd')) || PRODUCTS.find((p) => p.id === 'steam-deck-lcd-refurbished')!;
  const legionGo = products.find((p) => p.brand === 'Lenovo') || PRODUCTS.find((p) => p.id === 'lenovo-legion-go')!;

  const handleOpenProduct = (product: Product, variantIndex: number = 0) => {
    recordInterest('product_view', { id: product.variants[variantIndex]?.sku || product.id, name: product.name, capacity: product.variants[variantIndex]?.capacity });
    setSelectedProduct(product);
    setSelectedVariantIndex(variantIndex);
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If in admin mode and authenticated, render AdminLayout
  if (viewMode === 'admin' && isAdminAuthenticated) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#050507] text-white flex items-center justify-center">Cargando administración…</div>}><AdminLayout
        publicProducts={products}
        soldCount={soldCount}
        stockFetchedAt={stockFetchedAt}
        stockWarning={stockWarning}
        onExitAdmin={() => {
          setViewMode('public');
          setIsAdminAuthenticated(false);
          window.location.hash = '';
        }}
      /></Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[#050A15] [background-image:radial-gradient(ellipse_65%_18%_at_82%_17%,rgba(45,83,174,0.11),transparent),radial-gradient(ellipse_72%_20%_at_15%_60%,rgba(46,88,174,0.08),transparent)] text-white selection:bg-[#3678FF]/30 selection:text-white flex flex-col justify-between">
      {/* Top Floating Navigation */}
      <Navbar
        onOpenCatalog={scrollToCatalog}
        onOpenAdmin={() => { window.location.hash = 'admin'; setViewMode('admin'); setShowAuthModal(true); }}
      />

      {/* Main Content Sections */}
      {stockWarning && <div role="status" className="relative z-40 mt-24 px-5 text-center text-xs text-amber-200">{stockWarning}</div>}
      <main className="relative flex-1 bg-transparent">
        {/* Luces compartidas por TODA la página: atraviesan los limites entre secciones sin cortes. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-[18%] top-[17%] h-[1100px] w-[90%] rounded-full bg-[#254B9B]/[0.075] blur-[180px]" />
          <div className="absolute -right-[20%] top-[38%] h-[1250px] w-[95%] rounded-full bg-[#47318E]/[0.09] blur-[190px]" />
          <div className="absolute -left-[22%] top-[65%] h-[1300px] w-[95%] rounded-full bg-[#2457AB]/[0.075] blur-[200px]" />
          <div className="absolute -right-[18%] top-[87%] h-[1000px] w-[85%] rounded-full bg-[#284A9B]/[0.07] blur-[190px]" />
        </div>
        {/* Section 1: Hero Inmersivo with Protagonist Video */}
        <Hero onExplore={scrollToCatalog} />

        {/* El catálogo es lo primero que aparece después de la portada. */}
        <CatalogSection
          products={products}
          onSelectProduct={handleOpenProduct}
        />

        {/* Comprar directo o solicitar publicación de Mercado Libre, inmediatamente después del catálogo. */}
        <SocialSection />

        {/* Comparación visual compacta de OLED, LCD y Lenovo. */}
        <ConsoleComparisonSection steamDeckProduct={steamDeckOled} steamDeckLcdProduct={steamDeckLcd} legionGoProduct={legionGo} hasOledStock={products.some(p => p.name.toLowerCase().includes('oled') && p.variants.some(v => v.inStock))}
          onSelectProduct={(p) => handleOpenProduct(p, 0)} />

        <SteamDeckShowcaseSection />

        {/* Section 6: Nuestra Marca */}
        <BrandStorySection />

        {/* Section 8: Contacto & Cierre Cinematográfico */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Dedicated Product Detail Sheet / Modal */}
      <ProductDetailModal
        product={selectedProduct}
        initialVariantIndex={selectedVariantIndex}
        onClose={handleCloseProduct}
        onSelectRelated={(p) => handleOpenProduct(p, 0)}
        allProducts={products}
      />

      {/* Admin Authentication Modal */}
      {showAuthModal && <Suspense fallback={null}><AdminAuthModal
        isOpen={showAuthModal}
        onAuthenticated={() => {
          setIsAdminAuthenticated(true);
          setShowAuthModal(false);
          setViewMode('admin');
        }}
        onCancel={() => {
          setShowAuthModal(false);
          setViewMode('public');
          window.location.hash = '';
        }}
      /></Suspense>}

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}