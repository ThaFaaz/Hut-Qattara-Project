import React, { useState } from 'react';
import { 
  Utensils, 
  CalendarDays, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ShoppingBag, 
  Globe, 
  Menu as MenuIcon, 
  X, 
  Clock
} from 'lucide-react';
import { Language, CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  cart: CartItem[];
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  cart,
  onOpenCart,
  onNavigate,
  activeSection,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { id: 'menu', label: 'Menu', labelAr: 'قائمة الطعام', icon: Utensils },
    { id: 'reservations', label: 'Reservations', labelAr: 'حجز طاولة', icon: CalendarDays },
    { id: 'location', label: 'Location & Hours', labelAr: 'الموقع وساعات العمل', icon: MapPin },
    { id: 'reviews', label: 'Reviews', labelAr: 'آراء الزوار', icon: null },
    { id: 'contact', label: 'Contact', labelAr: 'اتصل بنا', icon: Phone },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Banner with phone & timings */}
      <div className="bg-[#0c0a09] text-[#a8a29e] text-xs py-2 px-4 border-b border-[#292524] z-50 relative">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-2 text-[#d97706] font-medium tracking-wider text-[11px] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d97706] animate-pulse"></span>
              {lang === 'ar' ? 'مفتوح يومياً في القطارة، العين' : 'Open Daily in Al Qattara, Al Ain'}
            </span>
            <div className="hidden sm:block w-[1px] h-3 bg-[#44403c]"></div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[#a8a29e] text-[11px] tracking-wide">
              <Clock className="w-3 h-3 text-[#d97706]" />
              {lang === 'ar' ? RESTAURANT_INFO.openingHours.timeAr : RESTAURANT_INFO.openingHours.time}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a 
              href={`tel:${RESTAURANT_INFO.phoneNumbers[0].raw}`}
              className="flex items-center gap-1.5 text-[#f5f5f4] hover:text-[#d97706] transition-colors text-[11px] tracking-wider"
              id="topbar-call-btn"
            >
              <Phone className="w-3 h-3 text-[#d97706]" />
              <span dir="ltr">{RESTAURANT_INFO.phoneNumbers[0].number}</span>
            </a>
            <div className="hidden sm:block w-[1px] h-3 bg-[#44403c]"></div>
            <a 
              href={RESTAURANT_INFO.whatsappDirectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-[#a8a29e] hover:text-[#d97706] transition-colors text-[11px] tracking-wider uppercase"
              id="topbar-whatsapp-btn"
            >
              <MessageCircle className="w-3 h-3 text-[#d97706]" />
              <span>{lang === 'ar' ? 'واتساب مباشر' : 'WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-[#0c0a09]/90 backdrop-blur-md text-[#f5f5f4] border-b border-[#292524] shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <button 
              onClick={() => handleItemClick('hero')}
              className="flex items-center gap-3.5 text-left group focus:outline-none"
              id="brand-logo-btn"
            >
              <div className="w-10 h-10 border-2 border-[#d97706] rounded-full flex items-center justify-center transition-transform group-hover:scale-105 shadow-[0_0_15px_rgba(217,119,6,0.2)]">
                <span className="text-[#d97706] font-serif font-bold text-lg">H</span>
              </div>
              <div>
                <div className="font-serif text-xl sm:text-2xl font-normal tracking-[0.15em] uppercase text-[#f5f5f4] flex items-center gap-2">
                  <span>Hut Qattara</span>
                  <span className="text-[#d97706] text-[10px] uppercase px-1.5 py-0.5 border border-[#d97706]/40 tracking-widest font-sans">
                    Al Ain
                  </span>
                </div>
                <div className="text-[11px] font-arabic text-[#a8a29e] tracking-wide font-normal">
                  مطعم كوخ القطارة
                </div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    id={`nav-${item.id}`}
                    className={`text-xs uppercase tracking-[0.2em] font-medium transition-all relative py-1 ${
                      isActive
                        ? 'text-[#d97706]'
                        : 'text-[#a8a29e] hover:text-[#d97706]'
                    }`}
                  >
                    <span>{lang === 'ar' ? item.labelAr : item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d97706] rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <button
                onClick={onToggleLang}
                id="lang-toggle-btn"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1c1917] hover:bg-[#292524] text-[#a8a29e] hover:text-[#f5f5f4] text-xs font-medium border border-[#44403c] transition-colors"
                title={lang === 'en' ? 'Switch to Arabic' : 'التحويل للإنجليزية'}
              >
                <Globe className="w-3.5 h-3.5 text-[#d97706]" />
                <span className="tracking-wider">{lang === 'en' ? 'العربية' : 'EN'}</span>
              </button>

              {/* Book Table direct CTA */}
              <button
                onClick={() => handleItemClick('reservations')}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 border border-[#d97706] text-[#d97706] text-xs uppercase tracking-widest hover:bg-[#d97706] hover:text-[#0c0a09] transition-all font-semibold"
                id="nav-book-btn"
              >
                <CalendarDays className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'حجز طاولة' : 'Book a Table'}</span>
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={onOpenCart}
                id="navbar-cart-btn"
                className="relative flex items-center gap-2 px-3.5 py-2 bg-[#d97706] hover:bg-[#b45309] text-[#0c0a09] font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === 'ar' ? 'الطلب' : 'Bag'}</span>
                {totalCartCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#0c0a09] text-[#d97706] text-[10px] flex items-center justify-center font-bold">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                id="mobile-menu-toggle-btn"
                className="lg:hidden p-2 bg-[#1c1917] border border-[#44403c] text-[#f5f5f4] hover:text-[#d97706]"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0c0a09] border-t border-[#292524] px-6 pt-4 pb-8 space-y-3 shadow-2xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-[#d97706] bg-[#1c1917] border-l-2 border-[#d97706]'
                    : 'text-[#a8a29e] hover:text-white'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4 text-[#d97706]" />}
                <span>{lang === 'ar' ? item.labelAr : item.label}</span>
              </button>
            ))}

            <div className="pt-4 border-t border-[#292524] space-y-2">
              <button
                onClick={() => handleItemClick('reservations')}
                className="w-full py-2.5 border border-[#d97706] text-[#d97706] text-xs uppercase tracking-widest font-semibold hover:bg-[#d97706] hover:text-[#0c0a09] transition-all flex items-center justify-center gap-2"
              >
                <CalendarDays className="w-4 h-4" />
                <span>{lang === 'ar' ? 'حجز طاولة أونلاين' : 'Book a Table'}</span>
              </button>
              <a
                href={`tel:${RESTAURANT_INFO.phoneNumbers[0].raw}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1c1917] border border-[#44403c] text-[#f5f5f4] text-xs tracking-wider uppercase font-medium hover:border-[#d97706]"
              >
                <Phone className="w-3.5 h-3.5 text-[#d97706]" />
                <span>{lang === 'ar' ? 'اتصال مباشر' : 'Call'}: {RESTAURANT_INFO.phoneNumbers[0].number}</span>
              </a>
              <a
                href={RESTAURANT_INFO.whatsappDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1c1917] border border-[#44403c] text-[#d97706] text-xs uppercase tracking-wider font-semibold hover:bg-[#d97706] hover:text-[#0c0a09] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'ar' ? 'طلب عبر واتساب' : 'WhatsApp Orders'}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
