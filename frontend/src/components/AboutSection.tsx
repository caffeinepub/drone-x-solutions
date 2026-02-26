import React from 'react';
import { Shield, Award, Users, Cpu } from 'lucide-react';
import { useGetHomepageContent } from '../hooks/useQueries';

const highlights = [
  {
    icon: Cpu,
    title: 'DJI Matrice 400',
    desc: 'Industrial-grade drone platform with multi-payload capability and up to 120m operational height.',
  },
  {
    icon: Shield,
    title: 'Safety First',
    desc: 'Fully certified operators, comprehensive insurance, and strict safety protocols on every job.',
  },
  {
    icon: Award,
    title: 'Certified Experts',
    desc: 'Licensed drone pilots with specialized training in industrial cleaning applications.',
  },
  {
    icon: Users,
    title: 'Dedicated Team',
    desc: 'Experienced professionals committed to delivering exceptional results across Cyprus.',
  },
];

export default function AboutSection() {
  const { data: content } = useGetHomepageContent();

  const aboutText = content?.aboutText ||
    'Drone X Solutions is Cyprus\'s premier drone cleaning company, combining cutting-edge aerial technology with professional cleaning expertise. Founded with a mission to revolutionize building maintenance, we deploy the DJI Matrice 400 — one of the most advanced industrial drones available — to deliver safe, efficient, and thorough cleaning services across the island. Our team of certified pilots and cleaning specialists brings precision and professionalism to every project, from residential solar panels to commercial high-rises.';

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Images */}
          <div className="relative">
            <div className="relative rounded-sm overflow-hidden">
              <img
                src="/assets/generated/about-team.dim_800x600.png"
                alt="Drone X Solutions Team"
                className="w-full h-80 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent" />
            </div>
            {/* Floating fleet card */}
            <div className="absolute -bottom-6 -right-4 md:-right-8 w-48 md:w-56 rounded-sm overflow-hidden border-2 border-accent-yellow shadow-glow-lg">
              <img
                src="/assets/generated/fleet-drone.dim_800x600.png"
                alt="DJI Matrice 400 Fleet"
                className="w-full h-32 md:h-36 object-cover"
              />
              <div className="bg-card px-3 py-2">
                <div className="text-accent-yellow font-display font-bold text-xs">DJI MATRICE 400</div>
                <div className="text-muted-foreground text-xs">Up to 120m height</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-4">
            <div className="inline-flex items-center gap-2 bg-accent-yellow/10 border border-accent-yellow/30 rounded-full px-4 py-1.5 mb-4">
              <span className="text-accent-yellow text-xs font-semibold uppercase tracking-widest">About Us</span>
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-6">
              Precision Cleaning <span className="text-gradient-yellow">From Above</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              {aboutText}
            </p>
            <div className="accent-line mb-8" />

            {/* Highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-sm bg-accent-yellow/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-accent-yellow" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm text-foreground mb-1">{item.title}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
