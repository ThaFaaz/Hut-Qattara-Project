import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Search, 
  X, 
  Plus, 
  Check, 
  Sparkles, 
  Clock, 
  ShoppingBag, 
  MessageCircle, 
  Info, 
  UtensilsCrossed, 
  CookingPot, 
  Fish, 
  Soup, 
  Egg, 
  Sandwich, 
  Coffee
} from 'lucide-react';
import { Language, MenuItem, DietaryTag, CartItem } from '../types';
import { CATEGORIES, MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';

interface MenuSectionProps {
  lang: Language;
  onAddToCart: (item: MenuItem, quantity: number, selectedOptions?: Record<string, string>, specialInstructions?: string) => void;
  cart: CartItem[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  lang,
  onAddToCart,
  cart,
}) => {
  const isAr = lang === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<MenuItem | null>(null);

  // Modal customization states
  const [modalQty, setModalQty] = useState<number>(1);
  const [modalOptions, setModalOptions] = useState<Record<string, string>>({});
  const [modalNotes, setModalNotes] = useState<string>('');
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const dietaryFilterList: { id: string; label: string; labelAr: string; tag?: DietaryTag }[] = [
    { id: 'all', label: 'All Offerings', labelAr: 'جميع الأصناف' },
    { id: 'bestseller', label: 'Signature Dishes', labelAr: 'الأكثر طلباً', tag: 'bestseller' },
    { id: 'chef-choice', label: "Chef's Selection", labelAr: 'مختارات الشيف', tag: 'chef-choice' },
    { id: 'spicy', label: 'Spiced Grills', labelAr: 'أطباق حارة', tag: 'spicy' },
    { id: 'seafood', label: 'Gulf Seafood', labelAr: 'بحري وطازج', tag: 'seafood' },
    { id: 'vegetarian', label: 'Vegetarian', labelAr: 'نباتي ولذيذ', tag: 'vegetarian' },
    { id: 'breakfast', label: 'Morning Fawala', labelAr: 'فوالة وإفطار', tag: 'breakfast' },
  ];

  // Map category icons
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'CookingPot': return <CookingPot className="w-4 h-4" />;
      case 'Fish': return <Fish className="w-4 h-4" />;
      case 'Soup': return <Soup className="w-4 h-4" />;
      case 'Egg': return <Egg className="w-4 h-4" />;
      case 'Sandwich': return <Sandwich className="w-4 h-4" />;
      case 'Coffee': return <Coffee className="w-4 h-4" />;
      default: return <UtensilsCrossed className="w-4 h-4" />;
    }
  };

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary tag filter
      if (selectedTag !== 'all') {
        if (!item.tags.includes(selectedTag as DietaryTag)) {
          return false;
        }
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesEn = item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
        const matchesAr = item.nameAr.includes(q) || item.descriptionAr.includes(q);
        return matchesEn || matchesAr;
      }
      return true;
    });
  }, [selectedCategory, selectedTag, searchQuery]);

  const openItemModal = (item: MenuItem) => {
    setActiveModalItem(item);
    setModalQty(1);
    setModalNotes('');
    const initialOpts: Record<string, string> = {};
    if (item.options) {
      item.options.forEach((opt) => {
        initialOpts[opt.name] = opt.choices[0].label;
      });
    }
    setModalOptions(initialOpts);
  };

  const handleModalAdd = () => {
    if (!activeModalItem) return;
    onAddToCart(activeModalItem, modalQty, modalOptions, modalNotes);
    setAddedToast(activeModalItem.id);
    setTimeout(() => setAddedToast(null), 2500);
    setActiveModalItem(null);
  };

  const handleDirectWhatsAppItem = (item: MenuItem) => {
    const text = isAr 
      ? `السلام عليكم، أود طلب: ${item.nameAr} (${item.price} درهم) من مطعم كوخ القطارة بالعين.`
      : `Hello Hut Qattara Restaurant, I would like to order: ${item.name} (AED ${item.price}).`;
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Helper to check quantity in cart
  const getItemCartQty = (itemId: string) => {
    return cart
      .filter((c) => c.item.id === itemId)
      .reduce((sum, c) => sum + c.quantity, 0);
  };

  return (
    <section id="menu" className="py-24 bg-[#0c0a09] text-[#f5f5f4] relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#78350f]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-[#451a03]/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex items-center justify-center gap-3">
            <span className="w-6 h-[1px] bg-[#d97706]"></span>
            <span className="text-[#d97706] uppercase tracking-[0.35em] text-xs font-bold font-sans">
              {isAr ? 'قائمة الطعام الفاخرة' : 'Culinary Masterpieces'}
            </span>
            <span className="w-6 h-[1px] bg-[#d97706]"></span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
            {isAr ? (
              <>أطايب ونكهات <span className="italic text-[#d97706]">كوخ القطارة</span></>
            ) : (
              <>Taste the Flavors of <span className="italic text-[#d97706]">Qattara</span></>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#a8a29e] font-light leading-relaxed">
            {isAr
              ? 'مجموعة متكاملة من أشهى المشاوي المتبلة على الفحم، أطباق المندي العطر، والمأكولات البحرية الطازجة وفطور الفوالة المحضر يومياً بأجود المكونات.'
              : 'Slow-steamed Mandi rice, sizzling charcoal grills, fresh Gulf seafood, and morning Fawala breakfast prepared with authentic heritage recipes.'
            }
          </p>
        </div>

        {/* Search Bar & Dietary Filter Bar */}
        <div className="bg-[#1c1917]/90 p-4 sm:p-6 border border-[#292524] shadow-2xl mb-10 space-y-4 backdrop-blur-md">
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-[#a8a29e] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'ابحث في القائمة (مشاوي، مندي، برياني، كباب، فوالة، كرك...)' : 'Search delicacies (charcoal grills, mandi, biryani, karak, shawarma...)'}
                className="w-full pl-10 pr-10 py-3 bg-[#0c0a09] border border-[#44403c] text-[#f5f5f4] placeholder-[#78716c] text-xs sm:text-sm focus:outline-none focus:border-[#d97706] transition-colors"
                id="menu-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a8a29e] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Direct WhatsApp Quick Order */}
            <a
              href={RESTAURANT_INFO.whatsappDirectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 border border-[#d97706]/60 text-[#d97706] hover:bg-[#d97706] hover:text-[#0c0a09] text-xs uppercase tracking-wider font-bold transition-all bg-[#0c0a09]/50"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isAr ? 'طلب سريع واتساب' : 'WhatsApp Order'}</span>
            </a>
          </div>

          {/* Dietary Tag Filter Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-[#292524] pt-3">
            <span className="text-[11px] text-[#a8a29e] uppercase tracking-wider whitespace-nowrap font-bold pr-2">
              {isAr ? 'التصنيف:' : 'Filter:'}
            </span>
            {dietaryFilterList.map((tagObj) => {
              const isActive = selectedTag === tagObj.id;
              return (
                <button
                  key={tagObj.id}
                  onClick={() => setSelectedTag(tagObj.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium whitespace-nowrap uppercase tracking-wider transition-all border ${
                    isActive
                      ? 'bg-[#d97706] text-[#0c0a09] border-[#d97706] font-bold shadow-md'
                      : 'bg-[#0c0a09] text-[#a8a29e] hover:text-[#f5f5f4] border-[#292524] hover:border-[#44403c]'
                  }`}
                >
                  {isAr ? tagObj.labelAr : tagObj.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-[#292524]">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                id={`cat-tab-${cat.id}`}
                className={`flex items-center gap-2.5 px-5 py-3 text-xs uppercase tracking-widest font-bold whitespace-nowrap transition-all border-b-2 shrink-0 ${
                  isSelected
                    ? 'border-[#d97706] text-[#d97706] bg-[#1c1917]'
                    : 'border-transparent text-[#a8a29e] hover:text-white hover:border-[#44403c]'
                }`}
              >
                <span className={isSelected ? 'text-[#d97706]' : 'text-[#78716c]'}>
                  {getCategoryIcon(cat.iconName)}
                </span>
                <span>{isAr ? cat.labelAr : cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#1c1917] border border-[#292524] space-y-4">
            <UtensilsCrossed className="w-12 h-12 text-[#78716c] mx-auto" />
            <div className="text-lg font-serif text-[#f5f5f4]">
              {isAr ? 'لم يتم العثور على أطباق مطابقة' : 'No delicacies match your selection'}
            </div>
            <p className="text-xs text-[#a8a29e]">
              {isAr ? 'جرب البحث بكلمات أخرى أو عرض جميع الأصناف.' : 'Try adjusting your search query or reset category filter.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTag('all');
              }}
              className="px-6 py-2.5 bg-[#d97706] text-[#0c0a09] text-xs font-bold uppercase tracking-wider hover:bg-[#b45309]"
            >
              {isAr ? 'إعادة ضبط القائمة' : 'Reset Menu Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const inCartCount = getItemCartQty(item.id);
              const isItemAdded = addedToast === item.id;

              return (
                <div
                  key={item.id}
                  className="group bg-[#1c1917] border border-[#292524] hover:border-[#d97706]/60 transition-all duration-300 flex flex-col justify-between shadow-xl"
                  id={`menu-card-${item.id}`}
                >
                  {/* Food Image Container */}
                  <div 
                    className="relative h-56 w-full overflow-hidden bg-[#0c0a09] cursor-pointer" 
                    onClick={() => openItemModal(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] via-transparent to-black/40"></div>

                    {/* Price Tag Badge with Gold Border */}
                    <div className="absolute bottom-3 left-3 bg-[#0c0a09]/90 border border-[#d97706] text-[#d97706] font-bold text-xs px-3 py-1.5 shadow-lg backdrop-blur-md flex items-center gap-1">
                      <span className="text-[10px] text-[#a8a29e]">AED</span>
                      <span className="text-sm font-mono">{item.price}</span>
                    </div>

                    {/* Tags */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {item.tags.includes('bestseller') && (
                        <span className="px-2.5 py-1 bg-[#d97706] text-[#0c0a09] text-[9px] font-bold tracking-widest uppercase">
                          {isAr ? 'الأكثر طلباً' : 'Signature'}
                        </span>
                      )}
                      {item.tags.includes('chef-choice') && (
                        <span className="px-2.5 py-1 bg-[#0c0a09] border border-[#d97706] text-[#d97706] text-[9px] font-bold tracking-widest uppercase">
                          {isAr ? 'مختارات الشيف' : "Chef's Pick"}
                        </span>
                      )}
                      {item.tags.includes('spicy') && (
                        <span className="px-2.5 py-1 bg-red-950/90 border border-red-500/50 text-red-300 text-[9px] font-bold tracking-widest uppercase">
                          {isAr ? 'حار' : 'Spicy'}
                        </span>
                      )}
                    </div>

                    {/* Prep time */}
                    <div className="absolute top-3 right-3 bg-[#0c0a09]/80 backdrop-blur-md px-2.5 py-1 text-[11px] text-[#a8a29e] border border-[#44403c] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#d97706]" />
                      <span>{item.prepTime}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 
                            onClick={() => openItemModal(item)}
                            className="font-serif text-lg text-white group-hover:text-[#d97706] transition-colors cursor-pointer"
                          >
                            {isAr ? item.nameAr : item.name}
                          </h3>
                          <p className="text-xs text-[#d97706]/90 font-sans tracking-wide">
                            {isAr ? item.name : item.nameAr}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-[#a8a29e] line-clamp-2 leading-relaxed font-light">
                        {isAr ? item.descriptionAr : item.description}
                      </p>

                      {item.portionSize && (
                        <div className="text-[11px] text-[#78716c] flex items-center gap-1.5 pt-1">
                          <span className="uppercase tracking-wider text-[10px] text-[#a8a29e]">{isAr ? 'الحجم:' : 'Portion:'}</span>
                          <span className="text-[#f5f5f4]">{isAr ? item.portionSizeAr : item.portionSize}</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-4 border-t border-[#292524] flex items-center justify-between gap-2">
                      <button
                        onClick={() => openItemModal(item)}
                        className="text-xs uppercase tracking-wider font-semibold text-[#a8a29e] hover:text-[#d97706] flex items-center gap-1 transition-colors py-1"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>{isAr ? 'التفاصيل' : 'Details'}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        {/* 1-Tap WhatsApp Item */}
                        <button
                          onClick={() => handleDirectWhatsAppItem(item)}
                          title={isAr ? 'طلب عبر واتساب' : 'Order via WhatsApp'}
                          className="p-2 bg-[#0c0a09] hover:bg-[#292524] text-[#d97706] border border-[#44403c] hover:border-[#d97706] transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>

                        {/* Add to Cart button */}
                        <button
                          onClick={() => {
                            if (item.options && item.options.length > 0) {
                              openItemModal(item);
                            } else {
                              onAddToCart(item, 1);
                              setAddedToast(item.id);
                              setTimeout(() => setAddedToast(null), 2000);
                            }
                          }}
                          className={`flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all ${
                            isItemAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#d97706] hover:bg-[#b45309] text-[#0c0a09]'
                          }`}
                        >
                          {isItemAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{isAr ? 'تمت الإضافة' : 'Added!'}</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>{isAr ? 'أضف للطلب' : 'Add'}</span>
                              {inCartCount > 0 && (
                                <span className="ml-1 px-1.5 py-0.2 bg-[#0c0a09] text-[#d97706] text-[10px]">
                                  {inCartCount}
                                </span>
                              )}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Item Customization Detail Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div 
            className="bg-[#1c1917] border border-[#d97706]/40 max-w-lg w-full overflow-hidden shadow-2xl max-h-[90vh] flex flex-col justify-between relative"
            id="item-customization-modal"
          >
            {/* Modal Header Image */}
            <div className="relative h-56 w-full bg-[#0c0a09]">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] via-transparent to-black/50"></div>
              
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 p-2 bg-[#0c0a09]/80 text-[#f5f5f4] hover:text-[#d97706] border border-[#44403c] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-serif text-white">
                    {isAr ? activeModalItem.nameAr : activeModalItem.name}
                  </h3>
                  <div className="text-xs text-[#d97706] font-sans tracking-wide">
                    {isAr ? activeModalItem.name : activeModalItem.nameAr}
                  </div>
                </div>
                <div className="text-sm font-mono font-bold text-[#d97706] bg-[#0c0a09] px-3.5 py-1.5 border border-[#d97706]">
                  AED {activeModalItem.price}
                </div>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-[#a8a29e]">
              
              <p className="text-[#f5f5f4] leading-relaxed text-sm font-light">
                {isAr ? activeModalItem.descriptionAr : activeModalItem.description}
              </p>

              {/* Prep & Calories Details */}
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#0c0a09] border border-[#292524] text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#d97706]" />
                  <span>{isAr ? 'وقت التحضير:' : 'Prep time:'} {activeModalItem.prepTime}</span>
                </div>
                {activeModalItem.calories && (
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#d97706]" />
                    <span>~{activeModalItem.calories} {isAr ? 'سعرة حرارية' : 'kcal'}</span>
                  </div>
                )}
              </div>

              {/* Custom Options */}
              {activeModalItem.options && activeModalItem.options.map((optGroup) => (
                <div key={optGroup.name} className="space-y-2.5 pt-3 border-t border-[#292524]">
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#d97706]">
                    {isAr ? optGroup.nameAr : optGroup.name}:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {optGroup.choices.map((choice) => {
                      const isSelected = modalOptions[optGroup.name] === choice.label;
                      return (
                        <button
                          key={choice.label}
                          type="button"
                          onClick={() => {
                            setModalOptions((prev) => ({
                              ...prev,
                              [optGroup.name]: choice.label,
                            }));
                          }}
                          className={`p-3 text-left border flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-[#d97706]/15 border-[#d97706] text-[#f5f5f4] font-semibold'
                              : 'bg-[#0c0a09] border-[#292524] text-[#a8a29e] hover:border-[#44403c]'
                          }`}
                        >
                          <span className="text-xs">{isAr ? choice.labelAr : choice.label}</span>
                          {choice.extraPrice ? (
                            <span className="text-[11px] text-[#d97706] font-mono font-bold">
                              +{choice.extraPrice} AED
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Special Instructions */}
              <div className="space-y-1.5 pt-3 border-t border-[#292524]">
                <label className="block text-xs uppercase tracking-wider font-bold text-[#a8a29e]">
                  {isAr ? 'ملاحظات خاصة للشيف (بهارات خفيفة، درجة الاستواء...):' : 'Special Kitchen Instructions (extra spicy, sauce on side):'}
                </label>
                <input
                  type="text"
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  placeholder={isAr ? 'مثال: بدون بصل، صوص ثوم إضافي...' : 'e.g. Extra spicy, garlic sauce on the side...'}
                  className="w-full px-3.5 py-2.5 bg-[#0c0a09] border border-[#292524] text-[#f5f5f4] text-xs focus:outline-none focus:border-[#d97706]"
                />
              </div>

            </div>

            {/* Modal Footer Controls */}
            <div className="p-5 bg-[#0c0a09] border-t border-[#292524] flex items-center justify-between gap-4">
              
              {/* Quantity Selector */}
              <div className="flex items-center gap-2 bg-[#1c1917] border border-[#44403c] p-1">
                <button
                  type="button"
                  onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                  className="w-8 h-8 bg-[#0c0a09] hover:bg-[#292524] text-[#f5f5f4] font-bold flex items-center justify-center transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-sm text-[#d97706] font-mono">
                  {modalQty}
                </span>
                <button
                  type="button"
                  onClick={() => setModalQty(modalQty + 1)}
                  className="w-8 h-8 bg-[#0c0a09] hover:bg-[#292524] text-[#f5f5f4] font-bold flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>

              {/* Submit Add */}
              <button
                type="button"
                onClick={handleModalAdd}
                className="flex-1 py-3 px-5 bg-[#d97706] hover:bg-[#b45309] text-[#0c0a09] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {isAr ? 'إضافة إلى الطلب' : 'Add to Order'} • AED {activeModalItem.price * modalQty}
                </span>
              </button>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
