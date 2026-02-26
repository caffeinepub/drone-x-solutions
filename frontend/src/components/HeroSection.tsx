import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useGetHomepageContent } from '../hooks/useQueries';

const DEFAULT_STATS = [
  { value: '500+', labelKey: 'hero.stat1Label' as const },
  { value: '98%', labelKey: 'hero.stat2Label' as const },
  { value: '8+', labelKey: 'hero.stat3Label' as const },
];

export default function HeroSection() {
  const { t } = useTranslation();
  const { data: content } = useGetHomepageContent();

  const heroTitle = content?.heroTitle || 'Advanced Drone Cleaning Solutions';
  const heroSubtitle = content?.heroSubtitle || 'Professional drone-powered cleaning for solar panels, windows, rooftops, and industrial surfaces across Cyprus. Safer, faster, and more efficient than traditional methods.';
  const ctaText = content?.ctaText || t('hero.cta');
  const heroImageUrl = content?.heroImage ? content.heroImage.getDirectURL() : '/assets/generated/hero-bg.dim_1920x1080.png';

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-steel-900/75 via-steel-900/60 to-steel-900/90" />

      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-6">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          <span className="text-amber-500 text-sm font-display font-600 tracking-wide uppercase">
            {t('hero.badge')}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-900 text-white leading-tight mb-6">
          {heroTitle.split(' ').map((word, i) => {
            const accentWords = ['Drone', 'X', 'Solutions', 'Advanced', 'Cleaning'];
            return accentWords.includes(word) ? (
              <span key={i} className="text-amber-500">{word} </span>
            ) : (
              <span key={i}>{word} </span>
            );
          })}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white/85 max-w-3xl mx-auto mb-10 leading-relaxed">
          {heroSubtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={scrollToBooking}
            className="bg-amber-500 hover:bg-amber-400 text-steel-900 font-display font-700 text-base px-8 py-4 rounded transition-all hover:shadow-amber-glow transform hover:-translate-y-0.5"
          >
            {ctaText}
          </button>
          <button
            onClick={scrollToGallery}
            className="border border-white/30 hover:border-amber-500 text-white hover:text-amber-500 font-display font-600 text-base px-8 py-4 rounded transition-all"
          >
            {t('hero.ctaSecondary')}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {DEFAULT_STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-3xl font-900 text-amber-500">{stat.value}</div>
              <div className="text-xs text-white/70 mt-1 uppercase tracking-wide">{t(stat.labelKey)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-amber-500 transition-colors animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}
