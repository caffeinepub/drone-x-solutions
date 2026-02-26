import React from 'react';
import { ChevronDown, Zap, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetHomepageContent } from '../hooks/useQueries';

export default function HeroSection() {
  const { data: content } = useGetHomepageContent();

  const heroTitle = content?.heroTitle || 'Professional Drone Cleaning Services';
  const heroSubtitle = content?.heroSubtitle || 'Covering all of Cyprus with cutting-edge DJI Matrice 400 technology. From windows to solar panels, rooftops to facades — we clean what others can\'t reach.';
  const ctaText = content?.ctaText || 'Get a Free Quote';

  const heroImageUrl = content?.heroImage
    ? content.heroImage.getDirectURL()
    : '/assets/generated/hero-bg.dim_1920x1080.png';

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(oklch(0.82 0.18 85) 1px, transparent 1px), linear-gradient(90deg, oklch(0.82 0.18 85) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-accent-yellow/10 border border-accent-yellow/30 rounded-full px-4 py-1.5 mb-6">
          <MapPin className="w-3.5 h-3.5 text-accent-yellow" />
          <span className="text-accent-yellow text-xs font-semibold uppercase tracking-widest">All Over Cyprus</span>
        </div>

        {/* Brand */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-accent-yellow/50" />
          <span className="text-accent-yellow font-display font-bold text-sm uppercase tracking-[0.3em]">Drone X Solutions</span>
          <div className="h-px w-12 bg-accent-yellow/50" />
        </div>

        {/* Title */}
        <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight max-w-5xl mx-auto">
          {heroTitle.split(' ').map((word, i) => (
            <span key={i}>
              {i === 1 || i === 2 ? (
                <span className="text-gradient-yellow">{word} </span>
              ) : (
                `${word} `
              )}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          {heroSubtitle}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
          {[
            { value: '120m', label: 'Max Height' },
            { value: 'DJI M400', label: 'Fleet' },
            { value: '10+', label: 'Applications' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-black text-2xl text-accent-yellow">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={scrollToBooking}
            size="lg"
            className="bg-accent-yellow text-navy-dark hover:bg-accent-yellow/90 font-display font-bold text-base px-8 py-6 rounded-sm shadow-glow animate-pulse-glow"
          >
            <Zap className="w-5 h-5 mr-2" />
            {ctaText}
          </Button>
          <Button
            onClick={scrollToServices}
            variant="outline"
            size="lg"
            className="border-foreground/30 text-foreground hover:bg-foreground/10 font-semibold text-base px-8 py-6 rounded-sm"
          >
            Explore Services
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-accent-yellow transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
