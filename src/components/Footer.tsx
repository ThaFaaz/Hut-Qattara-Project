import React from 'react';
import { 
  Utensils, 
  MapPin, 
  Clock, 
  ChevronUp,
  ExternalLink 
} from 'lucide-react';
import { Language } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const isAr = lang === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0c0a09] text-[#a8a29e] border-t border-[#292524] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-[#78350f]/15 blur-[120px] pointer-events-none"></div>

      {/* Back to top button */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={scrollToTop}
          className="w-10 h-10 bg-[#d97706] hover:bg-[#b45309] text-[#0c0a09] flex items-center justify-center shadow-2xl transition-transform hover:-translate-y-1"
          title={isAr ? 'العودة للأعلى' : 'Back to top'}
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0c0a09] border border-[#d97706] flex items-center justify-center text-[#d97706]">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-white text-lg tracking-wider">
                  HUT QATTARA
                </h3>
                <div className="text-xs font-arabic text-[#d97706] font-medium">
                  مطعم كوخ القطارة
                </div>
              </div>
            </div>

            <p className="text-xs text-[#a8a29e] leading-relaxed font-light">
              {isAr
                ? 'وجهتكم المفضلة في منطقة القطارة بالعين لتناول أشهى المشاوي على الفحم، أطباق المندي، المأكولات البحرية وفطور الفوالة الإماراتي.'
                : 'A haven of culinary heritage in Al Qattara, Al Ain — serving slow-braised Mandi, flame-kissed grills, and traditional morning hospitality.'
              }
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-white text-sm uppercase tracking-widest border-b border-[#292524] pb-2">
              {isAr ? 'روابط سريعة' : 'Navigation'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('menu')} className="hover:text-[#d97706] transition-colors">
                  {isAr ? 'قائمة الطعام' : 'The Menu & Selections'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reservations')} className="hover:text-[#d97706] transition-colors">
                  {isAr ? 'حجز طاولة أونلاين' : 'Table Reservations'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('location')} className="hover:text-[#d97706] transition-colors">
                  {isAr ? 'خريطة الموقع والوصول' : 'Location & Directions'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-[#d97706] transition-colors">
                  {isAr ? 'آراء وتقييمات الزوار' : 'Guest Chronicles'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#d97706] transition-colors">
                  {isAr ? 'اتصل بنا والولائم' : 'Direct Concierge & Catering'}
                </button>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-4">
            <h4 className="font-serif text-white text-sm uppercase tracking-widest border-b border-[#292524] pb-2">
              {isAr ? 'أوقات العمل' : 'Hours of Service'}
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-[#f5f5f4]">
                <Clock className="w-4 h-4 text-[#d97706] shrink-0" />
                <span>{isAr ? RESTAURANT_INFO.openingHours.daysAr : RESTAURANT_INFO.openingHours.days}</span>
              </div>
              <div className="p-3 bg-[#1c1917] border border-[#292524] font-mono text-[#d97706] font-bold text-center">
                {isAr ? RESTAURANT_INFO.openingHours.timeAr : RESTAURANT_INFO.openingHours.time}
              </div>
              <p className="text-[11px] text-[#78716c] font-light">
                {isAr ? 'خدمة الصالة، الطلبات الخارجية والتوصيل متوفرة طوال اليوم.' : 'Dine-in, Takeaway & Swift Delivery available throughout the day.'}
              </p>
            </div>
          </div>

          {/* Direct Address & Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-white text-sm uppercase tracking-widest border-b border-[#292524] pb-2">
              {isAr ? 'العنوان والتواصل' : 'Sanctuary Address'}
            </h4>
            <div className="space-y-2.5 text-xs text-[#a8a29e]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                <span>{isAr ? RESTAURANT_INFO.addressAr : RESTAURANT_INFO.address}</span>
              </div>

              <div className="pt-1 flex flex-col gap-1 text-[#f5f5f4]">
                <a href={`tel:${RESTAURANT_INFO.phoneNumbers[0].raw}`} className="hover:text-[#d97706] font-mono" dir="ltr">
                  Tel: {RESTAURANT_INFO.phoneNumbers[0].number}
                </a>
                <a href={`tel:${RESTAURANT_INFO.phoneNumbers[1].raw}`} className="hover:text-[#d97706] font-mono" dir="ltr">
                  Mob: {RESTAURANT_INFO.phoneNumbers[1].number}
                </a>
              </div>

              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#d97706] hover:underline pt-1 text-xs"
              >
                <span>{isAr ? 'عرض على خرائط جوجل' : 'View on Google Maps'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#292524] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716c]">
          <div>
            © {new Date().getFullYear()} Hut Qattara Restaurant (مطعم كوخ القطارة) - Al Ain, Abu Dhabi, UAE. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-[#a8a29e]">
            <span>Crafted with Emirati Hospitality & Culinary Tradition in Al Ain</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
