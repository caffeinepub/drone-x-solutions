import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useGetAllTestimonials } from '../hooks/useQueries';

const DEFAULT_TESTIMONIALS = [
  {
    id: 1n,
    customerName: 'Nikos Papadopoulos',
    rating: 5n,
    text: 'Drone X Solutions transformed our solar farm. After their cleaning service, our energy output increased by 23%. The team was professional, fast, and caused zero damage to our panels.',
    service: 'Solar Panel Cleaning',
    location: 'Athens, Greece',
    image: undefined,
  },
  {
    id: 2n,
    customerName: 'Maria Stavros',
    rating: 5n,
    text: 'We hired them for our 15-story office building facade cleaning. What would have taken weeks with scaffolding was done in two days. Absolutely incredible results.',
    service: 'Window & Facade Cleaning',
    location: 'Thessaloniki, Greece',
    image: undefined,
  },
  {
    id: 3n,
    customerName: 'Alexandros Dimitriou',
    rating: 5n,
    text: 'Our industrial warehouse roof had years of grime buildup. Drone X Solutions handled it efficiently and safely. The before and after difference was shocking.',
    service: 'Industrial Surface Cleaning',
    location: 'Piraeus, Greece',
    image: undefined,
  },
  {
    id: 4n,
    customerName: 'Elena Kostas',
    rating: 4n,
    text: 'Very professional service. The drone operators were skilled and the cleaning quality was excellent. Will definitely use them again for our annual maintenance.',
    service: 'Roof Cleaning',
    location: 'Heraklion, Crete',
    image: undefined,
  },
];

export default function TestimonialsSection() {
  const { t } = useTranslation();
  const { data: backendTestimonials, isLoading } = useGetAllTestimonials();

  const testimonials = backendTestimonials && backendTestimonials.length > 0
    ? backendTestimonials
    : DEFAULT_TESTIMONIALS;

  return (
    <section id="testimonials" className="py-20 bg-steel-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block bg-amber-500/10 border border-amber-500/30 rounded px-3 py-1 mb-4">
            <span className="text-amber-500 text-xs font-display font-700 uppercase tracking-widest">
              Client Reviews
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-800 text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-white/75 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-steel-700 rounded mb-4 w-1/3" />
                <div className="h-4 bg-steel-700 rounded mb-2" />
                <div className="h-4 bg-steel-700 rounded mb-2 w-5/6" />
                <div className="h-4 bg-steel-700 rounded w-4/6" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial: any) => {
              const rating = Number(testimonial.rating);
              return (
                <div
                  key={String(testimonial.id)}
                  className="bg-card border border-border rounded-lg p-6 hover:border-amber-500/30 transition-all duration-300 relative"
                >
                  {/* Quote icon */}
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-amber-500/10" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'text-amber-500 fill-amber-500' : 'text-steel-600'}`}
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-white/80 text-sm leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-500 font-display font-700 text-sm">
                        {testimonial.customerName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-display font-700 text-white text-sm">
                        {testimonial.customerName}
                      </p>
                      <p className="text-xs text-white/60">
                        {testimonial.service} · {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
