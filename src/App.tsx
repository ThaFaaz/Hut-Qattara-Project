import React, { useState, useEffect } from 'react';
import { Language, CartItem, MenuItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ReservationSection } from './components/ReservationSection';
import { LocationSection } from './components/LocationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { MessageCircle, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from './data/restaurantData';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('hut_qattara_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Handle HTML dir attribute for proper Arabic RTL
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('hut_qattara_cart', JSON.stringify(cart));
    } catch (e) {
      // Storage quota fallback
    }
  }, [cart]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const handleAddToCart = (
    item: MenuItem, 
    quantity: number = 1, 
    selectedOptions?: Record<string, string>, 
    specialInstructions?: string
  ) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (c) =>
          c.item.id === item.id &&
          JSON.stringify(c.selectedOptions || {}) === JSON.stringify(selectedOptions || {}) &&
          c.specialInstructions === specialInstructions
      );

      if (existingIdx > -1) {
        const newCart = [...prevCart];
        newCart[existingIdx].quantity += quantity;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            item,
            quantity,
            selectedOptions,
            specialInstructions,
          },
        ];
      }
    });
  };

  const handleUpdateQty = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart((prev) => {
      const copy = [...prev];
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      const navOffset = 80;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={`min-h-screen bg-[#0c0a09] text-[#f5f5f4] selection:bg-[#d97706] selection:text-[#0c0a09] ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      
      {/* Top Navigation */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
        activeSection={activeSection}
      />

      {/* Main Sections */}
      <main>
        <Hero 
          lang={lang} 
          onNavigate={scrollToSection} 
        />

        <MenuSection
          lang={lang}
          onAddToCart={handleAddToCart}
          cart={cart}
        />

        <ReservationSection
          lang={lang}
        />

        <LocationSection
          lang={lang}
        />

        <ReviewsSection
          lang={lang}
        />

        <ContactSection
          lang={lang}
        />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onNavigate={scrollToSection}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        lang={lang}
      />

      {/* Floating Action Buttons for instant WhatsApp & Call */}
      <div className={`fixed bottom-6 ${lang === 'ar' ? 'left-6' : 'right-6'} z-30 flex flex-col gap-3.5`}>
        {/* Direct Call Floating */}
        <a
          href={`tel:${RESTAURANT_INFO.phoneNumbers[0].raw}`}
          className="w-12 h-12 bg-[#d97706] hover:bg-[#b45309] text-[#0c0a09] flex items-center justify-center shadow-2xl border border-[#d97706] transition-transform hover:scale-110 active:scale-95"
          title={lang === 'ar' ? 'اتصال بالمطعم' : 'Call Restaurant'}
          id="floating-call-btn"
        >
          <Phone className="w-5 h-5 stroke-[2.5]" />
        </a>

        {/* WhatsApp Floating */}
        <a
          href={RESTAURANT_INFO.whatsappDirectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-emerald-600 hover:bg-emerald-500 text-[#0c0a09] flex items-center justify-center shadow-2xl border border-emerald-500 transition-transform hover:scale-110 active:scale-95 group relative"
          title={lang === 'ar' ? 'محادثة واتساب سريعة' : 'Chat on WhatsApp'}
          id="floating-whatsapp-btn"
        >
          <MessageCircle className="w-5 h-5 stroke-[2.5]" />
          <span className={`absolute ${lang === 'ar' ? 'left-16' : 'right-16'} bg-[#1c1917] text-[#f5f5f4] text-xs font-semibold px-3 py-1.5 border border-[#d97706]/40 shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-wider`}>
            {lang === 'ar' ? 'محادثة واتساب مباشرة' : 'Direct WhatsApp Concierge'}
          </span>
        </a>
      </div>

    </div>
  );
}
