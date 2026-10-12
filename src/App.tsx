/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product } from './types/catalog';
import { inventoryService } from './services/inventoryService';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SteamDeckSection } from './components/SteamDeckSection';
import { LegionGoSection } from './components/LegionGoSection';
import { CatalogSection } from './components/CatalogSection';
import { ExperienceSection } from './components/ExperienceSection';
import { BrandStorySection } from './components/BrandStorySection';
import { SocialSection } from './components/SocialSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminAuthModal } from './components/admin/AdminAuthModal';

export default function App() {
  // Sync products with inventory service
  const [products, setProducts] = useState<Product[]>(() =>
    inventoryService.getPublicCatalogProducts(PRODUCTS)
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);

  // Admin routing state
  const [viewMode, setViewMode] = useState<'public' | 'admin'>(() => {
    return window.location.hash === '#admin' || window.location.pathname === '/admin'
      ? 'admin'
      : 'public';
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      const session = localStorage.getItem('handheld_admin_session');
      if (session) {
        const parsed = JSON.parse(session);
        // Valid for 7 days
        return parsed.authenticated && Date.now() - parsed.timestamp < 7 * 24 * 60 * 60 * 1000;
      }
    } catch {
      // Ignore
    }
    return false;
  });

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

  // Subscribe to live inventory updates to reflect in public catalog instantly
  useEffect(() => {
    const updateCatalog = () => {
      setProducts(inventoryService.getPublicCatalogProducts(PRODUCTS));
    };

    const unsubscribe = inventoryService.subscribe(updateCatalog);
    return () => unsubscribe();
  }, []);

  // Flagship products for editorial showcases
  const steamDeckOled = products.find((p) => p.id === 'steam-deck-oled') || products[0];
  const legionGo = products.find((p) => p.id === 'lenovo-legion-go') || products[1];

  const handleOpenProduct = (product: Product, variantIndex: number = 0) => {
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
      <AdminLayout
        onExitAdmin={() => {
          setViewMode('public');
          window.location.hash = '';
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white selection:bg-[#3678FF]/30 selection:text-white flex flex-col justify-between">
      {/* Top Floating Navigation */}
      <Navbar
        onOpenCatalog={scrollToCatalog}
        onOpenAdmin={() => setViewMode('admin')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 1: Hero Inmersivo with Protagonist Video */}
        <Hero onExplore={scrollToCatalog} />

        {/* Section 2: Steam Deck Showcase */}
        <SteamDeckSection
          steamDeckProduct={steamDeckOled}
          onSelectProduct={(p) => handleOpenProduct(p, 0)}
        />

        {/* Section 3: Lenovo Legion Go Showcase */}
        <LegionGoSection
          legionGoProduct={legionGo}
          onSelectProduct={(p) => handleOpenProduct(p, 0)}
        />

        {/* Section 4: Catálogo Premium */}
        <CatalogSection
          products={products}
          onSelectProduct={handleOpenProduct}
        />

        {/* Section 5: Experiencia Gaming & Comparativa Técnica */}
        <ExperienceSection />

        {/* Section 6: Nuestra Marca */}
        <BrandStorySection />

        {/* Section 7: Redes Sociales */}
        <SocialSection />

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
      <AdminAuthModal
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
      />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}
