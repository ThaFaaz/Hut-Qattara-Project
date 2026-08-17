import React, { useState } from 'react';
import { 
  CalendarDays, 
  Clock, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  Calendar, 
  ShieldCheck, 
  Phone, 
  User, 
  Mail, 
  Armchair, 
  Sun, 
  Flame,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, Reservation, SeatingPreference } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationSectionProps {
  lang: Language;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  // Form State
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState<string>('19:30');
  const [guests, setGuests] = useState<number>(4);
  const [seating, setSeating] = useState<SeatingPreference>('family');
  const [occasion, setOccasion] = useState<string>('Casual Dining');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Confirmation State
  const [completedReservation, setCompletedReservation] = useState<Reservation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Seating options
  const seatingOptions: { id: SeatingPreference; label: string; labelAr: string; desc: string; descAr: string; icon: any }[] = [
    {
      id: 'family',
      label: 'Family Dining Hall',
      labelAr: 'قسم العائلات الخاص',
      desc: 'Private air-conditioned suites for family dining',
      descAr: 'جلسات عائلية مريحة وخصوصية تامة مع تكييف ممتاز',
      icon: Users,
    },
    {
      id: 'majlis',
      label: 'Traditional Majlis',
      labelAr: 'المجلس العربي التراثي',
      desc: 'Authentic cushioned floor seating for mandi banquets',
      descAr: 'جلسة أرضية تراثية بالوسائد الفاخرة للولائم والمندي',
      icon: Armchair,
    },
    {
      id: 'outdoor',
      label: 'Garden Terrace',
      labelAr: 'الجلسات الخارجية بالهواء الطلق',
      desc: 'Open-air courtyard dining under pleasant evening breeze',
      descAr: 'تناول الطعام تحت سماء العين والنسيم العليل',
      icon: Sun,
    },
    {
      id: 'vip',
      label: 'VIP Private Salon',
      labelAr: 'الجناح الخاص VIP',
      desc: 'Dedicated secluded room for celebratory gatherings',
      descAr: 'غرفة خاصة للمناسبات والاجتماعات العائلية الكبرى',
      icon: Award,
    },
  ];

  // Common time slots
  const timeSlots = [
    { time: '08:00', label: '8:00 AM (Fawala Breakfast)', labelAr: '٨:٠٠ ص (فوالة الصباح)' },
    { time: '09:30', label: '9:30 AM (Breakfast)', labelAr: '٩:٣٠ ص (إفطار)' },
    { time: '11:00', label: '11:00 AM (Late Breakfast)', labelAr: '١١:٠٠ ص' },
    { time: '12:30', label: '12:30 PM (Lunch Feast)', labelAr: '١٢:٣٠ م (غداء)' },
    { time: '13:30', label: '1:30 PM (Mandi Special)', labelAr: '١:٣٠ م (وليمة مندي)' },
    { time: '15:00', label: '3:00 PM (Afternoon)', labelAr: '٣:٠٠ م' },
    { time: '18:30', label: '6:30 PM (Early Dinner)', labelAr: '٦:٣٠ م (عشاء مبكر)' },
    { time: '19:30', label: '7:30 PM (Dinner & Grills)', labelAr: '٧:٣٠ م (مشاوي وسهرة)' },
    { time: '20:30', label: '8:30 PM (Prime Dinner)', labelAr: '٨:٣٠ م (ذروة العشاء)' },
    { time: '21:30', label: '9:30 PM (Supper)', labelAr: '٩:٣٠ م (سهرة)' },
    { time: '23:00', label: '11:00 PM (Late Night)', labelAr: '١١:٠٠ م (آخر الليل)' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert(isAr ? 'يرجى إدخال الاسم ورقم الهاتف' : 'Please enter your name and phone number');
      return;
    }

    setIsSubmitting(true);

    const randomCode = 'HQ-' + Math.floor(1000 + Math.random() * 9000);
    const newReservation: Reservation = {
      id: Date.now().toString(),
      code: randomCode,
      fullName,
      phone,
      email: email || 'N/A',
      date,
      time,
      guests,
      seating,
      occasion,
      specialRequests,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    setTimeout(() => {
      setCompletedReservation(newReservation);
      setIsSubmitting(false);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d97706', '#f59e0b', '#78350f', '#ffffff'],
        });
      } catch (err) {
        // Safe fallback
      }
    }, 600);
  };

  const handleWhatsAppConfirmation = (res: Reservation) => {
    const text = isAr
      ? `مرحباً مطعم كوخ القطارة، أود تأكيد حجز طاولة:\n\n` +
        `• رقم الحجز: ${res.code}\n` +
        `• الاسم: ${res.fullName}\n` +
        `• التاريخ: ${res.date}\n` +
        `• الوقت: ${res.time}\n` +
        `• عدد الضيوف: ${res.guests} أشخاص\n` +
        `• نوع الجلسة: ${res.seating}\n` +
        (res.specialRequests ? `• ملاحظات: ${res.specialRequests}\n` : '') +
        `\nشكراً لكم.`
      : `Hello Hut Qattara Restaurant, I would like to confirm my table reservation:\n\n` +
        `• Reservation Code: ${res.code}\n` +
        `• Name: ${res.fullName}\n` +
        `• Date: ${res.date}\n` +
        `• Time: ${res.time}\n` +
        `• Guests: ${res.guests} People\n` +
        `• Seating: ${res.seating}\n` +
        (res.specialRequests ? `• Notes: ${res.specialRequests}\n` : '') +
        `\nThank you.`;

    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Google Calendar URL Generator
  const generateGoogleCalendarUrl = (res: Reservation) => {
    const startDateTime = new Date(`${res.date}T${res.time}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration

    const formatGCalDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const title = encodeURIComponent(`Dining at Hut Qattara Restaurant (${res.code})`);
    const details = encodeURIComponent(`Table reservation for ${res.guests} guests at Hut Qattara Restaurant, Al Qattara, Al Ain. Reservation Code: ${res.code}`);
    const location = encodeURIComponent('Hut Qattara Restaurant, Al Qattara, Al Ain, UAE');
    const dates = `${formatGCalDate(startDateTime)}/${formatGCalDate(endDateTime)}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  return (
    <section id="reservations" className="py-24 bg-[#0c0a09] text-[#f5f5f4] relative overflow-hidden border-t border-[#292524]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-[#78350f]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-[#451a03]/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex items-center justify-center gap-3">
            <span className="w-6 h-[1px] bg-[#d97706]"></span>
            <span className="text-[#d97706] uppercase tracking-[0.35em] text-xs font-bold font-sans">
              {isAr ? 'حجز طاولة فوري' : 'Table Reservation'}
            </span>
            <span className="w-6 h-[1px] bg-[#d97706]"></span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
            {isAr ? (
              <>احجز طاولتك في <span className="italic text-[#d97706]">كوخ القطارة</span></>
            ) : (
              <>Reserve Your Dining <span className="italic text-[#d97706]">Experience</span></>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#a8a29e] font-light leading-relaxed">
            {isAr
              ? 'استمتع بأجواء الضيافة الإماراتية الأصيلة. اختر نوع الجلسة (عائلية، مجلس عربي، خارجية) ونحن نجهز لكم أشهى الولائم والمشاوي.'
              : 'Guarantee your preferred seating in our private family halls, traditional Arabic Majlis, or outdoor terrace in Al Qattara, Al Ain.'
            }
          </p>
        </div>

        {/* Completed Reservation Confirmation Card */}
        {completedReservation ? (
          <div className="max-w-2xl mx-auto bg-[#1c1917] border border-[#d97706] p-8 sm:p-12 shadow-2xl space-y-8 animate-fade-in relative">
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-[#0c0a09] border border-[#d97706] rounded-full flex items-center justify-center mx-auto text-[#d97706] shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-serif text-white">
                {isAr ? 'تم تأكيد حجزكم بنجاح' : 'Reservation Confirmed'}
              </h3>
              <p className="text-[#a8a29e] text-xs sm:text-sm font-light">
                {isAr
                  ? 'نتطلع لاستقبالكم في مطعم كوخ القطارة. تم حفظ تفاصيل الحجز وتخصيص الجلسة المطلوبة.'
                  : 'We look forward to hosting you at Hut Qattara Restaurant. Your table has been reserved.'}
              </p>
            </div>

            {/* Ticket Box */}
            <div className="p-6 bg-[#0c0a09] border border-[#44403c] space-y-4">
              <div className="flex items-center justify-between border-b border-[#292524] pb-3">
                <span className="text-xs uppercase tracking-widest text-[#a8a29e]">{isAr ? 'رمز الحجز' : 'Booking Reference'}</span>
                <span className="text-lg font-mono font-bold text-[#d97706] border border-[#d97706]/60 px-3.5 py-1 bg-[#1c1917]">
                  {completedReservation.code}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="text-[#78716c] uppercase tracking-wider text-[10px]">{isAr ? 'الاسم' : 'Name'}</div>
                  <div className="font-semibold text-[#f5f5f4] mt-0.5">{completedReservation.fullName}</div>
                </div>
                <div>
                  <div className="text-[#78716c] uppercase tracking-wider text-[10px]">{isAr ? 'التاريخ والوقت' : 'Date & Time'}</div>
                  <div className="font-semibold text-[#d97706] mt-0.5 font-mono">
                    {completedReservation.date} @ {completedReservation.time}
                  </div>
                </div>
                <div>
                  <div className="text-[#78716c] uppercase tracking-wider text-[10px]">{isAr ? 'عدد الضيوف' : 'Guests'}</div>
                  <div className="font-semibold text-[#f5f5f4] mt-0.5">
                    {completedReservation.guests} {isAr ? 'أشخاص' : 'Guests'}
                  </div>
                </div>
                <div>
                  <div className="text-[#78716c] uppercase tracking-wider text-[10px]">{isAr ? 'نوع الجلسة' : 'Seating'}</div>
                  <div className="font-semibold text-[#f5f5f4] mt-0.5 capitalize">{completedReservation.seating}</div>
                </div>
                <div>
                  <div className="text-[#78716c] uppercase tracking-wider text-[10px]">{isAr ? 'المناسبة' : 'Occasion'}</div>
                  <div className="font-semibold text-[#f5f5f4] mt-0.5">{completedReservation.occasion}</div>
                </div>
                <div>
                  <div className="text-[#78716c] uppercase tracking-wider text-[10px]">{isAr ? 'الهاتف' : 'Phone'}</div>
                  <div className="font-semibold text-[#f5f5f4] mt-0.5 font-mono" dir="ltr">{completedReservation.phone}</div>
                </div>
              </div>

              {completedReservation.specialRequests && (
                <div className="pt-3 border-t border-[#292524] text-xs">
                  <span className="text-[#78716c] uppercase tracking-wider text-[10px]">{isAr ? 'ملاحظات:' : 'Notes:'} </span>
                  <span className="text-[#a8a29e]">{completedReservation.specialRequests}</span>
                </div>
              )}
            </div>

            {/* Confirmation Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleWhatsAppConfirmation(completedReservation)}
                className="flex items-center justify-center gap-2 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-[#0c0a09] font-bold text-xs uppercase tracking-widest transition-colors shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'تأكيد عبر واتساب' : 'WhatsApp Confirmation'}</span>
              </button>

              <a
                href={generateGoogleCalendarUrl(completedReservation)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3.5 bg-[#0c0a09] hover:bg-[#292524] text-[#f5f5f4] border border-[#44403c] hover:border-[#d97706] font-bold text-xs uppercase tracking-widest transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#d97706]" />
                <span>{isAr ? 'تقويم Google' : 'Google Calendar'}</span>
              </a>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setCompletedReservation(null)}
                className="text-xs uppercase tracking-widest text-[#a8a29e] hover:text-[#d97706] underline transition-colors"
              >
                {isAr ? 'حجز طاولة جديدة' : 'Make Another Reservation'}
              </button>
            </div>

          </div>
        ) : (
          /* Main Interactive Reservation Form */
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-[#1c1917] border border-[#292524] p-6 sm:p-12 shadow-2xl space-y-10">
            
            {/* Step 1: Date, Time & Guests */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 border-b border-[#292524] pb-3">
                <span className="w-6 h-6 bg-[#d97706] text-[#0c0a09] text-xs font-black flex items-center justify-center">1</span>
                <h3 className="text-sm uppercase tracking-widest font-bold text-[#d97706]">
                  {isAr ? 'التاريخ والوقت وعدد الضيوف' : 'Date, Time & Party Size'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Date Picker */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#a8a29e] flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-[#d97706]" />
                    <span>{isAr ? 'تاريخ الحجز:' : 'Date:'}</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-3.5 py-3 bg-[#0c0a09] border border-[#44403c] text-[#f5f5f4] text-xs focus:outline-none focus:border-[#d97706] transition-colors"
                    id="reservation-date-input"
                  />
                </div>

                {/* Time Picker */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#a8a29e] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#d97706]" />
                    <span>{isAr ? 'الوقت:' : 'Time:'}</span>
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3.5 py-3 bg-[#0c0a09] border border-[#44403c] text-[#f5f5f4] text-xs focus:outline-none focus:border-[#d97706] transition-colors"
                    id="reservation-time-select"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts.time} value={ts.time}>
                        {isAr ? ts.labelAr : ts.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Party Size Selector */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#a8a29e] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#d97706]" />
                    <span>{isAr ? 'عدد الضيوف:' : 'Party Size:'}</span>
                  </label>
                  <div className="flex items-center gap-2 bg-[#0c0a09] border border-[#44403c] px-3 py-1.5">
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-8 h-8 bg-[#1c1917] hover:bg-[#292524] text-[#f5f5f4] font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-[#d97706] text-xs font-mono">
                      {guests} {isAr ? 'ضيوف' : 'Guests'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuests(guests + 1)}
                      className="w-8 h-8 bg-[#1c1917] hover:bg-[#292524] text-[#f5f5f4] font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Seating Preference */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 border-b border-[#292524] pb-3">
                <span className="w-6 h-6 bg-[#d97706] text-[#0c0a09] text-xs font-black flex items-center justify-center">2</span>
                <h3 className="text-sm uppercase tracking-widest font-bold text-[#d97706]">
                  {isAr ? 'نوع الجلسة والمحيط' : 'Seating Preference'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {seatingOptions.map((opt) => {
                  const isSelected = seating === opt.id;
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSeating(opt.id)}
                      className={`p-5 text-left border transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#d97706]/15 border-[#d97706] shadow-xl text-[#f5f5f4]'
                          : 'bg-[#0c0a09] border-[#292524] text-[#a8a29e] hover:border-[#44403c] hover:text-[#f5f5f4]'
                      }`}
                      id={`seating-opt-${opt.id}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-[#d97706]' : 'text-[#78716c]'}`} />
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#d97706]"></span>
                        )}
                      </div>
                      <div>
                        <div className={`font-serif text-sm ${isSelected ? 'text-[#d97706]' : 'text-[#f5f5f4]'}`}>
                          {isAr ? opt.labelAr : opt.label}
                        </div>
                        <div className="text-[11px] text-[#a8a29e] mt-1.5 leading-snug font-light">
                          {isAr ? opt.descAr : opt.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Contact Details & Occasion */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 border-b border-[#292524] pb-3">
                <span className="w-6 h-6 bg-[#d97706] text-[#0c0a09] text-xs font-black flex items-center justify-center">3</span>
                <h3 className="text-sm uppercase tracking-widest font-bold text-[#d97706]">
                  {isAr ? 'معلومات الضيف والمناسبة' : 'Guest Information & Occasion'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#a8a29e] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#d97706]" />
                    <span>{isAr ? 'الاسم الكامل *:' : 'Full Name *:'}</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isAr ? 'مثال: محمد الظاهري' : 'e.g. Sultan Al Nuaimi'}
                    required
                    className="w-full px-3.5 py-3 bg-[#0c0a09] border border-[#44403c] text-[#f5f5f4] text-xs focus:outline-none focus:border-[#d97706]"
                    id="reservation-name-input"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#a8a29e] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#d97706]" />
                    <span>{isAr ? 'رقم الهاتف / الواتساب *:' : 'Mobile / WhatsApp *:'}</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 5X XXX XXXX"
                    required
                    dir="ltr"
                    className="w-full px-3.5 py-3 bg-[#0c0a09] border border-[#44403c] text-[#f5f5f4] text-xs focus:outline-none focus:border-[#d97706]"
                    id="reservation-phone-input"
                  />
                </div>

                {/* Email (optional) */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#a8a29e] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#d97706]" />
                    <span>{isAr ? 'البريد الإلكتروني (اختياري):' : 'Email (Optional):'}</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-3 bg-[#0c0a09] border border-[#44403c] text-[#f5f5f4] text-xs focus:outline-none focus:border-[#d97706]"
                  />
                </div>

                {/* Occasion */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#a8a29e] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
                    <span>{isAr ? 'المناسبة:' : 'Dining Occasion:'}</span>
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3.5 py-3 bg-[#0c0a09] border border-[#44403c] text-[#f5f5f4] text-xs focus:outline-none focus:border-[#d97706]"
                  >
                    <option value="Casual Dining">{isAr ? 'عشاء / غداء عادي' : 'Casual Dining'}</option>
                    <option value="Family Gathering">{isAr ? 'جمعة عائلية' : 'Family Gathering'}</option>
                    <option value="Birthday Celebration">{isAr ? 'احتفال عيد ميلاد' : 'Birthday Celebration'}</option>
                    <option value="Business Lunch">{isAr ? 'لقاء عمل' : 'Business Lunch / Meeting'}</option>
                    <option value="Traditional Feast">{isAr ? 'وليمة مندي ومشاوي' : 'Traditional Feast'}</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-bold text-[#a8a29e]">
                  {isAr ? 'طلبات خاصة (كراسي أطفال، طاولة هادئة، تجهيز مسبق...):' : 'Special Requirements (high chair, quiet corner, etc.):'}
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder={isAr ? 'أخبرنا إذا كان لديك أي تفضيل خاص...' : 'Let us know if you have any special dining preferences...'}
                  className="w-full px-3.5 py-2.5 bg-[#0c0a09] border border-[#44403c] text-[#f5f5f4] text-xs focus:outline-none focus:border-[#d97706]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-[#292524] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#a8a29e]">
                <ShieldCheck className="w-4 h-4 text-[#d97706]" />
                <span>{isAr ? 'تأكيد فوري مجاني بدون رسوم مسبقة' : 'Instant free reservation confirmation'}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                id="submit-reservation-btn"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#d97706] hover:bg-[#b45309] text-[#0c0a09] font-bold text-xs uppercase tracking-widest shadow-xl transition-all disabled:opacity-50"
              >
                {isSubmitting 
                  ? (isAr ? 'جاري التأكيد...' : 'Confirming...') 
                  : (isAr ? 'تأكيد حجز الطاولة' : 'Confirm Table Reservation')
                }
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
