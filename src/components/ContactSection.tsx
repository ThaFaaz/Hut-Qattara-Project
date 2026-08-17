import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  Send, 
  CheckCircle2, 
  PartyPopper, 
  Copy, 
  Check
} from 'lucide-react';
import { Language } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [formName, setFormName] = useState<string>('');
  const [formPhone, setFormPhone] = useState<string>('');
  const [formSubject, setFormSubject] = useState<string>('General Inquiry');
  const [formMessage, setFormMessage] = useState<string>('');
  const [isSent, setIsSent] = useState<boolean>(false);

  const copyToClipboard = (phoneText: string) => {
    navigator.clipboard.writeText(phoneText);
    setCopiedPhone(phoneText);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) {
      alert(isAr ? 'يرجى إدخال الاسم ورقم الهاتف' : 'Please fill in name and phone');
      return;
    }

    const formattedText = isAr
      ? `استفسار جديد لمطعم كوخ القطارة:\n` +
        `• الاسم: ${formName}\n` +
        `• الهاتف: ${formPhone}\n` +
        `• الموضوع: ${formSubject}\n` +
        `• الرسالة: ${formMessage}`
      : `New Inquiry for Hut Qattara Restaurant:\n` +
        `• Name: ${formName}\n` +
        `• Phone: ${formPhone}\n` +
        `• Subject: ${formSubject}\n` +
        `• Message: ${formMessage}`;

    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(formattedText)}`, '_blank');
    setIsSent(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#0c0a09] text-[#f5f5f4] relative overflow-hidden border-t border-[#292524]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#78350f]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-[#451a03]/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex items-center justify-center gap-3">
            <span className="w-6 h-[1px] bg-[#d97706]"></span>
            <span className="text-[#d97706] uppercase tracking-[0.35em] text-xs font-bold font-sans">
              {isAr ? 'تواصل وطلبات المطعم' : 'Direct Concierge'}
            </span>
            <span className="w-6 h-[1px] bg-[#d97706]"></span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
            {isAr ? (
              <>يسعدنا خدمتكم في <span className="italic text-[#d97706]">أي وقت</span></>
            ) : (
              <>Connect with Our <span className="italic text-[#d97706]">Hospitality Team</span></>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#a8a29e] font-light leading-relaxed">
            {isAr
              ? 'للطلبات السريعة، التوصيل للمنازل، أو حجز الولائم والمناسبات الخاصة، تواصل معنا عبر الهاتف أو الواتساب مباشرة.'
              : 'Call us directly, message via WhatsApp for swift home delivery, or send an inquiry for catering and large family gatherings.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Phone & WhatsApp Touchpoints */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone Numbers List Card */}
            <div className="p-6 sm:p-8 bg-[#1c1917] border border-[#292524] shadow-xl space-y-5">
              <h3 className="font-serif text-lg text-white flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d97706]" />
                <span>{isAr ? 'أرقام الاتصال المباشرة' : 'Direct Phone Lines'}</span>
              </h3>

              <div className="space-y-3">
                {RESTAURANT_INFO.phoneNumbers.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#0c0a09] border border-[#292524] flex items-center justify-between hover:border-[#d97706]/50 transition-colors"
                  >
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#a8a29e] font-bold">{p.label}</div>
                      <a
                        href={`tel:${p.raw}`}
                        className="text-sm font-mono font-bold text-[#d97706] hover:underline block mt-0.5"
                        dir="ltr"
                      >
                        {p.number}
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(p.number)}
                        className="p-2.5 bg-[#1c1917] hover:bg-[#292524] text-[#a8a29e] hover:text-white transition-colors border border-[#44403c]"
                        title="Copy phone number"
                      >
                        {copiedPhone === p.number ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href={`tel:${p.raw}`}
                        className="p-2.5 bg-[#d97706] hover:bg-[#b45309] text-[#0c0a09] font-bold transition-colors"
                        title="Call now"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="p-6 sm:p-8 bg-[#1c1917] border border-emerald-500/30 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0c0a09] border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-white">
                    {isAr ? 'الدردشة الفورية عبر الواتساب' : 'Instant WhatsApp Service'}
                  </h4>
                  <p className="text-xs text-emerald-400 font-medium">
                    {isAr ? 'رد فوري لتأكيد الطلبات والتوصيل' : 'Fast replies for orders & delivery'}
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#a8a29e] leading-relaxed font-light">
                {isAr
                  ? 'أرسل لنا طلبك أو استفسارك وسيتم الرد عليك مباشرة من قبل طاقم المطعم.'
                  : 'Chat directly with our kitchen team to place your takeaway, home delivery, or customized catering order.'
                }
              </p>

              <a
                href={RESTAURANT_INFO.whatsappDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-[#0c0a09] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg"
                id="contact-whatsapp-chat-btn"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'فتح المحادثة في واتساب' : 'Start WhatsApp Chat'}</span>
              </a>
            </div>

            {/* Catering & Bulk Orders Note */}
            <div className="p-6 bg-[#1c1917] border border-[#d97706]/40 space-y-2">
              <div className="flex items-center gap-2 text-[#d97706] font-bold text-xs uppercase tracking-wider">
                <PartyPopper className="w-4 h-4" />
                <span>{isAr ? 'تجهيز الولائم والحفلات الخارجية:' : 'Catering & Majlis Feasts:'}</span>
              </div>
              <p className="text-xs text-[#a8a29e] leading-relaxed font-light">
                {isAr
                  ? 'نوفر صواني المشاوي الكبرى وأوزي اللحم والمندي للمناسبات الخاصة والشركات في العين بأسعار مميزة.'
                  : 'Custom whole-lamb Ouzi, massive Mandi trays, and charcoal BBQ platters for family occasions across Al Ain.'
                }
              </p>
            </div>

          </div>

          {/* Right Column: Quick Message Form */}
          <div className="lg:col-span-7 bg-[#1c1917] border border-[#292524] p-6 sm:p-10 shadow-2xl space-y-6">
            
            <div className="space-y-1 border-b border-[#292524] pb-4">
              <h3 className="font-serif text-lg text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d97706]" />
                <span>{isAr ? 'أرسل استفسار أو طلب خاص' : 'Send an Inquiry / Message'}</span>
              </h3>
              <p className="text-xs text-[#a8a29e] font-light">
                {isAr ? 'سيتم إرسال رسالتك فوراً إلى فريق خدمة العملاء.' : 'Fill the form to connect directly with our Al Ain branch.'}
              </p>
            </div>

            {isSent ? (
              <div className="p-10 text-center space-y-3 bg-[#0c0a09] border border-emerald-500/40 animate-fade-in">
                <div className="w-12 h-12 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg text-white">
                  {isAr ? 'تم إرسال رسالتك بنجاح' : 'Message Dispatched'}
                </h4>
                <p className="text-xs text-[#a8a29e]">
                  {isAr ? 'شكراً لتواصلك مع مطعم كوخ القطارة.' : 'Thank you for reaching out to Hut Qattara Restaurant.'}
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-3 text-xs uppercase tracking-widest text-[#d97706] hover:underline"
                >
                  {isAr ? 'إرسال رسالة أخرى' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider font-bold text-[#a8a29e]">
                      {isAr ? 'الاسم الكريم *:' : 'Your Name *:'}
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder={isAr ? 'محمد الظاهري' : 'e.g. Mansoor Al Dhaheri'}
                      required
                      className="w-full px-3.5 py-3 bg-[#0c0a09] border border-[#44403c] text-[#f5f5f4] text-xs focus:outline-none focus:border-[#d97706]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider font-bold text-[#a8a29e]">
                      {isAr ? 'رقم الهاتف *:' : 'Phone Number *:'}
                    </label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="+971 5X XXX XXXX"
                      required
                      dir="ltr"
                      className="w-full px-3.5 py-3 bg-[#0c0a09] border border-[#44403c] text-[#f5f5f4] text-xs focus:outline-none focus:border-[#d97706]"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#a8a29e]">
                    {isAr ? 'موضوع الاستفسار:' : 'Inquiry Topic:'}
                  </label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-3.5 py-3 bg-[#0c0a09] border border-[#44403c] text-[#f5f5f4] text-xs focus:outline-none focus:border-[#d97706]"
                  >
                    <option value="Home Delivery">{isAr ? 'طلب توصيل منزلي' : 'Home Delivery Inquiry'}</option>
                    <option value="Party & Catering">{isAr ? 'وليمة / بوفيه ومناسبات' : 'Catering & Bulk Order'}</option>
                    <option value="Table Reservation">{isAr ? 'استفسار عن حجز طاولة' : 'Table Reservation Query'}</option>
                    <option value="General Question">{isAr ? 'سؤال عام' : 'General Feedback / Question'}</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#a8a29e]">
                    {isAr ? 'الرسالة أو تفاصيل الطلب:' : 'Your Message / Order Details:'}
                  </label>
                  <textarea
                    rows={4}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder={isAr ? 'اكتب استفسارك أو تفاصيل الوليمة هنا...' : 'Write your request or event details here...'}
                    className="w-full px-3.5 py-3 bg-[#0c0a09] border border-[#44403c] text-[#f5f5f4] text-xs focus:outline-none focus:border-[#d97706]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#d97706] hover:bg-[#b45309] text-[#0c0a09] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl"
                >
                  <Send className="w-4 h-4" />
                  <span>{isAr ? 'إرسال الاستفسار عبر واتساب' : 'Dispatch via WhatsApp'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
