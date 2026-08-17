import React from 'react';
import { Star, MessageSquare, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { REVIEWS, RESTAURANT_INFO } from '../data/restaurantData';

interface ReviewsSectionProps {
  lang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <section id="reviews" className="py-24 bg-[#0c0a09] text-[#f5f5f4] relative overflow-hidden border-t border-[#292524]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-[#78350f]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-[#451a03]/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex items-center justify-center gap-3">
            <span className="w-6 h-[1px] bg-[#d97706]"></span>
            <span className="text-[#d97706] uppercase tracking-[0.35em] text-xs font-bold font-sans">
              {isAr ? 'آراء وتجارب الضيوف' : 'Guest Chronicles'}
            </span>
            <span className="w-6 h-[1px] bg-[#d97706]"></span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
            {isAr ? (
              <>أصداء ضيوفنا في <span className="italic text-[#d97706]">العين</span></>
            ) : (
              <>Words from Our <span className="italic text-[#d97706]">Distinguished Guests</span></>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#a8a29e] font-light leading-relaxed">
            {isAr
              ? 'نفخر بتقديم أشهى المأكولات وأفضل خدمة لعملائنا في القطارة ومدينة العين.'
              : 'Cherished memories shared by our community savoring charcoal grills, Mandi feasts, and Emirati hospitality.'
            }
          </p>
        </div>

        {/* Rating Score Overview Card */}
        <div className="bg-[#1c1917] border border-[#292524] p-8 max-w-4xl mx-auto mb-14 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center text-center sm:text-left">
            
            {/* Overall Score */}
            <div className="space-y-2 sm:border-r border-[#292524] sm:pr-8">
              <div className="text-5xl sm:text-6xl font-serif font-bold text-[#d97706]">4.8</div>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-[#d97706]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d97706] text-[#d97706]" />
                ))}
              </div>
              <div className="text-xs text-[#a8a29e] uppercase tracking-wider">
                {isAr ? 'تقييم زوار المطعم' : 'Average Guest Rating'}
              </div>
            </div>

            {/* Key Praises */}
            <div className="sm:col-span-2 space-y-3 text-xs text-[#a8a29e] font-light">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0" />
                <span className="text-[#f5f5f4]">{isAr ? 'مشاوي فحم طازجة وطرية يومياً' : 'Juicy, flame-grilled charcoal meats & kebab'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0" />
                <span className="text-[#f5f5f4]">{isAr ? 'أطباق مندي ومجبوس عطرة بخلطات أصيلة' : 'Aromatic long-grain Mandi rice braised with saffron'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0" />
                <span className="text-[#f5f5f4]">{isAr ? 'شاي كرك دافئ وفوالة صباحية مميزة' : 'Warm saffron Karak & authentic morning Fawala breakfast'}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-7 bg-[#1c1917] border border-[#292524] hover:border-[#d97706]/50 transition-all flex flex-col justify-between space-y-5 shadow-xl"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-base text-white">
                      {isAr ? rev.authorAr : rev.author}
                    </h4>
                    <span className="text-[11px] text-[#78716c] uppercase tracking-wider">
                      {isAr ? rev.dateAr : rev.date} • {rev.source}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#d97706]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#d97706] text-[#d97706]" />
                    ))}
                  </div>
                </div>

                <p className="text-[#a8a29e] text-xs sm:text-sm leading-relaxed italic font-light">
                  "{isAr ? rev.commentAr : rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#292524] flex items-center justify-between text-[11px]">
                <span className="text-[#78716c] uppercase tracking-wider">{isAr ? 'الطبق المفضل:' : 'Favored Selection:'}</span>
                <span className="text-[#d97706] font-semibold">{isAr ? rev.dishRecommendedAr : rev.dishRecommended}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Leave a review button */}
        <div className="text-center pt-12">
          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#0c0a09] hover:bg-[#1c1917] text-[#f5f5f4] font-bold text-xs uppercase tracking-widest border border-[#44403c] hover:border-[#d97706] transition-all shadow-xl"
          >
            <MessageSquare className="w-4 h-4 text-[#d97706]" />
            <span>{isAr ? 'شاركنا تجربتك وتقييمك على Google Maps' : 'Share Your Review on Google Maps'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
