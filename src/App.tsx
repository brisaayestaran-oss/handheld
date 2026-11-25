/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { PRODUCTS } from './data/products';
import { STOCK_CATALOG } from './data/stockCatalog';
import { fetchCatalogFromSheet, fetchCatalogPhotos } from './data/liveCatalog';
import { recordInterest } from './services/interestAnalytics';
import { Product } from './types/catalog';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SteamDeckShowcaseSection } from './components/SteamDeckShowcaseSection';
import { FeatureHighlightsSection } from './components/FeatureHighlightsSection';
import { ConsoleComparisonSection } from './components/ConsoleComparisonSection';
import { CatalogSection } from './components/CatalogSection';
import { BrandStorySection, FollowUsSection } from './components/BrandStorySection';
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
  const [stockLoading, setStockLoading] = useState(true);
  const [catalogBrand, setCatalogBrand] = useState<'Todas' | 'Valve' | 'Lenovo'>('Todas');

  useEffect(() => {
    let active = true;
    const sync = async () => {
      try {
        const result = await fetchCatalogFromSheet();
        if (!active) return;
        setProducts(current => result.products.map(product => ({
          ...product,
          realPhotos: current.find(previous => previous.id === product.id)?.realPhotos ?? []
        })));
        setSoldCount(result.soldCount);
        setStockFetchedAt(result.fetchedAt);
        setStockWarning('');
        setStockLoading(false);
        // Supabase es opcional para la ficha: la galería se agrega cuando responde.
        void fetchCatalogPhotos().then(photos => {
          if (!active) return;
          setProducts(current => current.map(product => ({
            ...product,
            realPhotos: photos[product.photoStorageRow ?? 0] ?? []
          })));
        }).catch(error => console.warn('Fotos del catálogo:', error));
      } catch (error) {
        if (active) {
          // Una falla temporal no debe borrar las unidades que ya se mostraban.
          // La consulta anterior se conserva, pero queda visiblemente sin confirmar.
          setStockWarning('No se pudo actualizar el inventario. Los datos visibles son de la última consulta exitosa; confirmá disponibilidad por WhatsApp.');
          setStockLoading(false);
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
  const productOpenScrollY = useRef(0);
  const productOpenFocus = useRef<HTMLElement | null>(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);

  // La ficha abierta sigue la actualización real del inventario; si se agota,
  // deja de ofrecerse para consulta como unidad disponible.
  useEffect(() => {
    setSelectedProduct(current => current ? (products.find(p => p.id === current.id) ?? null) : null);
  }, [products]);

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
    if (!selectedProduct) {
      productOpenScrollY.current = window.scrollY;
      productOpenFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }
    recordInterest('product_view', { id: product.variants[variantIndex]?.sku || product.id, name: product.name, capacity: product.variants[variantIndex]?.capacity });
    setSelectedProduct(product);
    setSelectedVariantIndex(variantIndex);
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: productOpenScrollY.current, behavior: 'instant' });
      if (productOpenFocus.current?.isConnected) productOpenFocus.current.focus({ preventScroll: true });
      productOpenFocus.current = null;
    });
  };

  const scrollToCatalog = (brand?: 'Valve' | 'Lenovo') => {
    setCatalogBrand(brand ?? 'Todas');
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
    <div className="min-h-screen bg-[#050A15] text-white selection:bg-[#3678FF]/30 selection:text-white flex flex-col justify-between">
      {/* Top Floating Navigation */}
      <Navbar
        onOpenCatalog={() => scrollToCatalog()}
        onOpenAdmin={() => { window.location.hash = 'admin'; setViewMode('admin'); setShowAuthModal(true); }}
      />

      {/* Main Content Sections */}
      {stockWarning && <div role="status" className="relative z-40 mt-24 px-5 text-center text-xs text-amber-200">{stockWarning}</div>}
      <main className="relative flex-1 bg-[radial-gradient(ellipse_95%_1050px_at_52%_360px,rgba(45,76,157,.15),transparent_85%),radial-gradient(ellipse_85%_1100px_at_15%_45%,rgba(45,49,113,.10),transparent_90%),radial-gradient(ellipse_85%_1200px_at_86%_82%,rgba(33,66,125,.09),transparent_90%)]">
        {/* Section 1: Hero Inmersivo with Protagonist Video */}
        <Hero onExplore={scrollToCatalog} />

        {/* El catálogo es lo primero que aparece después de la portada. */}
        <CatalogSection
          selectedBrand={catalogBrand}
          onBrandChange={setCatalogBrand}
          loading={stockLoading}
          loadError={stockWarning}
          products={products}
          fetchedAt={stockFetchedAt}
          onSelectProduct={handleOpenProduct}
        />

        {/* Redes sociales: inmediatamente después del catálogo, sin repetir en Quiénes somos. */}
        <FollowUsSection />

        {/* Comprar directo o solicitar publicación de Mercado Libre, inmediatamente después del catálogo. */}
        <SocialSection />

        {/* Comparación visual compacta de OLED, LCD y Lenovo. */}
        <ConsoleComparisonSection steamDeckProduct={steamDeckOled} steamDeckLcdProduct={steamDeckLcd} legionGoProduct={legionGo} hasOledStock={products.some(p => p.name.toLowerCase().includes('oled') && p.variants.some(v => v.inStock))}
          onSelectProduct={(p) => handleOpenProduct(p, 0)} />

        <FeatureHighlightsSection />
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
      <FloatingWhatsApp modalOpen={Boolean(selectedProduct)} />
    </div>
  );
}