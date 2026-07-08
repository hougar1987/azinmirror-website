import { X, MessageCircle, FileText, CheckCircle2 } from 'lucide-react';
import { Product, Language } from '../types';
import { UI_TRANSLATIONS } from '../data';
import { motion } from 'motion/react';

interface ProductDetailModalProps {
  product: Product;
  language: Language;
  onClose: () => void;
}

export default function ProductDetailModal({ product, language, onClose }: ProductDetailModalProps) {
  const t = (key: string) => UI_TRANSLATIONS[key]?.[language] || '';
  const isRtl = language === 'fa';

  const handleProductWhatsAppQuery = () => {
    const text = language === 'fa'
      ? `سلام صنایع آینه آذین. من آینه "${product.name.fa}" را در سایت شما دیدم و مایل به سفارش یا کسب اطلاعات بیشتر در مورد ابعاد و قیمت آن هستم. لطفا بنده را راهنمایی بفرمایید.`
      : `Hello Azin Mirror, I am interested in ordering or getting a quote for the "${product.name.en}" which I saw on your website. Please let me know the process.`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/989123581220?text=${encodedText}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs" id="product-detail-modal-overlay">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col"
        id="product-detail-modal-card"
      >
        
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 z-10 p-2 text-gray-500 hover:text-gray-900 bg-white/80 hover:bg-white rounded-full shadow-xs border border-gray-100 transition-colors cursor-pointer ${
            isRtl ? 'left-4' : 'right-4'
          }`}
          id="modal-close-btn"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Container (Scrollable) */}
        <div className="overflow-y-auto flex-1">
          <div className={`grid grid-cols-1 md:grid-cols-2 h-full`}>
            
            {/* Left/Top: High-Res Product Image Showcase */}
            <div className="relative bg-gray-50 aspect-square md:aspect-auto md:h-full min-h-[300px]">
              <img
                src={product.image}
                alt={product.name[language]}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Right/Bottom: Technical Details */}
            <div className={`p-6 sm:p-8 flex flex-col justify-between ${isRtl ? 'text-right font-sans' : 'text-left'}`}>
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full inline-block">
                    {language === 'fa' ? 'سفارش مستقیم کارخانه' : 'Direct Factory Order'}
                  </span>
                  <h3 className="text-2xl font-black text-gray-900 mt-2 tracking-tight">
                    {product.name[language]}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2.5 leading-relaxed">
                    {product.description[language]}
                  </p>
                </div>

                {/* Use Cases */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    {t('useCases')}
                  </h4>
                  <p className="text-xs text-gray-800 font-semibold bg-gray-50 py-2.5 px-3.5 rounded-xl inline-block border border-gray-100">
                    {product.useCase[language]}
                  </p>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    {t('keyFeatures')}
                  </h4>
                  <ul className="space-y-2">
                    {product.features.map((feat, idx) => (
                      <li 
                        key={idx} 
                        className={`text-xs text-gray-700 flex gap-2 items-start ${
                          isRtl ? 'flex-row-reverse text-right' : 'flex-row text-left'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat[language]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Specs Table */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5 flex items-center gap-1.5 justify-start">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{t('specifications')}</span>
                  </h4>
                  <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-100">
                    {product.specs.map((spec, idx) => (
                      <div 
                        key={idx} 
                        className={`grid grid-cols-2 text-xs py-2 px-3 bg-white hover:bg-gray-50/50 ${
                          isRtl ? 'text-right' : 'text-left'
                        }`}
                      >
                        <span className="font-semibold text-gray-900">{spec.key[language]}</span>
                        <span className="text-gray-500">{spec.value[language]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Actions */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleProductWhatsAppQuery}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-bold text-sm shadow-xs transition-all cursor-pointer"
                  id="modal-whatsapp-cta-btn"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>
                    {language === 'fa' ? 'سفارش فوری از واتس‌اپ' : 'Inquire via WhatsApp'}
                  </span>
                </button>
                <p className="text-[10px] text-gray-400 text-center">
                  {language === 'fa'
                    ? 'ساخت ابعاد کاملا دلخواه بین ۳ تا ۵ روز و نصب فوری در تهران.'
                    : '100% custom sizes manufactured within 3-5 days. Quick shipping across Tehran.'}
                </p>
              </div>

            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
}
