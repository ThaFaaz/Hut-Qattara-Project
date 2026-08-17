import React from 'react';
import { 
  Flame, 
  CalendarDays, 
  MapPin, 
  Phone, 
  Star, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  UtensilsCrossed, 
  MessageCircle, 
  Sparkles 
} from 'lucide-react';
import { Language } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import mandiImg from '../assets/images/gourmet_mandi_biryani_1786961586560.jpg';

interface HeroProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onNavigate }) => {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div id="hero" className="relative overflow-hidden bg-[#0c0a09] text-[#f5f5f4] min-h-[92vh] flex flex-col justify-between">
      {/* Immersive Theme Ambient Glow Orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#78350f] opacity-20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-50px] right-[-50px] w-[400px] h-[400px] bg-[#451a03] opacity-30 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#78350f]/10 opacity-25 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Top Micro Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#d97706]"></span>
              <span className="text-[#d97706] uppercase tracking-[0.35em] text-xs font-bold font-sans">
                {isAr ? 'المأكولات التراثية والمشاوي بالعين' : 'Al Ain Traditional Cuisine'}
              </span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif leading-[1.1] text-white">
                {isAr ? (
                  <>
                    فخامة النكهات في <br />
                    <span className="italic text-[#d97706]">كوخ القطارة</span>
                  </>
                ) : (
                  <>
                    The Art of <br />
                    <span className="italic text-[#d97706]">Qattara</span> Dining
                  </>
                )}
              </h1>
              <p className="text-xl sm:text-2xl font-serif text-[#d97706]/90 italic">
                {isAr ? 'أصالة الماضي وكرم الضيافة الإماراتية' : 'Authentic Emirati Hospitality & Charcoal Feasts'}
              </p>
            </div>

            {/* Description */}
            <p className="text-[#a8a29e] max-w-xl text-base sm:text-lg leading-relaxed font-light">
              {isAr 
                ? 'استمتع بأشهى أطباق المندي العطر، المشاوي الطرية على الفحم، والمأكولات البحرية الطازجة وفوالة الصباح في قلب واحة القطارة التاريخية بمدينة العين.'
                : 'Experience authentic Emirati and Arabian flavors in the historic heart of Al Qattara. Slow-braised Mandi, flame-kissed grills, and warm Karak brewed with timeless passion.'
              }
            </p>

