import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useGetAllGalleryImages } from '../hooks/useQueries';

const DEFAULT_GALLERY = [
  {
    id: 1n,
    description: 'Solar Farm — 500 Panel Array',
    service: 'Solar Panel Cleaning',
    location: 'Attica, Greece',
    beforeImage: { getDirectURL: () => '/assets/generated/before-solar.dim_600x400.png' },
    afterImage: { getDirectURL: () => '/assets/generated/after-solar.dim_600x400.png' },
  },
  {
    id: 2n,
    description: 'Commercial Building Facade',
    service: 'Window & Facade Cleaning',
    location: 'Athens, Greece',
    beforeImage: { getDirectURL: () => '/assets/generated/gallery-before-after-1.dim_1200x600.png' },
    afterImage: { getDirectURL: () => '/assets/generated/after-solar.dim_600x400.png' },
  },
  {
    id: 3n,
    description: 'Industrial Warehouse Roof',
    service: 'Industrial Surface Cleaning',
    location: 'Piraeus, Greece',
    beforeImage: { getDirectURL: () => '/assets/generated/before-solar.dim_600x400.png' },
    afterImage: { getDirectURL: () => '/assets/generated/after-solar.dim_600x400.png' },
  },
];

export default function GallerySection() {
  const { t } = useTranslation();
  const { data: backendGallery, isLoading } = useGetAllGalleryImages();
  const [activeViews, setActiveViews] = useState<Record<string, 'before' | 'after'>>({});

  const gallery = backendGallery && backendGallery.length > 0 ? backendGallery : DEFAULT_GALLERY;

  const getView = (id: string) => activeViews[id] || 'before';
  const toggleView = (id: string, view: 'before' | 'after') => {
    setActiveViews(prev => ({ ...prev, [id]: view }));
  };

  return (
    <section id="gallery" className="py-20 bg-steel-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block bg-amber-500/10 border border-amber-500/30 rounded px-3 py-1 mb-4">
            <span className="text-amber-500 text-xs font-display font-700 uppercase tracking-widest">
              Our Results
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-800 text-white mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-white/75 max-w-2xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
                <div className="h-56 bg-steel-700" />
                <div className="p-4">
                  <div className="h-4 bg-steel-700 rounded mb-2 w-3/4" />
                  <div className="h-3 bg-steel-700 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item: any) => {
              const id = String(item.id);
              const view = getView(id);
              const imageUrl = view === 'before'
                ? item.beforeImage.getDirectURL()
                : item.afterImage.getDirectURL();

              return (
                <div
                  key={id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:border-amber-500/30 transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={`${item.description} - ${view}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Before/After label */}
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-display font-700 uppercase text-white ${
                      view === 'before'
                        ? 'bg-destructive/80'
                        : 'bg-success/80'
                    }`}>
                      {view === 'before' ? t('gallery.before') : t('gallery.after')}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-display font-700 text-white text-sm mb-1">
                      {item.description}
                    </h3>
                    <p className="text-xs text-white/65 mb-3">
                      {item.service} · {item.location}
                    </p>

                    {/* Toggle */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleView(id, 'before')}
                        className={`flex-1 py-1.5 text-xs font-display font-700 rounded transition-all ${
                          view === 'before'
                            ? 'bg-amber-500 text-steel-900'
                            : 'bg-steel-700 text-white/70 hover:text-white'
                        }`}
                      >
                        {t('gallery.toggleBefore')}
                      </button>
                      <button
                        onClick={() => toggleView(id, 'after')}
                        className={`flex-1 py-1.5 text-xs font-display font-700 rounded transition-all ${
                          view === 'after'
                            ? 'bg-amber-500 text-steel-900'
                            : 'bg-steel-700 text-white/70 hover:text-white'
                        }`}
                      >
                        {t('gallery.toggleAfter')}
                      </button>
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
