import React from 'react';
import { CheckCircle2, Award, Users, Clock } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useGetHomepageContent } from '../hooks/useQueries';

const DEFAULT_ABOUT_TEXT = `Drone X Solutions was founded with a single mission: to revolutionize industrial cleaning through cutting-edge drone technology. Our team of certified drone operators and cleaning specialists brings together years of expertise in both aviation and industrial maintenance.

We serve clients across Cyprus and the broader Mediterranean region, delivering precision cleaning services that traditional methods simply cannot match. Our proprietary drone systems are equipped with specialized cleaning attachments, high-pressure water systems, and advanced sensors to ensure thorough, damage-free results every time.

Safety, efficiency, and environmental responsibility are at the core of everything we do. We use biodegradable cleaning solutions and our drone operations eliminate the need for scaffolding, reducing both risk and environmental impact.`;

const HIGHLIGHTS = [
  { icon: CheckCircle2, key: 'about.highlight1' as const },
  { icon: Award, key: 'about.highlight2' as const },
  { icon: Users, key: 'about.highlight3' as const },
  { icon: Clock, key: 'about.highlight4' as const },
];

export default function AboutSection() {
  const { t } = useTranslation();
  const { data: content } = useGetHomepageContent();

  const aboutText = content?.aboutText || DEFAULT_ABOUT_TEXT;

  return (
    <section id="about" className="py-20 bg-steel-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden border border-border shadow-industrial">
              <img
                src="/assets/generated/about-team.dim_800x600.png"
                alt="Drone X Solutions Team"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-steel-900/60 to-transparent" />
            </div>

            {/* Floating drone card */}
            <div className="absolute -bottom-6 -right-6 w-48 rounded-lg overflow-hidden border-2 border-amber-500 shadow-amber-glow hidden lg:block">
              <img
                src="/assets/generated/fleet-drone.dim_800x600.png"
                alt="Drone Fleet"
                className="w-full h-32 object-cover"
              />
              <div className="bg-card px-3 py-2">
                <p className="text-xs font-display font-700 text-amber-500">Our Fleet</p>
                <p className="text-xs text-white/70">Latest Gen Drones</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-6">
            <div className="inline-block bg-amber-500/10 border border-amber-500/30 rounded px-3 py-1 mb-4">
              <span className="text-amber-500 text-xs font-display font-700 uppercase tracking-widest">
                Our Story
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-800 text-white mb-2">
              {t('about.title')}
            </h2>
            <p className="text-amber-500 font-medium mb-6">{t('about.subtitle')}</p>

            <div className="text-white/80 leading-relaxed space-y-4 mb-8">
              {aboutText.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3">
              {HIGHLIGHTS.map(({ icon: Icon, key }) => (
                <div
                  key={key}
                  className="flex items-center gap-3 bg-card border border-border rounded p-3"
                >
                  <div className="w-8 h-8 bg-amber-500/10 rounded flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-amber-500" />
                  </div>
                  <span className="text-sm font-medium text-white">{t(key)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
