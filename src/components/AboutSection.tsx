import { motion } from 'motion/react';
import { Award, ShieldCheck, Heart, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface AboutSectionProps {
  language: Language;
  onNavigateToProducts: () => void;
}

export default function AboutSection({ language, onNavigateToProducts }: AboutSectionProps) {
  const isRtl = language === 'fa';

  return (
    <div className="bg-white text-slate-900 pb-16" id="about-section-container">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-slate-100" id="about-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Hero Text */}
            <div className={`lg:col-span-7 space-y-6 ${isRtl ? 'text-right font-sans lg:order-2' : 'text-left lg:order-1'}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 text-slate-500 text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'fa' ? 'درباره صنایع آینه آذین' : 'ABOUT AZIN MIRROR'}</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl font-light tracking-tight leading-tight text-slate-900">
                {language === 'fa' ? (
                  <>
                    رویاهای شما، <span className="font-bold border-b-2 border-amber-500/30">بازتاب هنر ما</span>
                  </>
                ) : (
                  <>
                    Your Dreams, <span className="font-bold border-b-2 border-amber-500/30">Reflected in Our Art</span>
                  </>
                )}
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                {language === 'fa' ? (
                  'آذین میرور (Azin Mirror) از سال ۱۳۹۴ در زمینه طراحی و تولید انواع آینه‌های مدرن، دکوراتیو، سرویس بهداشتی، آینه‌های LED دار، آینه‌های قدی و مدل‌های سفارشی فعالیت می‌کند.'
                ) : (
                  'Since 2015 (1394), Azin Mirror has been at the forefront of designing and manufacturing premium modern, decorative, bathroom LED backlit, full-length, and custom-cut mirrors.'
                )}
              </p>

              <div className={`flex flex-wrap gap-4 pt-4 ${isRtl ? 'justify-start flex-row-reverse' : 'justify-start'}`}>
                <button
                  onClick={onNavigateToProducts}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-colors rounded-none cursor-pointer flex items-center gap-2"
                >
                  <span>{language === 'fa' ? 'مشاهده کاتالوگ محصولات' : 'Browse Product Catalog'}</span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* Hero Visual Block */}
            <div className="lg:col-span-5 lg:order-2">
              <div className="relative group">
                {/* Decorative Amber/Gold Border */}
                <div className="absolute -inset-2 border border-amber-500/30 translate-x-3 translate-y-3 -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-500"></div>
                <div className="relative overflow-hidden border border-slate-100 aspect-4/3 bg-slate-100">
                  <img
                    src="/src/assets/images/hero_mirror_1783426051071.jpg"
                    alt={language === 'fa' ? 'تولید آینه‌های بک لایت لوکس' : 'Premium LED Mirror Production'}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-20 hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ABOUT AZIN MIRROR (Philosophy) */}
      <section className="py-16 bg-slate-50 border-b border-slate-100" id="about-philosophy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="flex justify-center">
            <Compass className="w-8 h-8 text-amber-500" />
          </div>
          
          <h2 className={`text-2xl sm:text-3xl font-light text-slate-900 ${isRtl ? 'font-sans' : ''}`}>
            {language === 'fa' ? 'فلسفه و باور ما' : 'Our Philosophy & Values'}
          </h2>
          
          <div className={`space-y-6 text-slate-600 leading-relaxed max-w-3xl mx-auto text-base sm:text-lg ${isRtl ? 'font-sans text-right sm:text-center' : 'text-left sm:text-center'}`}>
            <p>
              {language === 'fa' ? (
                'آذین میرور باور دارد آینه فقط یک وسیله کاربردی نیست؛ بلکه عنصری مهم در زیباسازی فضا، افزایش نور و ایجاد حس وسعت در محیط زندگی و کار شماست.'
              ) : (
                'Azin Mirror believes a mirror is not just a utilitarian household object; it is a vital architectural tool that enhances your environment, multiplies ambient light, and expands spatial perception.'
              )}
            </p>
            <p className="text-slate-500 text-sm sm:text-base">
              {language === 'fa' ? (
                'با بهره‌گیری از تکنولوژی‌های روز، مواد اولیه باکیفیت و تیمی متخصص و باتجربه، فرآیند طراحی، سفارشی‌سازی، تولید و ارسال محصولات را با دقت و سرعت انجام می‌دهیم تا تجربه‌ای متفاوت برای مشتریان ایجاد کنیم.'
              ) : (
                'By utilizing advanced glass finishing technologies, premium-grade silver backings, and our highly skilled team of artisan technicians, we manage the entire customization, fabrication, and installation process seamlessly to deliver an outstanding experience.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 3. OUR STORY */}
      <section className="py-16 sm:py-24 border-b border-slate-100" id="about-story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Story Image */}
            <div className={`lg:col-span-5 ${isRtl ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="relative group">
                <div className="absolute -inset-2 border border-slate-900/10 -translate-x-3 translate-y-3 -z-10 transition-transform duration-500"></div>
                <div className="relative overflow-hidden border border-slate-100 aspect-4/3 bg-slate-100">
                  <img
                    src="/src/assets/images/dec_mirror_1783426067274.jpg"
                    alt={language === 'fa' ? 'داستان صنایع آینه آذین' : 'Azin Mirror Workshop Story'}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div className={`lg:col-span-7 space-y-6 ${isRtl ? 'text-right font-sans lg:order-2' : 'text-left lg:order-1'}`}>
              <span className="text-xs font-bold text-amber-500 tracking-wider uppercase block">
                {language === 'fa' ? 'اصالت و خلاقیت' : 'ORIGIN & CREATIVITY'}
              </span>
              
              <h2 className="text-2xl sm:text-3.5xl font-light text-slate-900 leading-tight">
                {language === 'fa' ? (
                  <>
                    داستان <span className="font-bold">آینه آذین</span>
                  </>
                ) : (
                  <>
                    The <span className="font-bold">Azin Mirror</span> Story
                  </>
                )}
              </h2>
              
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  {language === 'fa' ? (
                    'داستان آینه آذین از یک باور ساده شروع شد؛ اینکه هر آینه می‌تواند بیشتر از یک سطح بازتاب‌دهنده باشد. یک آینه زیبا می‌تواند فضای ساده را به محیطی روشن، مدرن و الهام‌بخش تبدیل کند.'
                  ) : (
                    'The story of Azin Mirror began with a simple vision: that a mirror can transcend its reflective surface. A beautifully designed and perfectly executed mirror has the transformative power to convert any ordinary room into an inspiring, light-filled, modern sanctuary.'
                  )}
                </p>
                <p>
                  {language === 'fa' ? (
                    'ما تلاش می‌کنیم با ترکیب هنر، طراحی و تجربه تولید، محصولاتی خلق کنیم که بازتابی از زیبایی، نور و سبک زندگی شما باشند. هر آینه‌ای که در آذین میرور تولید می‌شود، نتیجه دقت در طراحی، انتخاب متریال مناسب و توجه به جزئیات است.'
                  ) : (
                    'We strive daily to merge artisanal design with engineered precision, building products that genuinely echo beauty, elegance, and light. Every single mirror leaving our workshop is the outcome of dedicated design, selective material sourcing, and painstaking attention to details.'
                  )}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. EXPERIENCE AND QUALITY */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-100" id="about-quality">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase block">
              {language === 'fa' ? 'چرا به ما اعتماد می‌کنند؟' : 'ENGINEERED QUALITY'}
            </span>
            <h2 className={`text-2xl sm:text-3.5xl font-light text-slate-900 ${isRtl ? 'font-sans' : ''}`}>
              {language === 'fa' ? (
                <>
                  تجربه، <span className="font-bold">کیفیت و تعهد</span>
                </>
              ) : (
                <>
                  Experience, <span className="font-bold">Quality & Commitment</span>
                </>
              )}
            </h2>
            <p className={`text-sm text-slate-500 leading-relaxed ${isRtl ? 'font-sans' : ''}`}>
              {language === 'fa' ? (
                'در طول سال‌های فعالیت، همواره تلاش کرده‌ایم کیفیت را در تمام مراحل تولید حفظ کنیم؛ از طراحی اولیه و برش دقیق شیشه گرفته تا اجرای جزئیات نهایی و کنترل کیفیت محصول.'
              ) : (
                'Throughout our history, our prime directive has been unwavering quality control across every single node of the production flow: from primary digital drafting and computerized glass cutting to bezeling, backboard waterproofing, and electronic safety checks.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Experience */}
            <div className={`bg-white p-8 border border-slate-100 space-y-4 ${isRtl ? 'text-right font-sans' : 'text-left'}`}>
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {language === 'fa' ? 'پیشرو و باسابقه' : 'Artisanal Experience'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === 'fa' ? (
                  'بیش از ۱۰ سال تخصص تخصصی در مهندسی آینه و شیشه دکوراتیو در بازار ایران.'
                ) : (
                  'Bringing over a decade of deep, dedicated engineering and design experience to Tehran\'s elite residential projects.'
                )}
              </p>
            </div>

            {/* Pillar 2: Quality */}
            <div className={`bg-white p-8 border border-slate-100 space-y-4 ${isRtl ? 'text-right font-sans' : 'text-left'}`}>
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {language === 'fa' ? 'کنترل کیفیت دقیق' : 'Rigorous Standards'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === 'fa' ? (
                  'استفاده انحصاری از آینه‌های فوق‌شفاف بدون موج اردکان با نقره‌اندود دولایه مقاوم در برابر جیوه.'
                ) : (
                  'Exclusive use of certified copper-free super-clear mirrors with double silver coating to resist humidity.'
                )}
              </p>
            </div>

            {/* Pillar 3: Commitment */}
            <div className={`bg-white p-8 border border-slate-100 space-y-4 ${isRtl ? 'text-right font-sans' : 'text-left'}`}>
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 flex items-center justify-center">
                <Heart className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {language === 'fa' ? 'تعهد و همراهی' : 'Total Client Partnership'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === 'fa' ? (
                  'ما خود را تنها یک تولیدکننده آینه نمی‌دانیم؛ بلکه همراه شما در ساخت فضاهایی زیباتر و کاربردی‌تر هستیم.'
                ) : (
                  'We do not view ourselves merely as vendors; we are your partners in drafting, delivering, and mounting breathtaking visual spaces.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section className="py-16 sm:py-24" id="about-cta">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-950 text-white rounded-none p-10 sm:p-20 text-center space-y-8 relative overflow-hidden">
            {/* Background Decorative Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute -left-16 -top-16 w-64 h-64 border border-white rounded-full"></div>
              <div className="absolute -right-16 -bottom-16 w-64 h-64 border border-white rounded-full"></div>
            </div>

            <div className="relative z-10 space-y-6">
              <span className="text-xs font-bold text-amber-400 tracking-widest uppercase block">
                {language === 'fa' ? 'صنایع شیشه و آینه آذین' : 'AZIN GLASS INDUSTRIES'}
              </span>
              
              <h2 className="text-2xl sm:text-4xl font-light text-white leading-tight">
                {language === 'fa' ? (
                  <>
                    آذین میرور؛ <span className="font-bold text-amber-300">بازتاب زیبایی</span> در فضای شما
                  </>
                ) : (
                  <>
                    Azin Mirror; <span className="font-bold text-amber-300">Reflecting Pure Beauty</span> in Your Space
                  </>
                )}
              </h2>

              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
                {language === 'fa' ? (
                  'همین امروز از تنوع آینه‌های باکیفیت و بک‌لایت مدرن ما دیدن فرمایید و طرح اختصاصی خود را برآورد قیمت کنید.'
                ) : (
                  'Explore our breathtaking collections of high-end backlit and decorative mirrors today, and receive a free cost estimate for your tailored layout.'
                )}
              </p>

              <div className="pt-4">
                <button
                  onClick={onNavigateToProducts}
                  className="px-8 py-4 bg-white text-slate-950 hover:bg-slate-100 text-xs font-bold uppercase tracking-wider transition-colors rounded-none cursor-pointer inline-flex items-center gap-2"
                >
                  <span>{language === 'fa' ? 'مشاهده کاتالوگ محصولات' : 'View Products'}</span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
