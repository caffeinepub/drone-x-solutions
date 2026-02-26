import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useGetAllTestimonials } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

const PLACEHOLDER_TESTIMONIALS = [
  {
    id: BigInt(1),
    customerName: 'Andreas Papadopoulos',
    rating: BigInt(5),
    text: 'Drone X Solutions cleaned our entire office building\'s windows in just a few hours. The results were incredible — spotless glass without any scaffolding or disruption to our business.',
    service: 'Window Cleaning',
    location: 'Limassol',
    image: undefined,
  },
  {
    id: BigInt(2),
    customerName: 'Maria Christodoulou',
    rating: BigInt(5),
    text: 'Our solar panels were producing 25% less energy due to dust buildup. After Drone X cleaned them, we\'re back to full efficiency. Highly professional team!',
    service: 'Solar Panel Cleaning',
    location: 'Nicosia',
    image: undefined,
  },
  {
    id: BigInt(3),
    customerName: 'Stavros Georgiou',
    rating: BigInt(5),
    text: 'Used their roof cleaning service for our warehouse. The drone reached areas we thought were impossible to clean safely. Excellent work and very competitive pricing.',
    service: 'Roof Cleaning',
    location: 'Paphos',
    image: undefined,
  },
];

function StarRating({ rating }: { rating: bigint }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < Number(rating) ? 'text-accent-yellow fill-accent-yellow' : 'text-muted-foreground'}`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const { data: testimonials, isLoading } = useGetAllTestimonials();

  const displayTestimonials = testimonials && testimonials.length > 0
    ? testimonials
    : PLACEHOLDER_TESTIMONIALS;

  return (
    <section id="testimonials" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-yellow/10 border border-accent-yellow/30 rounded-full px-4 py-1.5 mb-4">
            <span className="text-accent-yellow text-xs font-semibold uppercase tracking-widest">Client Reviews</span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-4">
            What Our <span className="text-gradient-yellow">Clients Say</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Trusted by businesses and homeowners across Cyprus.
          </p>
          <div className="accent-line mx-auto mt-6" />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-sm" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {displayTestimonials.map((t) => (
              <div
                key={t.id.toString()}
                className="bg-card border border-border rounded-sm p-6 card-hover relative"
              >
                <Quote className="w-8 h-8 text-accent-yellow/20 absolute top-4 right-4" />
                <StarRating rating={t.rating} />
                <p className="text-muted-foreground text-sm leading-relaxed mt-4 mb-5">
                  "{t.text}"
                </p>
                <div className="border-t border-border pt-4">
                  <div className="font-display font-bold text-sm text-foreground">{t.customerName}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {t.service} · {t.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
