import { useState } from 'react';
import { Menu, X, Phone, MessageCircle, Globe } from 'lucide-react';
import { UI_TRANSLATIONS } from '../data';
import { Language } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ language, setLanguage, activeTab, setActiveTab }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = (key: string) => UI_TRANSLATIONS[key]?.[language] || '';

  const menuItems = [
    { id: 'home', label: t('home') },
    { id: 'products', label: t('products') },
    { id: 'projects', label: t('projects') },
    { id: 'about', label: t('about') },
    { id: 'faq', label: t('faq') },
    { id: 'contact', label: t('contact') },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isRtl = language === 'fa';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100" id="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-20 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
          
          {/* Logo Section */}
          <div 
            className={`flex items-center cursor-pointer gap-3 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`} 
            onClick={() => handleTabClick('home')}
            id="header-logo-container"
          >
            <div className="w-10 h-10 bg-slate-900 flex items-center justify-center shrink-0">
              <div className="w-5 h-5 border-r-2 border-b-2 border-white opacity-90"></div>
            </div>
            <div className={`flex flex-col ${isRtl ? 'items-end text-right' : 'items-start text-left'}`}>
              <span className="text-xl font-bold tracking-tight text-slate-900 uppercase font-sans" id="header-brand-name">
                {t('brandName')}
              </span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5" id="header-brand-subtitle">
                {language === 'fa' ? 'صنایع آینه و بک‌لایت' : 'Luxury LED Mirrors'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center space-x-1 ${isRtl ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`} id="desktop-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === item.id ? 'text-slate-900' : 'text-slate-400 hover:text-slate-900'
                }`}
                id={`nav-item-${item.id}`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-slate-900"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Language Switcher and CTA Buttons */}
          <div className={`hidden md:flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`} id="header-actions">
            {/* Lang Button */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'fa' : 'en')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer rounded-none"
              id="language-toggle-btn"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{language === 'en' ? 'فارسی' : 'English'}</span>
            </button>

            {/* Quick WhatsApp Action - Clean Minimalism Black Button */}
            <a
              href="https://wa.me/989123581220"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 transition-all text-xs font-bold tracking-wider uppercase rounded-none"
              id="header-whatsapp-cta"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
              <span>{language === 'en' ? 'WHATSAPP' : 'واتس‌اپ'}</span>
            </a>
          </div>

          {/* Mobile Menu & Language Toggle Button for small screens */}
          <div className={`flex md:hidden items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`} id="mobile-header-actions">
            {/* Mobile Lang Button */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'fa' : 'en')}
              className="flex items-center justify-center p-2 text-slate-600 hover:text-slate-900 border border-slate-100 hover:bg-slate-50 transition-colors rounded-none"
              id="mobile-language-toggle-btn"
              title="Switch Language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-bold ml-1 mr-1">{language === 'en' ? 'FA' : 'EN'}</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer rounded-none"
              id="mobile-menu-toggle-btn"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-100 bg-white"
            id="mobile-nav-drawer"
          >
            <div className={`px-4 pt-3 pb-6 space-y-2 flex flex-col ${isRtl ? 'items-end text-right' : 'items-start text-left'}`}>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full py-3 px-4 text-base font-semibold transition-colors cursor-pointer rounded-none ${
                    isRtl ? 'text-right' : 'text-left'
                  } ${
                    activeTab === item.id ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  id={`mobile-nav-item-${item.id}`}
                >
                  {item.label}
                </button>
              ))}

              <div className="w-full pt-4 border-t border-slate-100 flex flex-col gap-3">
                <a
                  href="https://wa.me/989123581220"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white hover:bg-slate-800 transition-colors font-bold uppercase rounded-none text-sm"
                  id="mobile-whatsapp-cta"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t('contactWhatsApp')}</span>
                </a>
                <a
                  href="tel:+989397249841"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-slate-200 text-slate-800 hover:bg-slate-50 transition-colors font-bold rounded-none text-sm"
                  id="mobile-phone-cta"
                >
                  <Phone className="w-5 h-5 text-slate-500" />
                  <span>{language === 'en' ? 'Call Office' : 'تماس با دفتر فروش'}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
