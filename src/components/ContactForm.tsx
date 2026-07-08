import { useState, FormEvent } from 'react';
import { Send, Phone, MessageCircle, Calculator, CheckCircle2 } from 'lucide-react';
import { UI_TRANSLATIONS } from '../data';
import { Language } from '../types';

interface ContactFormProps {
  language: Language;
}

export default function ContactForm({ language }: ContactFormProps) {
  // Contact form state
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Estimator state
  const [mirrorType, setMirrorType] = useState('backlit');
  const [width, setWidth] = useState(80);
  const [height, setHeight] = useState(100);
  const [hasTouch, setHasTouch] = useState(true);
  const [hasDemister, setHasDemister] = useState(false);

  const t = (key: string) => UI_TRANSLATIONS[key]?.[language] || '';
  const isRtl = language === 'fa';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullname || !phone) return;

    // Simulate submission to server (or store in localstorage)
    const newLead = {
      id: Date.now(),
      fullname,
      phone,
      message,
      type: 'callback',
      timestamp: new Date().toISOString(),
    };

    const existingLeads = JSON.parse(localStorage.getItem('azin_leads') || '[]');
    existingLeads.push(newLead);
    localStorage.setItem('azin_leads', JSON.stringify(existingLeads));

    setIsSubmitted(true);
    setFullname('');
    setPhone('');
    setMessage('');

    setTimeout(() => {
      setIsSubmitted(false);
    }, 6000);
  };

  // Price calculation model (Iran Rials or Toman - very authentic, and English showing Dollars or relative units)
  // Let's use Tomans for Persian and roughly USD or relative currency for English
  const getEstimatedPrice = () => {
    const areaSqM = (width * height) / 10000;
    let basePricePerSqM = 3200000; // Toman base for basic super clear LED backlit
    if (mirrorType === 'asymmetric') basePricePerSqM = 3900000;
    if (mirrorType === 'smart') basePricePerSqM = 4500000;

    let cost = areaSqM * basePricePerSqM;
    
    // Add sensors
    if (hasTouch) cost += 450000; // 450k Toman touch sensor
    if (hasDemister) cost += 650000; // 650k Toman anti-fog pad

    // Minimum charge for very small sizes
    if (cost < 1800000) cost = 1800000;

    return Math.round(cost);
  };

  const getPriceString = () => {
    const priceToman = getEstimatedPrice();
    if (language === 'fa') {
      return `${priceToman.toLocaleString('fa-IR')} تومان`;
    } else {
      // rough USD conversion
      const usd = Math.round(priceToman / 60000); // rough conversion rate
      return `$${usd} USD (Approx.)`;
    }
  };

  // WhatsApp specification forwarder
  const handleWhatsAppForward = () => {
    const typeLabel = mirrorType === 'backlit' 
      ? (language === 'fa' ? 'بک‌لایت استاندارد' : 'Standard Backlit')
      : mirrorType === 'asymmetric'
      ? (language === 'fa' ? 'دکوراتیو نامتقارن' : 'Asymmetric Decorative')
      : (language === 'fa' ? 'هوشمند پلاس' : 'Smart Touch Plus');

    const options = [];
    if (hasTouch) options.push(language === 'fa' ? 'سنسور لمسی (تاچ)' : 'Touch Sensor');
    if (hasDemister) options.push(language === 'fa' ? 'پد هیتر ضد بخار' : 'Anti-Fog Demister');

    const text = language === 'fa'
      ? `سلام صنایع آینه آذین. من از سایت شما بازدید کردم و استعلام قیمت آینه سفارشی دارم:\n\n` +
        `🔹 نوع آینه: ${typeLabel}\n` +
        `📏 ابعاد: ${width} در ${height} سانتی‌متر\n` +
        `🛠 امکانات: ${options.length > 0 ? options.join(' + ') : 'بدون آپشن مازاد'}\n` +
        `💰 حدود قیمت تقریبی سایت: ${getPriceString()}\n\n` +
        `لطفا زمان تولید و هزینه نهایی به همراه ارسال و نصب را برای بنده ارسال بفرمایید. تشکر.`
      : `Hello Azin Mirror, I am interested in a custom mirror quote from your website:\n\n` +
        `🔹 Mirror Type: ${typeLabel}\n` +
        `📏 Dimensions: ${width}cm × ${height}cm\n` +
        `🛠 Options: ${options.length > 0 ? options.join(' + ') : 'Standard'}\n` +
        `💰 Rough estimate: ${getPriceString()}\n\n` +
        `Please provide delivery time and final price including professional installation in Tehran. Thanks!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/989123581220?text=${encodedText}`, '_blank');
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start`} id="contact-form-section">
      
      {/* Real-time Interactive Estimate Calculator (Left 7 Columns on desktop) */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-none border border-slate-100" id="mirror-estimator-card">
        <div className={`flex items-center gap-3 mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div className="p-2.5 bg-slate-50 rounded-none border border-slate-100">
            <Calculator className="w-5 h-5 text-slate-900" />
          </div>
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <h3 className="text-lg font-bold text-slate-900 font-sans">
              {language === 'fa' ? 'محاسبه‌گر و استعلام آنلاین قیمت' : 'Interactive Custom Mirror Estimator'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'fa' ? 'ابعاد و گزینه‌ها را مشخص کنید و قیمت حدودی را دریافت کنید' : 'Configure specifications for an instant rough estimate'}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Mirror Type Selection */}
          <div className={isRtl ? 'text-right font-sans' : 'text-left'}>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              {language === 'fa' ? 'نوع آینه' : 'Mirror Design Style'}
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'backlit', en: 'LED Backlit', fa: 'بک‌لایت لوکس' },
                { id: 'asymmetric', en: 'Decorative', fa: 'دفرمه دکوراتیو' },
                { id: 'smart', en: 'Smart Touch', fa: 'هوشمند تاچ‌دار' },
              ].map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setMirrorType(style.id)}
                  className={`py-3 px-2 text-xs font-semibold border transition-all cursor-pointer text-center rounded-none ${
                    mirrorType === style.id
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-slate-400'
                  }`}
                >
                  {language === 'fa' ? style.fa : style.en}
                </button>
              ))}
            </div>
          </div>

          {/* Width and Height Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <div className="flex justify-between mb-2">
                <span className="text-[10px] text-slate-400">
                  {language === 'fa' ? 'سفارشی از ۴۰ تا ۲۴۰ سانتی‌متر' : '40cm to 240cm'}
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {language === 'fa' ? `${width} سانتی‌متر` : `${width} cm`}
                </span>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {language === 'fa' ? 'عرض آینه (Width)' : 'Width'}
                </label>
              </div>
              <input
                type="range"
                min="40"
                max="240"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full h-1 bg-slate-100 rounded-none appearance-none cursor-pointer accent-slate-900"
              />
            </div>

            <div className={isRtl ? 'text-right' : 'text-left'}>
              <div className="flex justify-between mb-2">
                <span className="text-[10px] text-slate-400">
                  {language === 'fa' ? 'سفارشی از ۴۰ تا ۱۶0 سانتی‌متر' : '40cm to 160cm'}
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {language === 'fa' ? `${height} سانتی‌متر` : `${height} cm`}
                </span>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {language === 'fa' ? 'ارتفاع آینه (Height)' : 'Height'}
                </label>
              </div>
              <input
                type="range"
                min="40"
                max="160"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-1 bg-slate-100 rounded-none appearance-none cursor-pointer accent-slate-900"
              />
            </div>
          </div>

          {/* Electronic Options / Upgrades */}
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              {language === 'fa' ? 'امکانات الکترونیکی سفارشی' : 'Interactive Features'}
            </label>
            <div className={`flex flex-col sm:flex-row gap-3 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
              <button
                type="button"
                onClick={() => setHasTouch(!hasTouch)}
                className={`flex-1 flex items-center justify-between p-3.5 border transition-all cursor-pointer rounded-none ${
                  hasTouch
                    ? 'border-slate-900 bg-slate-50 text-slate-900'
                    : 'border-slate-200 bg-white text-slate-400'
                }`}
              >
                <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${hasTouch ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300'}`}>
                  {hasTouch && <span className="block w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
                <span className="text-xs font-bold">
                  {language === 'fa' ? 'سنسور تاچ لمسی (+۴۵۰هزار)' : 'Direct Touch Sensor'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setHasDemister(!hasDemister)}
                className={`flex-1 flex items-center justify-between p-3.5 border transition-all cursor-pointer rounded-none ${
                  hasDemister
                    ? 'border-slate-900 bg-slate-50 text-slate-900'
                    : 'border-slate-200 bg-white text-slate-400'
                }`}
              >
                <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${hasDemister ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300'}`}>
                  {hasDemister && <span className="block w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
                <span className="text-xs font-bold">
                  {language === 'fa' ? 'المنت ضدبخار حمام (+۶۵۰هزار)' : 'Anti-Fog Demister Pad'}
                </span>
              </button>
            </div>
          </div>

          {/* Pricing display & WhatsApp CTA */}
          <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50 -mx-6 sm:-mx-8 px-6 sm:px-8 pb-6 rounded-none">
            <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
              <div className={isRtl ? 'text-right' : 'text-left'}>
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-bold">
                  {language === 'fa' ? 'برآورد هزینه تقریبی کارخانه' : 'Estimated Direct Factory Price'}
                </span>
                <span className="text-2xl font-bold text-slate-900 mt-1 block">
                  {getPriceString()}
                </span>
              </div>

              <button
                type="button"
                onClick={handleWhatsAppForward}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs tracking-wider uppercase transition-all cursor-pointer rounded-none"
                id="submit-spec-whatsapp-btn"
              >
                <MessageCircle className="w-4 h-4" />
                <span>
                  {language === 'fa' ? 'ارسال فاکتور مستقیم به واتس‌اپ' : 'Send Spec to WhatsApp'}
                </span>
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-3 text-center">
              {language === 'fa' 
                ? 'قیمت فوق بر اساس متراژ متریال اردکان و قطعات مرغوب بازار محاسبه شده است و نهایی نیست.' 
                : 'Indicative factory price. Actual price depends on finalized shape cuts and bulk discounts.'}
            </p>
          </div>

        </div>
      </div>

      {/* Traditional Form & Immediate Call (Right 5 Columns) */}
      <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-none border border-slate-100" id="quote-request-card">
        <h3 className={`text-lg font-bold text-slate-900 mb-1 ${isRtl ? 'text-right' : 'text-left'}`} id="form-title">
          {t('contactFormTitle')}
        </h3>
        <p className={`text-xs text-slate-400 mb-6 ${isRtl ? 'text-right' : 'text-left'}`}>
          {language === 'fa' ? 'فرمت زیر را پر کنید؛ تیم پشتیبانی ما سریعا با شما تماس می‌گیرد.' : 'Provide details below and our team will get back to you shortly.'}
        </p>

        {isSubmitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center" id="form-success-container">
            <CheckCircle2 className="w-16 h-16 text-slate-900 mb-4" />
            <p className="text-xs font-bold text-slate-900 px-4 bg-slate-50 py-3 border border-slate-100">
              {t('formSuccess')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" id="azin-lead-form">
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <label htmlFor="fullname" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                {t('fullname')} *
              </label>
              <input
                type="text"
                id="fullname"
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder={language === 'fa' ? 'مثال: رضا محمدی' : 'e.g. John Doe'}
                className="w-full px-4 py-3 border border-slate-200 rounded-none focus:outline-none focus:border-slate-950 transition-colors bg-white text-slate-800 text-xs"
              />
            </div>

            <div className={isRtl ? 'text-right' : 'text-left'}>
              <label htmlFor="phone" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                {t('phone')} *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={language === 'fa' ? 'مثال: ۰۹۱۲۳۴۵۶۷۸۹' : 'e.g. 09123456789'}
                className="w-full px-4 py-3 border border-slate-200 rounded-none focus:outline-none focus:border-slate-950 transition-colors bg-white text-slate-800 text-xs"
              />
            </div>

            <div className={isRtl ? 'text-right' : 'text-left'}>
              <label htmlFor="message" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                {t('message')}
              </label>
              <textarea
                id="message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={language === 'fa' ? 'ابعاد حدودی یا ایده طرح دکوراتیو را بنویسید' : 'Specify dimensions or custom requests'}
                className="w-full px-4 py-3 border border-slate-200 rounded-none focus:outline-none focus:border-slate-950 transition-colors bg-white text-slate-800 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 text-white rounded-none hover:bg-slate-800 transition-all font-bold text-xs tracking-wider uppercase mt-2 cursor-pointer"
              id="submit-lead-form-btn"
            >
              <Send className="w-4 h-4" />
              <span>{t('submit')}</span>
            </button>
          </form>
        )}

        {/* Quick direct contact links in Tehran */}
        <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
          <a
            href="tel:+989397249841"
            className="flex items-center gap-3 px-4 py-3 border border-slate-200 rounded-none hover:bg-slate-50 transition-all text-xs font-bold uppercase tracking-wider text-slate-800"
            id="direct-call-link"
          >
            <Phone className="w-4 h-4 text-slate-900" />
            <div className={`flex-1 flex justify-between items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
              <span>{language === 'fa' ? 'تماس فوری کارگاه' : 'Call Workshop Direct'}</span>
              <span className="font-mono text-xs font-bold text-slate-500">۰۹۳۹۷۲۴۹۸۴۱</span>
            </div>
          </a>

          <a
            href="https://wa.me/989123581220"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 border border-slate-200 bg-slate-50/50 rounded-none hover:bg-slate-50 transition-all text-xs font-bold uppercase tracking-wider text-slate-900"
            id="direct-whatsapp-link"
          >
            <MessageCircle className="w-4 h-4 text-slate-900" />
            <div className={`flex-1 flex justify-between items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
              <span>{language === 'fa' ? 'پیام مستقیم واتس‌اپ' : 'Chat via WhatsApp'}</span>
              <span className="font-mono text-xs font-bold text-slate-900">۰۹۱۲۳۵۸۱۲۲۰</span>
            </div>
          </a>
        </div>
      </div>

    </div>
  );
}
