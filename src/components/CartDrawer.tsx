import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  MessageCircle, 
  Bike, 
  Store
} from 'lucide-react';
import { Language, CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  lang: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  lang,
}) => {
  const isAr = lang === 'ar';
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('delivery');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [customerNotes, setCustomerNotes] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => {
    return sum + item.item.price * item.quantity;
  }, 0);

  const deliveryFee = orderType === 'delivery' ? (subtotal > 100 ? 0 : 7) : 0;
  const total = subtotal + deliveryFee;

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;

    let itemsListText = cart
      .map((c, i) => {
        const name = isAr ? c.item.nameAr : c.item.name;
        const opts = c.selectedOptions ? ` (${Object.values(c.selectedOptions).join(', ')})` : '';
        const notes = c.specialInstructions ? ` [ملاحظة: ${c.specialInstructions}]` : '';
        return `${i + 1}. ${name} x${c.quantity}${opts}${notes} = AED ${c.item.price * c.quantity}`;
      })
      .join('\n');

    const formattedOrder = isAr
      ? `طلب جديد من موقع مطعم كوخ القطارة:\n\n` +
        `• نوع الطلب: ${orderType === 'delivery' ? 'توصيل منزلي' : 'استلام من المطعم سفري'}\n` +
        (customerName ? `• الاسم: ${customerName}\n` : '') +
        (orderType === 'delivery' && customerAddress ? `• العنوان في العين: ${customerAddress}\n` : '') +
        (customerNotes ? `• ملاحظات التوصيل: ${customerNotes}\n` : '') +
        `\nالأصناف المطلوبة:\n${itemsListText}\n\n` +
        `• المجموع الفرعي: AED ${subtotal}\n` +
        (deliveryFee > 0 ? `• رسوم التوصيل: AED ${deliveryFee}\n` : '• التوصيل: مجاني (أكثر من 100 درهم)\n') +
        `• الإجمالي النهائي: AED ${total}\n\n` +
        `يرجى تأكيد استلام الطلب وتحديد الوقت التقريبي للوصول. شكراً.`
      : `New Order from Hut Qattara Website:\n\n` +
        `• Order Type: ${orderType === 'delivery' ? 'Home Delivery' : 'Takeaway / Pickup'}\n` +
        (customerName ? `• Name: ${customerName}\n` : '') +
        (orderType === 'delivery' && customerAddress ? `• Delivery Address: ${customerAddress}\n` : '') +
        (customerNotes ? `• Notes: ${customerNotes}\n` : '') +
        `\nItems Ordered:\n${itemsListText}\n\n` +
        `• Subtotal: AED ${subtotal}\n` +
        (deliveryFee > 0 ? `• Delivery Fee: AED ${deliveryFee}\n` : '• Delivery: FREE\n') +
        `• Total Amount: AED ${total}\n\n` +
        `Please confirm this order and let me know estimated time. Thank you!`;

    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(formattedOrder)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      ></div>

      <div className={`fixed inset-y-0 ${isAr ? 'left-0' : 'right-0'} max-w-md w-full bg-[#0c0a09] border-${isAr ? 'r' : 'l'} border-[#292524] shadow-2xl flex flex-col justify-between z-10 text-[#f5f5f4]`}>
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#292524] flex items-center justify-between bg-[#1c1917]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0c0a09] border border-[#d97706] flex items-center justify-center text-[#d97706]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base text-white">
                {isAr ? 'سلة الطلبات' : 'Curated Order Bag'}
              </h3>
              <span className="text-[11px] uppercase tracking-wider text-[#d97706] font-mono font-bold">
                {cart.length} {isAr ? 'أصناف مختارة' : 'items selected'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#a8a29e] hover:text-[#d97706] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          
          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <div className="w-16 h-16 border border-[#292524] flex items-center justify-center mx-auto text-[#78716c]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div className="font-serif text-base text-[#f5f5f4]">
                {isAr ? 'سلتك فارغة حالياً' : 'Your order bag is empty'}
              </div>
              <p className="text-[#a8a29e] text-xs max-w-xs mx-auto font-light">
                {isAr ? 'استعرض أطايب المشاوي والمندي وأضف ما تشتهي إلى طلبك.' : 'Explore our flame-kissed grills, fragrant Mandi, and breakfast menu.'}
              </p>
            </div>
          ) : (
            <>
              {/* Order Items List */}
              <div className="space-y-3">
                {cart.map((cartItem, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#1c1917] border border-[#292524] flex items-start gap-3 justify-between"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="font-serif text-sm text-[#f5f5f4]">
                        {isAr ? cartItem.item.nameAr : cartItem.item.name}
                      </div>
                      
                      {cartItem.selectedOptions && Object.keys(cartItem.selectedOptions).length > 0 && (
                        <div className="text-[11px] text-[#d97706]">
                          {Object.entries(cartItem.selectedOptions).map(([k, v]) => `${k}: ${v}`).join(' • ')}
                        </div>
                      )}

                      {cartItem.specialInstructions && (
                        <div className="text-[10px] text-[#a8a29e] italic">
                          "{cartItem.specialInstructions}"
                        </div>
                      )}

                      <div className="font-mono font-bold text-[#d97706] text-xs pt-1">
                        AED {cartItem.item.price * cartItem.quantity}
                      </div>
                    </div>

                    {/* Quantity & Delete Controls */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-[#78716c] hover:text-red-400 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1 bg-[#0c0a09] border border-[#44403c] px-1 py-0.5">
                        <button
                          onClick={() => onUpdateQty(idx, cartItem.quantity - 1)}
                          className="w-5 h-5 bg-[#1c1917] text-[#f5f5f4] flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-bold text-xs text-[#d97706] font-mono">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(idx, cartItem.quantity + 1)}
                          className="w-5 h-5 bg-[#1c1917] text-[#f5f5f4] flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Options: Delivery vs Takeaway */}
              <div className="pt-4 border-t border-[#292524] space-y-3">
                <label className="block uppercase tracking-wider text-[11px] font-bold text-[#a8a29e]">
                  {isAr ? 'نوع الاستلام:' : 'Fulfillment Preference:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`p-3 border flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider transition-colors ${
                      orderType === 'delivery'
                        ? 'bg-[#d97706]/15 border-[#d97706] text-[#d97706]'
                        : 'bg-[#1c1917] border-[#292524] text-[#a8a29e] hover:border-[#44403c]'
                    }`}
                  >
                    <Bike className="w-4 h-4" />
                    <span>{isAr ? 'توصيل للمنزل' : 'Home Delivery'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`p-3 border flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider transition-colors ${
                      orderType === 'takeaway'
                        ? 'bg-[#d97706]/15 border-[#d97706] text-[#d97706]'
                        : 'bg-[#1c1917] border-[#292524] text-[#a8a29e] hover:border-[#44403c]'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>{isAr ? 'استلام سفري' : 'Takeaway'}</span>
                  </button>
                </div>

                {/* Name & Address Inputs */}
                <div className="space-y-2.5 pt-2">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={isAr ? 'الاسم الكريم' : 'Your Name'}
                    className="w-full px-3.5 py-2.5 bg-[#1c1917] border border-[#44403c] text-[#f5f5f4] text-xs focus:outline-none focus:border-[#d97706]"
                  />

                  {orderType === 'delivery' && (
                    <input
                      type="text"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder={isAr ? 'عنوان التوصيل في العين (المنطقة، الشارع، الفيلا...)' : 'Delivery Address in Al Ain (Area, Street, Villa)'}
                      className="w-full px-3.5 py-2.5 bg-[#1c1917] border border-[#44403c] text-[#f5f5f4] text-xs focus:outline-none focus:border-[#d97706]"
                    />
                  )}

                  <input
                    type="text"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder={isAr ? 'ملاحظات إضافية (الدفع كاش أو بطاقة، توقيت...)' : 'Any notes (cash/card on delivery, time...)'}
                    className="w-full px-3.5 py-2.5 bg-[#1c1917] border border-[#44403c] text-[#f5f5f4] text-xs focus:outline-none focus:border-[#d97706]"
                  />
                </div>
              </div>
            </>
          )}

        </div>

        {/* Drawer Footer Total & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#292524] bg-[#1c1917] space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#a8a29e]">
                <span className="uppercase tracking-wider text-[11px]">{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
                <span className="font-mono text-[#f5f5f4]">AED {subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-[#a8a29e]">
                <span className="uppercase tracking-wider text-[11px]">{isAr ? 'رسوم التوصيل' : 'Delivery Fee'}</span>
                <span className="font-mono text-[#f5f5f4]">{deliveryFee === 0 ? (isAr ? 'مجاني' : 'FREE') : `AED ${deliveryFee}`}</span>
              </div>
              <div className="flex items-center justify-between text-white font-bold text-sm pt-2 border-t border-[#292524]">
                <span className="font-serif text-base">{isAr ? 'الإجمالي النهائي' : 'Grand Total'}</span>
                <span className="text-[#d97706] font-mono text-lg font-bold">AED {total}</span>
              </div>
            </div>

            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-[#0c0a09] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl"
              id="whatsapp-checkout-btn"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isAr ? 'إرسال الطلب للمطعم عبر واتساب' : 'Dispatch Order via WhatsApp'}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
