import React from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  ExternalLink, 
  Sparkles, 
  Compass, 
  Bike, 
  CheckCircle2
} from 'lucide-react';
import { Language } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface LocationSectionProps {
  lang: Language;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <section id="location" className="py-24 bg-[#0c0a09] text-[#f5f5f4] relative overflow-hidden border-t border-[#292524]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#78350f]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-[#451a03]/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex items-center justify-center gap-3">
            <span className="w-6 h-[1px] bg-[#d97706]"></span>
            <span className="text-[#d97706] uppercase tracking-[0.35em] text-xs font-bold font-sans">
              {isAr ? 'الموقع وخريطة الوصول' : 'Location & Sanctuary'}
            </span>
            <span className="w-6 h-[1px] bg-[#d97706]"></span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
            {isAr ? (
              <>موقع مطعم كوخ القطارة في <span className="italic text-[#d97706]">العين</span></>
            ) : (
              <>Find Us in Historic <span className="italic text-[#d97706]">Al Qattara</span></>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#a8a29e] font-light leading-relaxed">
            {isAr
              ? 'موقع مميز وسهل الوصول في منطقة القطارة التاريخية، بالقرب من واحة القطارة ومركز القطارة للفنون.'
              : 'Situated in the heritage core of Al Ain, steps away from the lush palm groves of Qattara Oasis and Al Qattara Arts Centre.'
            }
          </p>
        </div>

        {/* Map & Location Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Map Box */}
          <div className="lg:col-span-7 bg-[#1c1917] border border-[#292524] p-4 sm:p-5 shadow-2xl space-y-4">
            
            {/* Live Map iFrame */}
            <div className="relative w-full h-80 sm:h-96 bg-[#0c0a09] border border-[#44403c] overflow-hidden">
              <iframe
                title="Hut Qattara Restaurant Google Map Location"
                src={`https://maps.google.com/maps?q=${RESTAURANT_INFO.coordinates.lat},${RESTAURANT_INFO.coordinates.lng}&z=17&output=embed`}
                className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-125 brightness-90"
                loading="lazy"
                allowFullScreen
              ></iframe>

              {/* Map Floating Card */}
              <div className="absolute top-3 left-3 bg-[#0c0a09]/90 backdrop-blur-md border border-[#d97706] p-3 shadow-xl max-w-xs text-xs">
                <div className="font-serif text-[#d97706] font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#d97706]" />
                  <span>Hut Qattara Restaurant</span>
                </div>
                <p className="text-[#a8a29e] text-[11px] mt-0.5">
                  {isAr ? RESTAURANT_INFO.addressAr : RESTAURANT_INFO.address}
                </p>
              </div>

              {/* Floating Action Button */}
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 bg-[#d97706] hover:bg-[#b45309] text-[#0c0a09] px-4 py-2.5 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl transition-transform hover:scale-105"
                id="open-google-maps-btn"
              >
                <Navigation className="w-4 h-4" />
                <span>{isAr ? 'فتح في Google Maps' : 'Open in Google Maps'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Landmarks & How to Reach Us */}
            <div className="p-4 bg-[#0c0a09] border border-[#292524] space-y-3 text-xs">
              <div className="font-bold text-[#d97706] uppercase tracking-wider flex items-center gap-2 text-[11px]">
                <Compass className="w-4 h-4 text-[#d97706]" />
                <span>{isAr ? 'معالم قريبة لسهولة الوصول:' : 'Nearby Landmarks & Access:'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#a8a29e]">
                {RESTAURANT_INFO.landmarks.map((lm, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-[#1c1917] border border-[#292524]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
                    <span>{isAr ? lm.ar : lm.en}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Detailed Contact & Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Hours Box */}
            <div className="p-6 bg-[#1c1917] border border-[#292524] shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#292524] pb-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg text-white">
                    {isAr ? 'ساعات العمل الرسمية' : 'Operating Hours'}
                  </h3>
                  <p className="text-xs text-[#d97706] uppercase tracking-widest font-bold">
                    {isAr ? 'خدمة متواصلة طوال الأسبوع' : 'Open 7 Days a Week'}
                  </p>
                </div>
                <div className="w-10 h-10 border border-[#d97706] flex items-center justify-center text-[#d97706] bg-[#0c0a09]">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3.5 bg-[#0c0a09] border border-[#44403c]">
                  <span className="text-[#a8a29e] uppercase tracking-wider text-[11px] font-bold">{isAr ? 'ساعات العمل اليومية' : 'Full Hours'}</span>
                  <span className="font-bold text-[#d97706] text-sm font-mono">7:00 AM – 1:00 AM</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11px] text-[#a8a29e]">
                  <div className="p-2.5 bg-[#0c0a09] border border-[#292524] text-center">
                    <div className="text-[#f5f5f4] font-bold">{isAr ? 'الفوالة' : 'Fawala'}</div>
                    <div className="text-[#d97706] mt-0.5 font-mono text-[10px]">7:00 - 11:30</div>
                  </div>
                  <div className="p-2.5 bg-[#0c0a09] border border-[#292524] text-center">
                    <div className="text-[#f5f5f4] font-bold">{isAr ? 'الغداء' : 'Lunch'}</div>
                    <div className="text-[#d97706] mt-0.5 font-mono text-[10px]">12:00 - 17:00</div>
                  </div>
                  <div className="p-2.5 bg-[#0c0a09] border border-[#292524] text-center">
                    <div className="text-[#f5f5f4] font-bold">{isAr ? 'العشاء' : 'Dinner'}</div>
                    <div className="text-[#d97706] mt-0.5 font-mono text-[10px]">18:00 - 01:00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Coverage Areas */}
            <div className="p-6 bg-[#1c1917] border border-[#292524] shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-white font-serif text-sm">
                <Bike className="w-4 h-4 text-[#d97706]" />
                <span>{isAr ? 'مناطق التوصيل السريع في العين:' : 'Fast Delivery Coverage in Al Ain:'}</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {RESTAURANT_INFO.deliveryZones.map((zone, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-[#0c0a09] border border-[#292524] text-[#a8a29e] text-[11px]"
                  >
                    {zone}
                  </span>
                ))}
              </div>
              <div className="pt-2 text-[11px] text-[#78716c] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d97706]"></span>
                <span>{isAr ? 'متوسط وقت التوصيل: ٢٥ - ٣٥ دقيقة' : 'Avg Delivery Time: 25 - 35 mins'}</span>
              </div>
            </div>

            {/* Facility Features */}
            <div className="p-6 bg-[#1c1917] border border-[#292524] shadow-xl space-y-3">
              <div className="font-serif text-white text-sm mb-2">
                {isAr ? 'المرافق والتسهيلات:' : 'Guest Amenities & Facilities:'}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#a8a29e]">
                {RESTAURANT_INFO.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-[#0c0a09] border border-[#292524]">
                    <Sparkles className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
                    <span>{isAr ? feat.ar : feat.en}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
