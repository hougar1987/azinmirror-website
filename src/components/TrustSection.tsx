import { Shield, Sparkles, Building2, Eye, UserCheck, Settings } from 'lucide-react';
import { UI_TRANSLATIONS } from '../data';
import { Language } from '../types';

interface TrustSectionProps {
  language: Language;
}

export default function TrustSection({ language }: TrustSectionProps) {
  const t = (key: string) => UI_TRANSLATIONS[key]?.[language] || '';
  const isRtl = language === 'fa';

  const metrics = [
    {
      icon: <Shield className="w-4 h-4 text-white" />,
      title: language === 'fa' ? '۱۰ سال سابقه' : '10 Years Exp',
      desc: language === 'fa' ? 'طراحی و تولید انواع آینه‌ها' : 'Of artisanal excellence'
    },
    {
      icon: <Settings className="w-4 h-4 text-white" />,
      title: language === 'fa' ? 'تولید مستقیم' : 'Direct Factory',
      desc: language === 'fa' ? 'حذف واسطه و قیمت کارخانه' : 'Eliminate middleman costs'
    },
    {
      icon: <UserCheck className="w-4 h-4 text-white" />,
      title: language === 'fa' ? 'نصب تخصصی' : 'Tehran Mounts',
      desc: language === 'fa' ? 'نصب حرفه‌ای در محل با گارانتی' : 'Safe laser-guided installation'
    },
    {
      icon: <Eye className="w-4 h-4 text-white" />,
      title: language === 'fa' ? 'آینه اردکان' : 'Super Clear',
      desc: language === 'fa' ? 'آینه‌های بدون جیوه و بدون خوردگی' : 'Double silver-backed glass'
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-b border-slate-100" id="trust-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center`}>
          
          {/* Text content (Left on LTR, Right on RTL) */}
          <div className={`lg:col-span-6 space-y-6 ${isRtl ? 'lg:order-2 text-right font-sans' : 'text-left'}`}>
            <span className="inline-block px-3 py-1 bg-slate-50 text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">
              {language === 'fa' ? 'تولیدکننده تراز اول تهران • از سال ۱۳۹۳' : 'PROUD TEHRAN MANUFACTURER • EST. 2014'}
            </span>

            <h2 className="text-3xl font-light text-slate-900 tracking-tight leading-tight">
              {language === 'fa' ? <>تکنولوژی تولید همگام با <span className="font-bold">استانداردهای بین‌المللی</span></> : <>Modern Manufacturing with <span className="font-bold">Exceptional Specs</span></>}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              {t('whyChooseUsDesc')}
            </p>

            <p className="text-slate-500 text-sm leading-relaxed">
              {language === 'fa'
                ? 'مجموعه آینه آذین با بکارگیری تجهیزات مدرن برش شیشه، سیستم‌های ال‌ای‌دی عایق ۱۲ ولت و شاسی‌های ضد آب پی‌وی‌سی، کیفیت و دوام محصولات را تضمین می‌کند. ما مستقیماً پاسخگوی پروژه‌های شخصی (سرویس‌های لوکس مسکونی) و پروژه‌های تجاری (سالن‌های زیبایی، هتل‌ها و دکوراتورها) در سراسر پایتخت هستیم.'
                : 'Azin Mirror delivers custom backlighting, smart touch interfaces, and moisture-proof backing. We partner with interior design agencies and building contractors to supply flawless premium glass, complete with high-density LED components, dual-tone brightness dimmer modules, and full 18-month warranty support.'}
            </p>

            {/* Quick stats badges */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {metrics.map((m, idx) => (
                <div 
                  key={idx} 
                  className={`p-5 border border-slate-100 bg-white flex gap-4 items-start ${
                    isRtl ? 'flex-row-reverse text-right' : 'flex-row text-left'
                  }`}
                  id={`trust-metric-${idx}`}
                >
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                    {m.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-tight">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Craftsman image frame (Right on LTR, Left on RTL) */}
          <div className={`lg:col-span-6 relative ${isRtl ? 'lg:order-1' : ''}`} id="trust-image-container">
            <div className="relative aspect-4/3 overflow-hidden border border-slate-100">
              <img
                src="/src/assets/images/factory_mirror_1783426105167.jpg"
                alt="Azin Mirror craftsmanship Tehran workshop"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Overlapping badge */}
              <div className={`absolute bottom-6 bg-white p-5 border border-slate-100 flex items-center gap-3 ${
                isRtl ? 'right-6 left-auto text-right flex-row-reverse font-sans' : 'left-6 right-auto text-left flex-row'
              }`} id="trust-absolute-badge">
                <div className="p-2.5 bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    {language === 'fa' ? 'امکان بازدید حضوری از کارگاه' : 'Tehran Factory Showroom'}
                  </h5>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {language === 'fa' ? 'خ پیروزی، خ پرستار، پلاک ۳۰، پذیرای حضور همکاران دکوراتور' : 'Visit our workshop directly at No. 30, Parastar St, Piroozi St'}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
