import React from 'react';
import { Wind, Sun, Home, Droplets, Thermometer, Waves, Sprout, Paintbrush, Zap, Square } from 'lucide-react';
import { useGetAllServices } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

const DEFAULT_SERVICES = [
  {
    id: 'window-cleaning',
    title: 'Window Cleaning',
    description: 'Crystal-clear windows on high-rise buildings and hard-to-reach facades using precision drone technology.',
    icon: Square,
    image: '/assets/generated/icon-window.dim_128x128.png',
  },
  {
    id: 'solar-panel-cleaning',
    title: 'Solar Panel Cleaning',
    description: 'Restore up to 30% lost efficiency by removing dust, bird droppings, and grime from solar installations.',
    icon: Sun,
    image: '/assets/generated/icon-solar.dim_128x128.png',
  },
  {
    id: 'roof-cleaning',
    title: 'Roof Cleaning',
    description: 'Safe, thorough roof cleaning without scaffolding or risk to workers. Ideal for all roof types.',
    icon: Home,
    image: '/assets/generated/icon-roof.dim_128x128.png',
  },
  {
    id: 'hot-pressure-wash',
    title: 'Hot Pressure Wash',
    description: 'High-temperature pressure washing for stubborn stains, grease, and industrial contamination.',
    icon: Thermometer,
    image: null,
  },
  {
    id: 'cold-pressure-wash',
    title: 'Cold Pressure Wash',
    description: 'Effective cold-water pressure washing for delicate surfaces and general exterior cleaning.',
    icon: Droplets,
    image: null,
  },
  {
    id: 'soft-wash',
    title: 'Soft Wash',
    description: 'Low-pressure soft washing with biodegradable solutions for sensitive surfaces and painted areas.',
    icon: Waves,
    image: null,
  },
  {
    id: 'foam-application',
    title: 'Foam Application',
    description: 'Specialized foam treatments for deep cleaning and sanitization of large surface areas.',
    icon: Wind,
    image: null,
  },
  {
    id: 'pesticides',
    title: 'Pesticide Application',
    description: 'Precise aerial pesticide and herbicide application for agricultural and commercial properties.',
    icon: Sprout,
    image: null,
  },
  {
    id: 'paint-application',
    title: 'Paint Application',
    description: 'Drone-assisted paint and coating application for hard-to-reach structures and large surfaces.',
    icon: Paintbrush,
    image: null,
  },
  {
    id: 'pressured-air',
    title: 'Pressured Air',
    description: 'High-velocity air cleaning for dust removal, ventilation systems, and dry surface cleaning.',
    icon: Zap,
    image: null,
  },
];

export default function ServicesSection() {
  const { data: backendServices, isLoading } = useGetAllServices();

  const services = backendServices && backendServices.length > 0
    ? backendServices.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        icon: DEFAULT_SERVICES.find((d) => d.id === s.id)?.icon || Zap,
        imageUrl: s.image ? s.image.getDirectURL() : DEFAULT_SERVICES.find((d) => d.id === s.id)?.image || null,
      }))
    : DEFAULT_SERVICES.map((s) => ({ ...s, imageUrl: s.image }));

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-yellow/10 border border-accent-yellow/30 rounded-full px-4 py-1.5 mb-4">
            <span className="text-accent-yellow text-xs font-semibold uppercase tracking-widest">What We Do</span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-4">
            Our <span className="text-gradient-yellow">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Comprehensive drone-based cleaning solutions for every surface and application.
          </p>
          <div className="accent-line mx-auto mt-6" />
        </div>

        {/* Fleet Banner */}
        <div className="relative rounded-sm overflow-hidden mb-16 group">
          <img
            src="/assets/generated/services-banner.dim_1200x600.png"
            alt="DJI Matrice 400 in action"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/60 to-transparent flex items-center">
            <div className="px-8 md:px-12 max-w-lg">
              <div className="text-accent-yellow font-display font-bold text-sm uppercase tracking-widest mb-2">Our Fleet</div>
              <h3 className="font-display font-black text-2xl md:text-3xl text-foreground mb-3">
                DJI Matrice 400
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Industrial-grade drone platform capable of reaching up to <strong className="text-accent-yellow">120 meters</strong>. 
                Equipped for hot/cold pressure wash, soft wash, foam, pesticides, paint, and pressured air applications.
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-sm" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-card border border-border rounded-sm p-5 card-hover group cursor-default"
                >
                  <div className="w-12 h-12 rounded-sm bg-accent-yellow/10 flex items-center justify-center mb-4 group-hover:bg-accent-yellow/20 transition-colors">
                    {service.imageUrl ? (
                      <img src={service.imageUrl} alt={service.title} className="w-8 h-8 object-contain" />
                    ) : (
                      <Icon className="w-6 h-6 text-accent-yellow" />
                    )}
                  </div>
                  <h3 className="font-display font-bold text-sm text-foreground mb-2 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
