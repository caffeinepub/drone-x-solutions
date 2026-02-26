import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { useGetAllGalleryImages } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

const PLACEHOLDER_GALLERY = [
  {
    id: BigInt(1),
    description: 'Solar panel array — before and after professional drone cleaning',
    service: 'Solar Panel Cleaning',
    location: 'Limassol',
    beforeUrl: '/assets/generated/before-solar.dim_600x400.png',
    afterUrl: '/assets/generated/after-solar.dim_600x400.png',
  },
];

interface GalleryCardProps {
  beforeUrl: string;
  afterUrl: string;
  description: string;
  service: string;
  location: string;
}

function GalleryCard({ beforeUrl, afterUrl, description, service, location }: GalleryCardProps) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="bg-card border border-border rounded-sm overflow-hidden card-hover">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={showAfter ? afterUrl : beforeUrl}
          alt={showAfter ? 'After cleaning' : 'Before cleaning'}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-bold px-2 py-1 rounded-sm ${showAfter ? 'bg-accent-yellow text-navy-dark' : 'bg-secondary text-foreground'}`}>
            {showAfter ? 'AFTER' : 'BEFORE'}
          </span>
        </div>
        <button
          onClick={() => setShowAfter(!showAfter)}
          className="absolute bottom-3 right-3 bg-navy-dark/80 hover:bg-navy-dark text-foreground border border-border rounded-sm px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          Toggle
        </button>
      </div>
      <div className="p-4">
        <p className="text-sm text-foreground font-medium mb-1">{description}</p>
        <p className="text-xs text-muted-foreground">{service} · {location}</p>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const { data: galleryImages, isLoading } = useGetAllGalleryImages();

  const displayImages = galleryImages && galleryImages.length > 0
    ? galleryImages.map((img) => ({
        id: img.id,
        description: img.description,
        service: img.service,
        location: img.location,
        beforeUrl: img.beforeImage.getDirectURL(),
        afterUrl: img.afterImage.getDirectURL(),
      }))
    : PLACEHOLDER_GALLERY;

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-yellow/10 border border-accent-yellow/30 rounded-full px-4 py-1.5 mb-4">
            <span className="text-accent-yellow text-xs font-semibold uppercase tracking-widest">Results</span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-4">
            Before & <span className="text-gradient-yellow">After</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See the dramatic difference our drone cleaning services make. Toggle between before and after to compare results.
          </p>
          <div className="accent-line mx-auto mt-6" />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-sm" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {displayImages.map((img) => (
              <GalleryCard
                key={img.id.toString()}
                beforeUrl={img.beforeUrl}
                afterUrl={img.afterUrl}
                description={img.description}
                service={img.service}
                location={img.location}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
