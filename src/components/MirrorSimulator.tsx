import { useState } from 'react';
import { Sparkles, Sun, ToggleLeft, ToggleRight, Paintbrush, Layers, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';

interface MirrorSimulatorProps {
  language: Language;
}

type LightColor = 'warm' | 'natural' | 'cool';
type WallTexture = 'stone' | 'tile' | 'concrete';
type MirrorShape = 'arch' | 'round' | 'asymmetric';

export default function MirrorSimulator({ language }: MirrorSimulatorProps) {
  const [lightOn, setLightOn] = useState<boolean>(true);
  const [lightColor, setLightColor] = useState<LightColor>('natural');
  const [wallTexture, setWallTexture] = useState<WallTexture>('stone');
  const [mirrorShape, setMirrorShape] = useState<MirrorShape>('arch');

  const isRtl = language === 'fa';

  // Translations
  const t = {
    title: {
      fa: 'شبیه‌ساز تعاملی نور و تاچ آینه',
      en: 'Interactive Light & Touch Simulator'
    },
    subtitle: {
      fa: 'پیش‌نمایش آنلاین آینه‌های هوشمند آذین در دکوراسیون و نورپردازی‌های مختلف',
      en: 'Online preview of Azin smart mirrors in different environments and lighting modes'
    },
    lightStatus: {
      fa: 'وضعیت نور ال‌دی‌دی',
      en: 'LED Lighting State'
    },
    colorTemp: {
      fa: 'دمای رنگ نور (کلوین)',
      en: 'Color Temperature'
    },
    wallType: {
      fa: 'بافت و رنگ دیواره',
      en: 'Wall Background Texture'
    },
    shapeType: {
      fa: 'شکل شاسی آینه',
      en: 'Mirror Design Shape'
    },
    on: { fa: 'روشن', en: 'ON' },
    off: { fa: 'خاموش', en: 'OFF' },
    warm: { fa: 'آفتابی (3000K)', en: 'Warm (3000K)' },
    natural: { fa: 'نچرال (4000K)', en: 'Neutral (4000K)' },
    cool: { fa: 'مهتابی (6000K)', en: 'Cool (6000K)' },
    stone: { fa: 'سنگ اسلب تیره', en: 'Luxury Slate' },
    tile: { fa: 'کاشی مدرن حمام', en: 'Grid Bathroom Tiles' },
    concrete: { fa: 'بتن اکسپوز صنعتی', en: 'Exposed Concrete' },
    arch: { fa: 'طاق رومی (Arch)', en: 'Elegant Arch' },
    round: { fa: 'گرد بزرگ (Round)', en: 'Minimalist Round' },
    asymmetric: { fa: 'نامتقارن ارگانیک', en: 'Organic Asymmetric' },
    sensorTip: {
      fa: 'برای روشن و خاموش کردن نور، روی سنسور لمسی (دایره آبی رنگ روی شیشه) کلیک کنید.',
      en: 'Click directly on the smart touch sensor (blue/white ring on glass) to toggle the light.'
    }
  };

  // Color values for shadows
  const getGlowColor = () => {
    switch (lightColor) {
      case 'warm':
        return 'rgba(253, 184, 39, 0.65)'; // Warm gold/yellow glow
      case 'natural':
        return 'rgba(255, 234, 167, 0.7)'; // Cozy warm-white
      case 'cool':
        return 'rgba(223, 249, 251, 0.8)'; // Ice cool white-blue
    }
  };

  // CSS for Wall Texture Styling
  const getWallStyle = () => {
    switch (wallTexture) {
      case 'stone':
        // Elegant marble/slate texture with dark grey veins
        return {
          backgroundColor: '#1e272e',
          backgroundImage: `
            linear-gradient(45deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%), 
            linear-gradient(-45deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.03) 75%), 
            linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.03) 75%)
          `,
          backgroundSize: '100px 100px',
        };
      case 'tile':
        // Grid tiles using CSS linear-gradients
        return {
          backgroundColor: '#2c3e50',
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        };
      case 'concrete':
        // Textured concrete with radial gradients representing rough patches
        return {
          backgroundColor: '#57606f',
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
          backgroundPosition: '0 0, 8px 8px',
        };
    }
  };

  // CSS for Mirror Shape Styling
  const getMirrorShapeClasses = () => {
    switch (mirrorShape) {
      case 'arch':
        return 'rounded-t-full w-[260px] h-[380px]';
      case 'round':
        return 'rounded-full w-[320px] h-[320px]';
      case 'asymmetric':
        // Flowing fluid curve shape using border-radius values
        return 'rounded-[40%_60%_70%_30%_/_50%_40%_60%_50%] w-[280px] h-[350px]';
    }
  };

  const glowColor = getGlowColor();

  return (
    <section className="py-24 bg-slate-50 border-t border-b border-slate-100" id="mirror-simulator-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 text-[10px] font-bold tracking-widest text-slate-500 uppercase rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>{language === 'fa' ? 'پیش‌نمایش تعاملی زنده' : 'LIVE INTERACTIVE PREVIEW'}</span>
          </div>
          <h2 className="text-3xl font-light text-slate-900 tracking-tight">
            {isRtl ? (
              <>شبیه‌ساز هوشمند <span className="font-bold">نورپردازی و دکوراسیون</span></>
            ) : (
              <>Smart <span className="font-bold">Backlight & Texture Simulator</span></>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto font-sans">
            {t.subtitle[language]}
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Interactive Canvas (Col span 7) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* The Wall Canvas Container */}
            <div 
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex items-center justify-center transition-all duration-700 ease-in-out select-none animate-fade-in"
              style={getWallStyle()}
              id="simulator-wall-canvas"
            >
              {/* Subtle ambient shadow for realistic wall rendering */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/35 pointer-events-none" />

              {/* BACKLIGHT GLOW EFFECT (Pure CSS) */}
              <AnimatePresence>
                {lightOn && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1.05,
                      boxShadow: `0 0 70px 20px ${glowColor}, 0 0 120px 45px ${glowColor}`,
                    }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{ backgroundColor: glowColor }}
                    className={`absolute filter blur-xl transition-colors duration-500 pointer-events-none ${getMirrorShapeClasses()}`}
                  />
                )}
              </AnimatePresence>

              {/* THE MIRROR GLASS GLASSMORPHISM */}
              <div 
                className={`relative bg-white/10 backdrop-blur-xs border border-white/30 shadow-inner flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ease-in-out ${getMirrorShapeClasses()}`}
                id="simulator-mirror-glass"
              >
                {/* Mirror reflection overlay shine */}
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 pointer-events-none" />
                
                {/* Frosted Sandblasted Edge Accent (if light is ON, edge glows) */}
                <div 
                  className={`absolute inset-3 border transition-colors duration-500 pointer-events-none ${
                    mirrorShape === 'arch' ? 'rounded-t-full' : 
                    mirrorShape === 'round' ? 'rounded-full' : 
                    'rounded-[40%_60%_70%_30%_/_50%_40%_60%_50%]'
                  } ${
                    lightOn 
                      ? 'border-white/50 bg-white/5' 
                      : 'border-white/20 bg-transparent'
                  }`} 
                />

                {/* Touch Sensor Switch Button (On Glass) */}
                <div className="absolute bottom-10 z-20 flex flex-col items-center">
                  <button
                    onClick={() => setLightOn(!lightOn)}
                    className="group relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer bg-black/40 hover:bg-black/60 border border-white/40"
                    title="Toggle Touch Sensor"
                    id="simulator-touch-sensor"
                  >
                    {/* Glowing outer aura for the sensor */}
                    <span className={`absolute inset-[-4px] rounded-full transition-all duration-500 animate-ping opacity-60 ${
                      lightOn ? 'bg-blue-400' : 'bg-white/20'
                    }`} />
                    
                    {/* Sensor inner icon ring */}
                    <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      lightOn 
                        ? 'border-blue-400 bg-blue-500/20 shadow-[0_0_8px_#60a5fa]' 
                        : 'border-white/70 bg-transparent'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        lightOn ? 'bg-blue-400' : 'bg-white/80'
                      }`} />
                    </div>
                  </button>
                  <span className="text-[7px] font-mono tracking-widest text-white/50 mt-1 uppercase">Touch</span>
                </div>

                {/* LED Spec Label Overlay */}
                <div className="absolute top-8 text-center pointer-events-none opacity-40">
                  <span className="text-[9px] font-mono tracking-widest text-white uppercase block">Azin Mirror</span>
                  <span className="text-[7px] font-mono tracking-widest text-white/80 uppercase block">Smart Vanity v2.0</span>
                </div>
              </div>

            </div>

            {/* Hint message under the screen */}
            <p className="text-[10px] text-slate-400 mt-4 text-center font-sans">
              📍 {t.sensorTip[language]}
            </p>
          </div>

          {/* Column 2: Controls Panel (Col span 5) */}
          <div className={`lg:col-span-5 space-y-8 ${isRtl ? 'font-sans text-right' : 'text-left'}`}>
            
            {/* Mirror Shape Selection */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex gap-2 items-center justify-start">
                <Maximize2 className="w-4 h-4 text-slate-500" />
                <span>{t.shapeType[language]}</span>
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(['arch', 'round', 'asymmetric'] as MirrorShape[]).map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setMirrorShape(shape)}
                    className={`py-2 px-3 text-xs font-bold transition-all border rounded-none cursor-pointer ${
                      mirrorShape === shape 
                        ? 'bg-slate-900 border-slate-900 text-white shadow-xs' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {t[shape][language]}
                  </button>
                ))}
              </div>
            </div>

            {/* Light Toggle Switch */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex gap-2 items-center justify-start">
                <Sun className="w-4 h-4 text-slate-500" />
                <span>{t.lightStatus[language]}</span>
              </label>
              <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={() => setLightOn(!lightOn)}
                  className="flex items-center gap-1.5 transition-all cursor-pointer"
                  id="simulator-light-toggle-btn"
                >
                  {lightOn ? (
                    <ToggleRight className="w-12 h-7 text-slate-900 fill-slate-900" />
                  ) : (
                    <ToggleLeft className="w-12 h-7 text-slate-300 fill-slate-200" />
                  )}
                </button>
                <span className="text-xs font-bold text-slate-900">
                  {lightOn ? t.on[language] : t.off[language]}
                </span>
              </div>
            </div>

            {/* LED Light Color Temperature */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex gap-2 items-center justify-start">
                <Layers className="w-4 h-4 text-slate-500" />
                <span>{t.colorTemp[language]}</span>
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(['warm', 'natural', 'cool'] as LightColor[]).map((color) => (
                  <button
                    key={color}
                    disabled={!lightOn}
                    onClick={() => setLightColor(color)}
                    className={`py-3 px-3 text-xs font-bold transition-all border rounded-none cursor-pointer flex flex-col items-center gap-1.5 ${
                      !lightOn ? 'opacity-40 cursor-not-allowed' : ''
                    } ${
                      lightColor === color && lightOn
                        ? 'bg-slate-900 border-slate-900 text-white shadow-xs' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {/* Circle representing the color dot */}
                    <span className={`w-3.5 h-3.5 rounded-full border border-black/10 ${
                      color === 'warm' ? 'bg-[#f1c40f]' : 
                      color === 'natural' ? 'bg-[#ffeaa7]' : 
                      'bg-[#dff9fb]'
                    }`} />
                    <span>{t[color][language]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Wall Textures selection */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex gap-2 items-center justify-start">
                <Paintbrush className="w-4 h-4 text-slate-500" />
                <span>{t.wallType[language]}</span>
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(['stone', 'tile', 'concrete'] as WallTexture[]).map((texture) => (
                  <button
                    key={texture}
                    onClick={() => setWallTexture(texture)}
                    className={`py-3 px-3 text-xs font-bold transition-all border rounded-none cursor-pointer flex flex-col items-center gap-1.5 ${
                      wallTexture === texture 
                        ? 'bg-slate-900 border-slate-900 text-white shadow-xs' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {/* Color square for texture visualization */}
                    <span className={`w-5 h-5 border border-black/10 ${
                      texture === 'stone' ? 'bg-[#1e272e]' : 
                      texture === 'tile' ? 'bg-[#2c3e50]' : 
                      'bg-[#57606f]'
                    }`} />
                    <span>{t[texture][language]}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
