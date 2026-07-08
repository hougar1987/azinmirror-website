import { Hammer, Wrench, DraftingCompass, Sparkles, CheckCircle2 } from 'lucide-react';
import { SERVICES, UI_TRANSLATIONS } from '../data';
import { Language } from '../types';

interface ServicesSectionProps {
  language: Language;
}

export default function ServicesSection({ language }: ServicesSectionProps) {
  const t = (key: string) => UI_TRANSLATIONS[key]?.[language] || '';
  const isRtl = language === 'fa';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Hammer':
        return <Hammer className="w-5 h-5 text-white" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-white" />;
      case 'DraftingCompass':
        return <DraftingCompass className="w-5 h-5 text-white" />;
      default:
        return <Hammer className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-100" id="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 space-y-4`}>
          <span className="inline-block px-3 py-1 bg-white border border-slate-100 text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">
            {language === 'fa' ? 'مهندسی و تولید اختصاصی' : 'WHAT WE DO BEST'}
          </span>
          <h2 className="text-3xl font-light text-slate-900 tracking-tight font-sans" id="services-title">
            {language === 'fa' ? <>خدمات مهندسی و <span className="font-bold">تولید اختصاصی</span> آذین</> : <>Engineering and <span className="font-bold">Bespoke Fabrication</span></>}
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            {t('servicesSectionSubtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              className={`bg-white p-8 rounded-none border border-slate-100 transition-all flex flex-col justify-between ${
                isRtl ? 'text-right font-sans' : 'text-left'
              }`}
              id={`service-card-${service.id}`}
            >
              <div className="space-y-6">
                {/* Icon wrapper */}
                <div className={`w-12 h-12 bg-slate-900 flex items-center justify-center rounded-none ${isRtl ? 'ml-auto' : 'mr-auto'}`}>
                  {getIcon(service.iconName)}
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-900">
                    {service.title[language]}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {service.description[language]}
                  </p>
                </div>

                {/* Sub features bullet list */}
                <div className="pt-5 border-t border-slate-100 space-y-3">
                  {service.details.map((detail, index) => (
                    <div 
                      key={index} 
                      className={`flex gap-2.5 items-start text-xs text-slate-600 ${
                        isRtl ? 'flex-row-reverse text-right' : 'flex-row text-left'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                      <span>{detail[language]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
