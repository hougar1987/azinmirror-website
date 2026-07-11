import { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types & Data
import { Language, Product, Project } from '../types';
import { UI_TRANSLATIONS, PRODUCTS, PROJECTS, FAQS } from '../data';


import  Header  from '../components/Header';
import  ServicesSection  from '../components/ServicesSection';
import  TrustSection from '../components/TrustSection';
import  ContactForm  from '../components/ContactForm';
import  ProductDetailModal  from '../components/ProductDetailModal';
import AboutSection  from '../components/AboutSection';
import  FAQSection from '../components/FAQSection';
import  MirrorSimulator from '../components/MirrorSimulator';
// HeroSection is rendered directly below to avoid prop drilling and style separation issues

export default function App() {
  // Initialize language from localStorage if available
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('azin_lang');
    return (saved as Language) || 'fa';
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Sync language selection and update page title
  useEffect(() => {
    localStorage.setItem('azin_lang', language);
    
    const pageNames: Record<string, Record<Language, string>> = {
      home: { fa: 'صفحه اصلی', en: 'Home' },
      products: { fa: 'محصولات', en: 'Products' },
      projects: { fa: 'پروژه‌ها', en: 'Projects' },
      about: { fa: 'درباره ما', en: 'About Us' },
      faq: { fa: 'سوالات متداول', en: 'FAQ' },
      contact: { fa: 'تماس با ما', en: 'Contact Us' }
    };
    
    const pageTitle = pageNames[activeTab]?.[language] || '';
    const brandName = language === 'fa' ? 'صنایع آینه آذین' : 'Azin Mirror';
    const subtitle = language === 'fa' ? 'تولیدکننده آینه‌های هوشمند و بک‌لایت' : 'Premium LED & Decorative Mirrors';
    
    document.title = activeTab === 'home' 
      ? `${brandName} | ${subtitle}` 
      : `${pageTitle} | ${brandName}`;
  }, [language, activeTab]);

  const t = (key: string) => UI_TRANSLATIONS[key]?.[language] || '';
  const isRtl = language === 'fa';

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div 
      className={`min-h-screen bg-white text-slate-900 flex flex-col font-sans`}
      dir={isRtl ? 'rtl' : 'ltr'}
      id="azin-app-root"
    >
      {/* Header */}
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Content Area */}
      <main className="flex-grow" id="azin-main-content">
        <AnimatePresence mode="wait">
          
          {/* ==================== HOME PAGE ==================== */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              id="home-view"
            >
              {/* Hero Section */}
              <section className="relative overflow-hidden bg-white py-20 sm:py-28 border-b border-slate-100 w-full" id="hero-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center`}>
                    
                    {/* Hero Text */}
                    <div className={`lg:col-span-6 space-y-8 ${isRtl ? 'text-right font-sans lg:order-2' : 'text-left'}`}>
                      <div className={`flex flex-wrap items-center gap-2 justify-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <span className="inline-block px-3 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                          {language === 'fa' ? 'تضمین کیفیت ۱۸ ماهه' : '18-Month Direct Warranty'}
                        </span>
                        <span className="h-4 w-px bg-slate-200" />
                        <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                          {language === 'fa' ? 'ارسال و نصب فوری تهران' : 'Tehran Delivery & Mounts'}
                        </span>
                      </div>

                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-slate-900 tracking-tight leading-none">
                        {language === 'fa' ? (
                          <>
                            طراحی و تولید انواع <span className="font-bold block mt-2">آینه‌های لوکس هوشمند</span> و دکوراتیو
                          </>
                        ) : (
                          <>
                            Manufacturing and <span className="font-bold block mt-2">LED Custom Mirror</span> installations
                          </>
                        )}
                      </h1>

                      <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
                        {t('heroSubtitle')}
                      </p>

                      {/* CTA Buttons */}
                      <div className={`flex flex-wrap gap-4 items-center ${isRtl ? 'justify-start flex-row-reverse' : 'justify-start'}`}>
                        <a
                          href="https://wa.me/989123581220"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wider uppercase transition-all cursor-pointer rounded-none"
                          id="hero-whatsapp-btn"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{t('contactWhatsApp')}</span>
                        </a>

                        <button
                          onClick={() => handleTabChange('projects')}
                          className="flex items-center gap-2 px-8 py-4 border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-400 text-slate-900 font-bold text-xs tracking-wider uppercase transition-all cursor-pointer rounded-none"
                          id="hero-projects-btn"
                        >
                          <span>{t('viewProjects')}</span>
                          <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                        </button>
                      </div>

                      {/* Micro trust stats */}
                      <div className={`pt-8 border-t border-slate-100 grid grid-cols-3 gap-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                        <div>
                          <span className="text-2xl sm:text-3xl font-light text-slate-950 block">۱۰+</span>
                          <span className="text-[10px] font-bold tracking-wider text-slate-400 mt-1 block uppercase">{language === 'fa' ? 'سال سابقه تولید' : 'Years of Crafts'}</span>
                        </div>
                        <div>
                          <span className="text-2xl sm:text-3xl font-light text-slate-950 block">۱۰۰٪</span>
                          <span className="text-[10px] font-bold tracking-wider text-slate-400 mt-1 block uppercase">{language === 'fa' ? 'آینه اردکان' : 'Premium Glass'}</span>
                        </div>
                        <div>
                          <span className="text-2xl sm:text-3xl font-light text-slate-950 block">۲ساعته</span>
                          <span className="text-[10px] font-bold tracking-wider text-slate-400 mt-1 block uppercase">{language === 'fa' ? 'نصب تخصصی' : 'Quick Mounting'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hero Interactive Showcase Image */}
                    <div className="lg:col-span-6 relative" id="hero-showcase-panel">
                      <div className="relative aspect-16/10 lg:aspect-4/3 overflow-hidden border border-slate-100">
                        <img
                          src="/src/assets/images/hero_mirror_1783426051071.jpg"
                          alt="Luxury LED Backlit Mirror from Azin Mirror"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                        
                        {/* Overlay Card detailing features */}
                        <div className={`absolute bottom-6 bg-white p-6 rounded-none border border-slate-100 max-w-sm ${
                          isRtl ? 'right-6 left-auto text-right font-sans' : 'left-6 right-auto text-left'
                        }`} id="hero-floating-card">
                          <span className="inline-block px-2.5 py-0.5 bg-slate-50 border border-slate-100 text-[9px] font-bold tracking-widest text-slate-500 uppercase">
                            {language === 'fa' ? 'پرفروش‌ترین آینه سال' : 'BEST-SELLER PRODUCT'}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 mt-2.5">
                            {language === 'fa' ? 'آینه بک‌لایت تاچ هوشمند' : 'Smart Touch Backlit Mirror'}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                            {language === 'fa' 
                              ? 'دارای دکمه لمسی خازنی پشت کار، پد ضدبخار قدرتمند و شاسی کاملا عایق پی‌وی‌سی.' 
                              : 'Equipped with dual-sensor touch, anti-fog heater, and extra-clear silver backed glass.'}
                          </p>
                          <div className={`mt-4 pt-4 border-t border-slate-100 flex items-center justify-between`}>
                            <button
                              onClick={() => {
                                const found = PRODUCTS.find(p => p.id === 'smart-touch-bathroom-mirrors');
                                if (found) setSelectedProduct(found);
                              }}
                              className="text-xs font-bold text-slate-900 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span>{t('viewDetails')}</span>
                              <ArrowRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
                            </button>
                            <span className="text-[10px] font-mono font-semibold text-slate-400">Model: AM-400</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* Product Grid Preview (Home Page Showcase) */}
              <section className="py-24 bg-white" id="products-preview-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  {/* Title */}
                  <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                    <div className={isRtl ? 'text-right font-sans' : 'text-left'}>
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">
                        {language === 'fa' ? 'آینه‌های لوکس آذین' : 'THE ART OF REFLECTION'}
                      </span>
                      <h2 className="text-3xl font-light text-slate-900 tracking-tight">
                        {language === 'fa' ? <>مجموعه بی‌نظیر <span className="font-bold">آینه‌های دکوراتیو</span></> : <>Featured <span className="font-bold">Aesthetic Collections</span></>}
                      </h2>
                    </div>
                    <button
                      onClick={() => handleTabChange('products')}
                      className="text-xs font-bold uppercase tracking-wider text-slate-900 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>{language === 'fa' ? 'مشاهده همه محصولات' : 'Explore All Products'}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PRODUCTS.map((product) => (
                      <div 
                        key={product.id}
                        className="group bg-white rounded-none border border-slate-100 transition-all overflow-hidden flex flex-col justify-between"
                        id={`product-preview-${product.id}`}
                      >
                        <div>
                          <div className="aspect-4/3 overflow-hidden relative bg-slate-50 border-b border-slate-100">
                            <img
                              src={product.image}
                              alt={product.name[language]}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                          </div>
                          
                          <div className={`p-6 ${isRtl ? 'text-right font-sans' : 'text-left'}`}>
                            <h3 className="text-base font-bold text-slate-900 transition-colors">
                              {product.name[language]}
                            </h3>
                            <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">
                              {product.description[language]}
                            </p>
                          </div>
                        </div>

                        <div className={`px-6 pb-6 pt-3 flex items-center justify-between border-t border-slate-100 mt-auto ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <button
                            onClick={() => setSelectedProduct(product)}
                            className="text-xs font-bold text-slate-900 hover:underline cursor-pointer"
                          >
                            {t('viewDetails')}
                          </button>
                          <span className="text-[9px] font-bold text-slate-900 bg-slate-50 border border-slate-150 px-2 py-0.5">
                            {language === 'fa' ? 'استعلام قیمت آنلاین' : 'Instant Quote'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* Projects Preview Section */}
              <section className="py-24 bg-slate-50 border-t border-b border-slate-100" id="projects-preview-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  {/* Title */}
                  <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                    <div className={isRtl ? 'text-right font-sans' : 'text-left'}>
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">
                        {language === 'fa' ? 'رزومه موفق در تهران' : 'CRAFTED REAL INSTALLATIONS'}
                      </span>
                      <h2 className="text-3xl font-light text-slate-900 tracking-tight">
                        {language === 'fa' ? <>آخرین پروژه‌های <span className="font-bold">اجرا شده</span></> : <>Recently Completed <span className="font-bold">Tehran Showcases</span></>}
                      </h2>
                    </div>
                    <button
                      onClick={() => handleTabChange('projects')}
                      className="text-xs font-bold uppercase tracking-wider text-slate-900 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>{language === 'fa' ? 'مشاهده همه پروژه‌ها' : 'Explore All Projects'}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PROJECTS.map((project) => (
                      <div 
                        key={project.id}
                        className="group bg-white rounded-none overflow-hidden border border-slate-100 transition-all"
                        id={`project-preview-${project.id}`}
                      >
                        <div className="aspect-4/3 overflow-hidden relative bg-slate-100 border-b border-slate-100">
                          <img
                            src={project.image}
                            alt={project.title[language]}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          
                          {/* Location overlay */}
                          <div className={`absolute bottom-3.5 flex items-center gap-1.5 text-white text-xs font-semibold ${
                            isRtl ? 'right-3.5' : 'left-3.5'
                          }`}>
                            <MapPin className="w-3.5 h-3.5 text-white" />
                            <span>{project.location[language]}</span>
                          </div>
                        </div>

                        <div className={`p-6 ${isRtl ? 'text-right font-sans' : 'text-left'}`}>
                          <div className="flex justify-between items-center mb-2.5">
                            <span className="text-[9px] font-bold text-slate-400 font-mono">{project.year}</span>
                            <span className="text-[9px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5">
                              {project.clientType === 'B2B' ? (language === 'fa' ? 'همکار / دکوراتور' : 'B2B Client') : (language === 'fa' ? 'سفارش خانگی' : 'Residential')}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900">
                            {project.title[language]}
                          </h3>
                          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                            {project.description[language]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* B2B Trust Banner */}
              <section className="py-20 bg-slate-950 text-white" id="b2b-trust-banner">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 bg-white/10 border border-white/20 px-3.5 py-1 inline-block">
                    {language === 'fa' ? 'طرح همکاری ویژه همکاران دکوراتور و سازنده' : 'B2B CONTRACT SPECIALISTS'}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight leading-tight">
                    {language === 'fa' ? <>پشتیبانی کامل از <span className="font-bold">پروژه‌های عمده و سفارشی</span> لابی و تالار</> : <>Architectural Mirror Supply for <span className="font-bold">Tehran Developers</span></>}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-3xl mx-auto leading-relaxed">
                    {t('b2bTrustDesc')}
                  </p>
                  <div className="pt-4 flex flex-wrap justify-center gap-4">
                    <a
                      href="https://wa.me/989123581220"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3.5 bg-white text-slate-950 hover:bg-slate-100 transition-colors text-xs font-bold uppercase tracking-wider rounded-none cursor-pointer"
                      id="b2b-whatsapp-btn"
                    >
                      <MessageCircle className="w-4 h-4 text-slate-950" />
                      <span>{language === 'fa' ? 'سفارش سازمانی و دفتری' : 'WhatsApp B2B Channel'}</span>
                    </a>
                    <a
                      href="tel:+989397249841"
                      className="flex items-center gap-2 px-6 py-3.5 border border-slate-800 text-white hover:border-slate-600 transition-colors text-xs font-bold uppercase tracking-wider rounded-none"
                      id="b2b-call-btn"
                    >
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span>{language === 'fa' ? 'تماس با واحد مهندسی فروش' : 'Call Sales Department'}</span>
                    </a>
                  </div>
                </div>
              </section>

              {/* FAQ Accordion Section */}
              <section className="py-24 bg-white" id="faq-section">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  {/* Title */}
                  <div className="text-center mb-16 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
                      {language === 'fa' ? 'سوالات متداول مشتریان' : 'FREQUENTLY ASKED QUESTIONS'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">
                      {language === 'fa' ? <>پاسخ شفاف به <span className="font-bold">سوالات متداول</span> شما</> : <>Clear Answers to Your <span className="font-bold">Common Inquiries</span></>}
                    </h2>
                  </div>

                  {/* Accordion List */}
                  <div className="space-y-4">
                    {FAQS.map((faq, idx) => (
                      <div 
                        key={idx} 
                        className="border border-slate-100 rounded-none overflow-hidden transition-all bg-slate-50"
                        id={`faq-item-${idx}`}
                      >
                        <button
                          onClick={() => toggleFaq(idx)}
                          className={`w-full py-4.5 px-6 flex justify-between items-center gap-4 text-left font-bold cursor-pointer bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                            isRtl ? 'text-right flex-row-reverse' : 'text-left'
                          }`}
                        >
                          <span className="text-sm text-slate-900">
                            {faq.question[language]}
                          </span>
                          {openFaqIdx === idx ? (
                            <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                          )}
                        </button>

                        <AnimatePresence>
                          {openFaqIdx === idx && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="bg-slate-50/70 text-slate-500 text-xs sm:text-sm leading-relaxed p-6"
                            >
                              <p className={isRtl ? 'text-right font-sans' : 'text-left'}>
                                {faq.answer[language]}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* Instant Lead Form Section */}
              <section className="py-24 bg-slate-50 border-t border-slate-100" id="instant-quote-form-home">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <span className="inline-block px-3 py-1 bg-white border border-slate-100 text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">
                      {language === 'fa' ? 'سفارش آنلاین آینه' : 'GET A FREE QUOTE'}
                    </span>
                    <h2 className="text-3xl font-light text-slate-900 tracking-tight">
                      {language === 'fa' ? <>همین حالا قیمت آینه خود را <span className="font-bold">برآورد کنید</span></> : <>Calculate and Submit Your <span className="font-bold">Custom Blueprint</span></>}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {t('contactSectionSubtitle')}
                    </p>
                  </div>

                  <ContactForm language={language} />
                </div>
              </section>
            </motion.div>
          )}

          {/* ==================== PRODUCTS PAGE ==================== */}
          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
              id="products-view"
            >
              {/* Header */}
              <div className={`max-w-3xl ${isRtl ? 'text-right font-sans ml-auto' : 'text-left mr-auto'} space-y-4`}>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
                  {language === 'fa' ? 'کاتالوگ محصولات آذین' : 'AZIN CATALOG'}
                </span>
                <h1 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight leading-none">
                  {language === 'fa' ? <>آینه‌های مهندسی‌شده و <span className="font-bold">فوق‌شفاف</span></> : <>Bespoke Glass & <span className="font-bold">Backlit Hardware</span></>}
                </h1>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {t('productsSectionSubtitle')}
                </p>
              </div>

              {/* Deep Products Grid */}
              <div className="grid grid-cols-1 gap-12 pt-6">
                {PRODUCTS.map((product, idx) => (
                  <div 
                    key={product.id}
                    className={`bg-white rounded-none overflow-hidden border border-slate-100 transition-all grid grid-cols-1 md:grid-cols-12 items-center`}
                    id={`product-card-${product.id}`}
                  >
                    
                    {/* Product Image Showcase (Alternate side for visual rhythm) */}
                    <div className={`md:col-span-6 h-full min-h-[300px] aspect-4/3 relative ${
                      idx % 2 === 1 ? 'md:order-last' : ''
                    }`}>
                      <img
                        src={product.image}
                        alt={product.name[language]}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Product Content Specifications */}
                    <div className={`md:col-span-6 p-6 sm:p-10 space-y-6 ${isRtl ? 'text-right font-sans' : 'text-left'}`}>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase block mb-1">
                          {language === 'fa' ? 'صنایع شیشه و آینه آذین' : 'Azin Glass Industry'}
                        </span>
                        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                          {product.name[language]}
                        </h2>
                        <p className="text-sm text-slate-500 mt-2.5 leading-relaxed">
                          {product.description[language]}
                        </p>
                      </div>

                      {/* Use Case */}
                      <div className="border-t border-slate-100 pt-4 space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          {t('useCases')}
                        </span>
                        <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                          {product.useCase[language]}
                        </p>
                      </div>

                      {/* Key bullets */}
                      <div className="space-y-2">
                        {product.features.map((feat, fIdx) => (
                          <div 
                            key={fIdx} 
                            className={`flex gap-2 items-center text-xs text-slate-500 ${
                              isRtl ? 'flex-row-reverse text-right' : 'flex-row text-left'
                            }`}
                          >
                            <CheckCircle className="w-4 h-4 text-slate-900 shrink-0" />
                            <span>{feat[language]}</span>
                          </div>
                        ))}
                      </div>

                      <div className={`pt-4 border-t border-slate-100 flex flex-wrap gap-3 ${isRtl ? 'justify-start flex-row-reverse' : 'justify-start'}`}>
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="px-5 py-2.5 bg-slate-900 text-white rounded-none hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer"
                        >
                          {language === 'fa' ? 'بررسی فنی و کاتالوگ' : 'Technical Details'}
                        </button>
                        
                        <a
                          href={`https://wa.me/989123581220?text=${encodeURIComponent(
                            language === 'fa' 
                              ? `سلام. من مایل به استعلام قیمت آینه "${product.name.fa}" هستم.` 
                              : `Hello. I would like to get a quote for "${product.name.en}".`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 text-slate-900 rounded-none hover:bg-slate-50 text-xs font-semibold"
                        >
                          <MessageCircle className="w-4 h-4 text-slate-600" />
                          <span>{language === 'fa' ? 'سفارش سریع واتس‌اپ' : 'WhatsApp Order'}</span>
                        </a>
                      </div>

                    </div>

                  </div>
                ))}
              </div>

              {/* Interactive LED Mirror Simulator */}
              <MirrorSimulator language={language} />

              {/* Quick Estimator Banner */}
              <div className="bg-slate-50 border border-slate-100 rounded-none p-6 sm:p-10" id="products-estimator-teaser">
                <div className={`flex flex-col lg:flex-row justify-between items-center gap-6 ${isRtl ? 'lg:flex-row-reverse text-right font-sans' : 'text-left'}`}>
                  <div className="space-y-2 max-w-2xl">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {language === 'fa' ? 'آیا به ابعاد متفاوتی برای دکور خود نیاز دارید؟' : 'Need Custom Cut Dimensions or Shapes?'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                      {language === 'fa'
                        ? 'ما به صورت مستقیم هر طرح و ابعادی که مد نظرتان باشد را به طور کاملا شخصی‌سازی شده در کارگاه تولید می‌کنیم. همین الان ابعاد را در فرم تماس به ما اعلام کنید.'
                        : 'Every single bathroom or room layout is unique. Use our online pricing calculator on the Contact page or send us your Autocad blueprint directly.'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleTabChange('contact')}
                    className="w-full lg:w-auto px-6 py-3 bg-slate-900 text-white font-bold rounded-none hover:bg-slate-800 transition-colors text-xs shrink-0 cursor-pointer"
                  >
                    {language === 'fa' ? 'محاسبه فوری قیمت سفارش' : 'Calculate Custom Estimate'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== PROJECTS PAGE ==================== */}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
              id="projects-view"
            >
              {/* Header */}
              <div className={`max-w-3xl ${isRtl ? 'text-right font-sans ml-auto' : 'text-left mr-auto'} space-y-4`}>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
                  {language === 'fa' ? 'رزومه و گالری پروژه‌ها' : 'PORTFOLIO'}
                </span>
                <h1 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight leading-none">
                  {language === 'fa' ? <>گالری آینه‌های نصب‌شده در <span className="font-bold">پروژه‌های مدرن</span></> : <>Architectural <span className="font-bold">Mirror Installations</span></>}
                </h1>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {t('projectsSectionSubtitle')}
                </p>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                {PROJECTS.map((project) => (
                  <div 
                    key={project.id}
                    className="bg-white rounded-none overflow-hidden border border-slate-100 transition-all flex flex-col justify-between"
                    id={`project-card-${project.id}`}
                  >
                    <div className="relative aspect-4/3 overflow-hidden bg-slate-100 border-b border-slate-100">
                      <img
                        src={project.image}
                        alt={project.title[language]}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      
                      {/* Location Badge */}
                      <div className={`absolute bottom-3.5 flex items-center gap-1.5 text-white text-xs font-semibold ${
                        isRtl ? 'right-3.5' : 'left-3.5'
                      }`}>
                        <MapPin className="w-3.5 h-3.5 text-white/95" />
                        <span>{project.location[language]}</span>
                      </div>
                    </div>

                    <div className={`p-6 space-y-4 flex-grow flex flex-col justify-between ${isRtl ? 'text-right font-sans' : 'text-left'}`}>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                          <span>{t('projectYear')}: {project.year}</span>
                          <span className="bg-slate-50 px-2 py-0.5 border border-slate-100 rounded-none text-slate-500">
                            {project.clientType === 'B2B' ? (language === 'fa' ? 'همکار / دکوراسیون' : 'Corporate B2B') : (language === 'fa' ? 'سفارش خانگی' : 'Residential')}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {project.title[language]}
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {project.description[language]}
                        </p>
                      </div>

                      {/* CTA within cards */}
                      <div className="pt-4 border-t border-slate-100 mt-auto">
                        <a
                          href={`https://wa.me/989123581220?text=${encodeURIComponent(
                            language === 'fa' 
                              ? `سلام آینه آذین. من پروژه شما در منطقه "${project.location.fa}" را دیدم و مایل به اجرای دیزاینی مشابه برای فضای خود هستم.` 
                              : `Hello. I saw your project at "${project.location.en}" and would like a quote for a similar installation.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-slate-950 hover:underline flex items-center gap-1 justify-start uppercase tracking-wider"
                        >
                          <span>{language === 'fa' ? 'استعلام اجرای طرح مشابه' : 'Get quote for similar design'}</span>
                          <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                        </a>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Special Custom orders for B2B */}
              <div className="bg-slate-950 text-white rounded-none p-10 sm:p-16 text-center space-y-6" id="projects-b2b-cta">
                <h3 className="text-xl sm:text-2xl font-light text-white leading-tight">
                  {language === 'fa' ? <>طراحی و ساخت پروژه‌های دکوراتیو سنگین <span className="font-bold">لابی و تالارها</span></> : <>Specialized Architecture & <span className="font-bold">Lobby Projects</span></>}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  {language === 'fa' 
                    ? 'صنایع آینه آذین دارای توان تولید انبوه و طراحی آینه‌کاری‌های مدرن برای پروژه‌های با متراژ بالا هتل‌ها، مجتمع‌های تجاری و برج‌های لوکس با تاییدیه کیفیت می‌باشد.' 
                    : 'We possess robust manufacturing capabilities to engineer, transport, and install massive mirrored structures, asymmetrical light columns, and customized hotel vanity mirrors.'}
                </p>
                <button
                  onClick={() => handleTabChange('contact')}
                  className="px-8 py-4 bg-white text-slate-950 font-bold text-xs uppercase tracking-wider rounded-none hover:bg-slate-100 transition-all cursor-pointer"
                >
                  {language === 'fa' ? 'ثبت سفارش پروژه تجاری' : 'Initiate Commercial Contract'}
                </button>
              </div>
            </motion.div>
          )}

          {/* ==================== ABOUT US PAGE ==================== */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              id="about-view"
            >
              <AboutSection
                language={language}
                onNavigateToProducts={() => handleTabChange('products')}
              />
            </motion.div>
          )}

          {/* ==================== FAQ PAGE ==================== */}
          {activeTab === 'faq' && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              id="faq-view"
            >
              <FAQSection
                language={language}
                onNavigateToContact={() => handleTabChange('contact')}
              />
            </motion.div>
          )}

          {/* ==================== CONTACT PAGE ==================== */}
          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
              id="contact-view"
            >
              {/* Header */}
              <div className={`max-w-3xl ${isRtl ? 'text-right font-sans ml-auto' : 'text-left mr-auto'} space-y-4`}>
                <span className="inline-block px-3 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                  {language === 'fa' ? 'تماس با واحد فروش صنایع آذین' : 'AZIN SERVICE DESK'}
                </span>
                <h1 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight leading-none">
                  {language === 'fa' ? <>ارسال نقشه و <span className="font-bold">استعلام فوری قیمت</span></> : <>Azin Mirror <span className="font-bold">Service Coordinates</span></>}
                </h1>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {t('contactSectionSubtitle')}
                </p>
              </div>

              {/* Form and Estimator */}
              <ContactForm language={language} />

              {/* Information Cards (Address, Hours, Direct Details) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6">
                
                {/* Card 1: Address */}
                <div className={`bg-white p-6 rounded-none border border-slate-100 flex gap-4 ${isRtl ? 'flex-row-reverse text-right font-sans' : 'flex-row text-left'}`}>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-none h-fit">
                    <MapPin className="w-5 h-5 text-slate-900" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold tracking-wider uppercase text-slate-900">
                      {language === 'fa' ? 'آدرس کارگاه و نمایشگاه' : 'Factory Workshop Address'}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {language === 'fa' 
                        ? 'تهران، دروازه شمیران، خیابان مازندران، پلاک ۱۲۰ (امکان بازدید حضوری با هماهنگی)' 
                        : 'No. 120, Mazandaran St, Darvazeh Shemiran, Tehran, Iran'}
                    </p>
                  </div>
                </div>

                {/* Card 2: Hours */}
                <div className={`bg-white p-6 rounded-none border border-slate-100 flex gap-4 ${isRtl ? 'flex-row-reverse text-right font-sans' : 'flex-row text-left'}`}>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-none h-fit">
                    <Clock className="w-5 h-5 text-slate-900" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold tracking-wider uppercase text-slate-900">
                      {language === 'fa' ? 'ساعات کاری و پاسخگویی' : 'Business Hours'}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-mono">
                      {t('workingHours')}
                    </p>
                    <p className="text-[10px] text-slate-900 font-bold uppercase tracking-wider">
                      {language === 'fa' ? 'پاسخگویی واتس‌اپ ۲۴ ساعته' : 'WhatsApp open 24/7'}
                    </p>
                  </div>
                </div>

                {/* Card 3: Mail/Direct */}
                <div className={`bg-white p-6 rounded-none border border-slate-100 flex gap-4 ${isRtl ? 'flex-row-reverse text-right font-sans' : 'flex-row text-left'}`}>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-none h-fit">
                    <Mail className="w-5 h-5 text-slate-900" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold tracking-wider uppercase text-slate-900">
                      {language === 'fa' ? 'ارتباط الکترونیکی مستقیم' : 'Electronic Inquiry'}
                    </h4>
                    <p className="text-xs text-slate-500 font-mono">
                      meisamshafieeyar@gmail.com
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                      {language === 'fa' ? 'ارسال فایل اتوکد و نقشه‌ها' : 'Submit large CAD attachments'}
                    </p>
                  </div>
                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Elegant Editorial Footer */}
      <footer className="bg-slate-950 text-white border-t border-slate-900 font-sans" id="azin-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className={`grid grid-cols-1 md:grid-cols-12 gap-12`}>
            
            {/* Brand block (Col span 5) */}
            <div className={`md:col-span-5 space-y-4 ${isRtl ? 'text-right font-sans' : 'text-left'}`}>
              <h3 className="text-2xl font-light tracking-tight text-white uppercase">{language === 'fa' ? 'صنایع آینه آذین' : 'Azin Mirror Manufacturer'}</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-md">
                {language === 'fa'
                  ? 'صنایع آینه آذین با تکیه بر دانش فنی و بهره‌گیری از باکیفیت‌ترین متریال اولیه کشور، پیشرو در طراحی، ساخت و نصب آینه‌های پیشرفته LED بک‌لایت و هوشمند در استان تهران می‌باشد.'
                  : 'Azin Mirror is Tehran’s premium glass atelier, engineering high-end backlit vanity setups, smart interactive bathroom displays, and bespoke geometric wall alignments for luxury clients and building developers.'}
              </p>
              
              {/* Working hours badge */}
              <div className={`flex items-center gap-2 text-xs text-slate-400 pt-2 justify-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-mono">{t('workingHours')}</span>
              </div>
            </div>

            {/* Quick Links (Col span 3) */}
            <div className={`md:col-span-3 space-y-4 ${isRtl ? 'text-right font-sans' : 'text-left'}`}>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {language === 'fa' ? 'دسترسی سریع' : 'Navigation Links'}
              </h4>
              <ul className="space-y-2 text-xs">
                {['home', 'products', 'projects', 'about', 'faq', 'contact'].map((tab) => (
                  <li key={tab}>
                    <button
                      onClick={() => handleTabChange(tab)}
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer uppercase tracking-wider"
                    >
                      {t(tab)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details (Col span 4) */}
            <div className={`md:col-span-4 space-y-4 ${isRtl ? 'text-right font-sans' : 'text-left'}`}>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {language === 'fa' ? 'اطلاعات کارگاه تهران' : 'Sales Office Coordinates'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-400">
                <li className={`flex gap-2 items-start justify-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <span>{t('address')}</span>
                </li>
                
                <li className={`flex gap-2 items-center justify-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                  <a href="tel:+989397249841" className="hover:text-white transition-colors font-mono">
                    {language === 'fa' ? '۰۹۳۹۷۲۴۹۸۴۱' : '09397249841'}
                  </a>
                </li>

                <li className={`flex gap-2 items-center justify-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <MessageCircle className="w-4 h-4 text-slate-500 shrink-0" />
                  <a href="https://wa.me/989123581220" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-mono">
                    WhatsApp: +989123581220
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Sub-footer copyright */}
          <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p className={isRtl ? 'font-sans' : ''}>
              &copy; {new Date().getFullYear()} {t('brandName')}. {t('allRightsReserved')}
            </p>
            <div className={`flex gap-4 ${isRtl ? 'flex-row-reverse font-sans' : ''}`}>
              <span>{language === 'fa' ? 'طراحی شده متناسب با استانداردهای داخلی تهران' : 'Built to Tehran Glass Atelier Specs'}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ==================== PRODUCT DETAIL DIALOG OVERLAY ==================== */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            language={language}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
