import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, HelpCircle, Phone, ArrowRight, MessageSquare } from 'lucide-react';
import { Language } from '../types';
import { ONLINE_PURCHASE_FAQS } from '../data';

interface FAQSectionProps {
  language: Language;
  onNavigateToContact: () => void;
}

export default function FAQSection({ language, onNavigateToContact }: FAQSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const isRtl = language === 'fa';

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  // FAQ Schema markup (JSON-LD) for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": ONLINE_PURCHASE_FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.question[language],
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer[language]
      }
    }))
  };

  return (
    <div className="bg-white text-slate-900 pb-20" id="faq-section-container">
      {/* Dynamic SEO JSON-LD FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-50 border-b border-slate-100" id="faq-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 text-slate-500 text-xs font-semibold tracking-wider uppercase">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <span>{language === 'fa' ? 'راهنمای مشتریان' : 'CUSTOMER GUIDE'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-light text-slate-900 leading-tight max-w-3xl mx-auto tracking-tight">
            {language === 'fa' ? (
              <>
                سوالات متداول <span className="font-bold border-b-2 border-amber-500/30">خرید آنلاین آینه</span> از آذین میرور
              </>
            ) : (
              <>
                Frequently Asked Questions for <span className="font-bold border-b-2 border-amber-500/30">Online Purchase</span>
              </>
            )}
          </h1>

          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            {language === 'fa' 
              ? 'پاسخ به سوالات پرتکرار مشتریان درباره نحوه ثبت سفارش، شیوه ارسال آینه به سراسر کشور، شرایط گارانتی و شیوه‌های پرداخت آینه آذین.'
              : 'Find direct, transparent answers about placing an order, shipping mirrors nationwide, quality guarantees, and payment options.'}
          </p>
        </div>
      </section>

      {/* 2. ACCORDION FAQ CONTENT */}
      <section className="py-16 sm:py-20" id="faq-accordion-list">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {ONLINE_PURCHASE_FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div 
                  key={idx}
                  className="border border-slate-100 bg-white transition-all hover:border-slate-200"
                  id={`faq-card-${idx}`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className={`w-full py-5 px-6 flex justify-between items-center gap-4 cursor-pointer text-right hover:bg-slate-50/50 transition-colors ${
                      isRtl ? 'text-right flex-row-reverse' : 'text-left'
                    }`}
                  >
                    <span className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                      {faq.question[language]}
                    </span>
                    <span className="shrink-0 text-slate-400 bg-slate-50 p-1.5 border border-slate-100 rounded-none">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-600" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className={`px-6 pb-6 pt-2 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-50 ${isRtl ? 'text-right' : 'text-left'}`}>
                          <p className="whitespace-pre-line">
                            {faq.answer[language]}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FINAL CTA SECTION */}
      <section className="py-8 sm:py-12" id="faq-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-950 text-white p-10 sm:p-14 text-center space-y-6 relative overflow-hidden border border-slate-900">
            {/* Background Accent */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/10 blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 space-y-4">
              <h3 className="text-lg sm:text-2xl font-light text-white">
                {language === 'fa' ? 'آذین میرور؛ بازتاب زیبایی در فضای شما' : 'Azin Mirror; Reflecting Beauty in Your Space'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
                {language === 'fa' 
                  ? 'هنوز پاسخ سوال خود را پیدا نکرده‌اید؟ پشتیبانان فنی و فروش ما آماده پاسخگویی و ارائه مشاوره رایگان به شما هستند.'
                  : 'Still have unanswered questions? Contact our customer support team directly for free consultation.'}
              </p>
              
              <div className="pt-4">
                <button
                  onClick={onNavigateToContact}
                  className="px-8 py-3.5 bg-white text-slate-950 hover:bg-slate-100 text-xs font-bold uppercase tracking-wider transition-colors rounded-none cursor-pointer inline-flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{language === 'fa' ? 'تماس با آذین میرور' : 'Contact Azin Mirror'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