            {/* Open Daily & Contact Strip with Dividers */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-2 text-xs">
              <div className="flex flex-col">
                <span className="text-[#d97706] uppercase tracking-[0.2em] mb-1 font-bold text-[10px]">
                  {isAr ? 'أوقات العمل' : 'Open Daily'}
                </span>
                <span className="text-sm font-medium text-[#f5f5f4]">
                  7:00 AM — 1:00 AM
                </span>
              </div>

              <div className="w-[1px] h-8 bg-[#44403c] hidden sm:block"></div>

              <div className="flex flex-col">
                <span className="text-[#d97706] uppercase tracking-[0.2em] mb-1 font-bold text-[10px]">
                  {isAr ? 'الحجز والطلبات' : 'Direct Line'}
                </span>
                <span className="text-sm font-medium text-[#f5f5f4] font-mono" dir="ltr">
                  {RESTAURANT_INFO.phoneNumbers[0].number}
                </span>
              </div>

              <div className="w-[1px] h-8 bg-[#44403c] hidden sm:block"></div>

              <div className="flex flex-col">
                <span className="text-[#d97706] uppercase tracking-[0.2em] mb-1 font-bold text-[10px]">
                  {isAr ? 'الموقع' : 'Location'}
                </span>
                <span className="text-sm font-medium text-[#f5f5f4]">
                  Al Qattara, Al Ain
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('menu')}
                id="hero-menu-cta"
                className="px-8 py-3.5 bg-[#d97706] hover:bg-[#b45309] text-[#0c0a09] font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-3 shadow-[0_0_25px_rgba(217,119,6,0.3)] hover:scale-[1.02]"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>{isAr ? 'قائمة المأكولات' : 'View Menu'}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('reservations')}
                id="hero-reserve-cta"
                className="px-7 py-3.5 border border-[#d97706] text-[#d97706] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#d97706] hover:text-[#0c0a09] transition-all flex items-center gap-2.5 bg-[#0c0a09]/60 backdrop-blur-sm"
              >
                <CalendarDays className="w-4 h-4" />
                <span>{isAr ? 'حجز طاولة' : 'Book a Table'}</span>
              </button>

              <button
                onClick={() => onNavigate('location')}
                id="hero-location-cta"
                className="px-6 py-3.5 border border-[#44403c] text-[#a8a29e] text-xs uppercase tracking-[0.2em] hover:text-[#f5f5f4] hover:border-[#d97706] transition-all flex items-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-[#d97706]" />
                <span>{isAr ? 'الخريطة' : 'Map'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Architectural Arched Showcase Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative mt-8 lg:mt-0">
            
            {/* Outer Arch Frame */}
            <div className="w-full max-w-[380px] sm:max-w-[420px] h-[480px] sm:h-[530px] rounded-t-full border border-[#44403c] p-3.5 sm:p-4 relative shadow-2xl">
              
              {/* Inner Arch Body */}
              <div className="w-full h-full rounded-t-full bg-[#1c1917] flex flex-col items-center justify-between p-6 sm:p-8 text-center overflow-hidden border border-[#57534e] relative group">
                
                {/* Background Image of signature feast */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={mandiImg}
                    alt="Signature Mandi & Grills"
                    className="w-full h-full object-cover object-center opacity-35 group-hover:scale-105 transition-transform duration-700 filter brightness-75"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] via-[#1c1917]/70 to-[#1c1917]/50"></div>
                </div>

                {/* Top Arch Element */}
                <div className="relative z-10 pt-4">
                  <div className="w-12 h-12 rounded-full border border-[#d97706] flex items-center justify-center mx-auto mb-3 bg-[#0c0a09]/80 backdrop-blur-md shadow-lg">
                    <Flame className="w-5 h-5 text-[#d97706]" />
                  </div>
                  <span className="text-[#d97706] uppercase tracking-[0.3em] text-[10px] font-bold">
                    {isAr ? 'الطبق المميز' : 'Chef’s Specialty'}
                  </span>
                </div>

                {/* Center Details */}
                <div className="relative z-10 space-y-3 max-w-xs">
                  <h3 className="text-2xl sm:text-3xl font-serif italic text-white">
                    {isAr ? 'مندي اللحم والمشاوي' : 'Signature Mandi'}
                  </h3>
                  <p className="text-xs text-[#a8a29e] leading-relaxed">
                    {isAr
                      ? 'لحم طازج طري مطهو ببطء مع أرز بسمتي فاخر ومتبل بأسرار توابل القطارة التقليدية.'
                      : 'Slow-cooked succulent lamb served with aromatic basmati rice, charred spices, and fresh dakkous.'
                    }
                  </p>
                  <div className="mt-4 mx-auto h-[1px] w-20 bg-[#d97706]"></div>
                </div>

                {/* Bottom Card Action */}
                <div className="relative z-10 w-full pt-2">
                  <button
                    onClick={() => onNavigate('menu')}
                    className="text-xs uppercase tracking-[0.2em] text-[#d97706] hover:text-white font-bold transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{isAr ? 'طلب الآن' : 'Order This Feast'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

            {/* Overlapping Floating Location Badge */}
            <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-[#0c0a09] border border-[#d97706] p-4 sm:p-5 shadow-2xl z-20 max-w-[220px]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#a8a29e] mb-1 font-bold">
                {isAr ? 'موقعنا' : 'Our Location'}
              </p>
              <p className="text-xs sm:text-sm font-medium text-[#f5f5f4] leading-snug">
                Al Qattara, Al Ain <br />
                <span className="text-[#a8a29e] text-[11px]">Abu Dhabi, UAE</span>
              </p>
              <button
                onClick={() => onNavigate('location')}
                className="inline-flex items-center gap-1 mt-3 text-[#d97706] text-[11px] uppercase font-bold tracking-wider hover:underline"
              >
                <span>{isAr ? 'عرض الخريطة' : 'View on Maps'}</span>
                <span>→</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Feature Amenities Bar */}
      <div className="relative z-10 border-t border-[#292524] bg-[#0c0a09]/90 backdrop-blur-md py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6 sm:gap-12">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 bg-[#d97706] rounded-full"></div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#a8a29e]">
                {isAr ? 'ديكور وجلسات تراثية' : 'Traditional Decor'}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 bg-[#d97706] rounded-full"></div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#a8a29e]">
                {isAr ? 'جلسات عائلية وخارجية' : 'Outdoor & Majlis Seating'}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 bg-[#d97706] rounded-full"></div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#a8a29e]">
                {isAr ? 'كباين VIP خاصة' : 'Private VIP Cabins'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#a8a29e]">
            <a
              href={`tel:${RESTAURANT_INFO.phoneNumbers[0].raw}`}
              className="hover:text-[#d97706] transition-colors"
            >
              Tel: {RESTAURANT_INFO.phoneNumbers[0].number}
            </a>
            <span className="text-[#44403c]">•</span>
            <a
              href={RESTAURANT_INFO.whatsappDirectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d97706] hover:underline"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};
