import React from 'react';
import { Zap, Wind, Sun, Building2, Droplets, Shield } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useGetAllServices } from '../hooks/useQueries';
import type { ExternalBlob } from '../backend';

const DEFAULT_SERVICES = [
  {
    id: 'solar',
    title: 'Solar Panel Cleaning',
    description: 'Maximize energy output with our precision drone cleaning for solar arrays. Remove dust, bird droppings, and debris without panel damage.',
    icon: Sun,
    image: '/assets/generated/icon-solar.dim_128x128.png',
  },
  {
    id: 'window',
    title: 'Window & Facade Cleaning',
    description: 'High-rise and commercial building facade cleaning using advanced drone technology. Safe, efficient, and streak-free results.',
    icon: Building2,
    image: '/assets/generated/icon-window.dim_128x128.png',
  },
  {
    id: 'roof',
    title: 'Roof & Gutter Cleaning',
    description: 'Complete roof surface and gutter cleaning from above. Our drones reach every corner safely without scaffolding or ladders.',
    icon: Shield,
    image: '/assets/generated/icon-roof.dim_128x128.png',
  },
  {
    id: 'industrial',
    title: 'Industrial Surface Cleaning',
    description: 'Heavy-duty cleaning for industrial facilities, warehouses, and manufacturing plants. Reduce downtime with our rapid drone deployment.',
    icon: Zap,
    image: null,
  },
  {
    id: 'wind',
    title: 'Wind Turbine Cleaning',
    description: 'Specialized drone cleaning for wind turbine blades. Maintain peak efficiency and extend equipment lifespan.',
    icon: Wind,
    image: null,
  },
  {
    id: 'water',
    title: 'Water Tank Inspection & Clean',
    description: 'Safe internal inspection and cleaning of water storage tanks using waterproof drone technology.',
    icon: Droplets,
    image: null,
  },
];

/**
 * Safely get a direct URL from an ExternalBlob-like object.
 * Guards against plain objects that don't have the getDirectURL method.
 */
function getImageUrl(image: ExternalBlob | undefined | null): string | null {
  if (!image) return null;
  if (typeof (image as ExternalBlob).getDirectURL === 'function') {
    return (image as ExternalBlob).getDirectURL();
  }
  return null;
}

export default function ServicesSection() {
  const { t } = useTranslation();
  const { data: backendServices, isLoading } = useGetAllServices();

  const services = backendServices && backendServices.length > 0 ? backendServices : DEFAULT_SERVICES;

  return (
    <section id="services" className="py-20 bg-steel-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block bg-amber-500/10 border border-amber-500/30 rounded px-3 py-1 mb-4">
            <span className="text-amber-500 text-xs font-display font-700 uppercase tracking-widest">
              What We Do
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-800 text-white mb-4">
            {t('services.title')}
          </h2>
          <p className="text-white/75 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
                <div className="w-12 h-12 bg-steel-700 rounded mb-4" />
                <div className="h-5 bg-steel-700 rounded mb-3 w-3/4" />
                <div className="h-4 bg-steel-700 rounded mb-2" />
                <div className="h-4 bg-steel-700 rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: any, index: number) => {
              const IconComponent = DEFAULT_SERVICES.find(d => d.id === service.id)?.icon || Zap;
              const backendImageUrl = getImageUrl(service.image);
              const fallbackImage = DEFAULT_SERVICES.find(d => d.id === service.id)?.image;
              const imageUrl = backendImageUrl || fallbackImage;

              return (
                <div
                  key={service.id || index}
                  className="group bg-card border border-border rounded-lg p-6 hover:border-amber-500/50 transition-all duration-300 hover:shadow-card-hover"
                >
                  {/* Icon / Image */}
                  <div className="mb-4">
                    {imageUrl ? (
                      <img src={imageUrl} alt={service.title} className="w-12 h-12 object-contain" />
                    ) : (
                      <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-amber-500" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-lg font-700 text-white mb-2 group-hover:text-amber-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/75 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Accent line on hover */}
                  <div className="mt-4 h-0.5 w-0 bg-amber-500 group-hover:w-full transition-all duration-300" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
