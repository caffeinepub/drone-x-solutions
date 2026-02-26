import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { SiFacebook, SiInstagram, SiLinkedin } from 'react-icons/si';
import { useTranslation } from '../hooks/useTranslation';

export default function ContactSection() {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: Phone,
      label: t('contact.phone'),
      value: '+357 25 123 456',
      href: 'tel:+35725123456',
    },
    {
      icon: Mail,
      label: t('contact.email'),
      value: 'info@dronexsolutions.cy',
      href: 'mailto:info@dronexsolutions.cy',
    },
    {
      icon: MapPin,
      label: t('contact.address'),
      value: 'Arch. Makariou III 44, Limassol 3105, Cyprus',
      href: 'https://maps.google.com',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-steel-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div>
            <div className="inline-block bg-amber-500/10 border border-amber-500/30 rounded px-3 py-1 mb-4">
              <span className="text-amber-500 text-xs font-display font-700 uppercase tracking-widest">
                Reach Out
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-800 text-white mb-3">
              {t('contact.title')}
            </h2>
            <p className="text-white/75 mb-8">{t('contact.subtitle')}</p>

            {/* Contact Items */}
            <div className="space-y-4 mb-8">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs text-white/55 uppercase tracking-wide">{label}</p>
                    <p className="text-white font-medium group-hover:text-amber-500 transition-colors">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/35725123456"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-success/10 border border-success/30 hover:bg-success/20 text-success font-display font-700 px-6 py-3 rounded transition-all mb-8"
            >
              <MessageCircle className="w-5 h-5" />
              {t('contact.whatsapp')}
            </a>

            {/* Social Media */}
            <div>
              <p className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wide">
                {t('contact.followUs')}
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: SiFacebook, href: 'https://facebook.com', label: 'Facebook' },
                  { Icon: SiInstagram, href: 'https://instagram.com', label: 'Instagram' },
                  { Icon: SiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 bg-card border border-border rounded flex items-center justify-center text-white/60 hover:text-amber-500 hover:border-amber-500/50 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Map placeholder / Image */}
          <div className="relative rounded-lg overflow-hidden border border-border h-80 lg:h-auto min-h-64">
            <img
              src="/assets/generated/services-banner.dim_1200x600.png"
              alt="Drone X Solutions Operations"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-steel-900/80 to-transparent flex items-end p-6">
              <div>
                <p className="font-display font-700 text-white text-lg">Drone X Solutions</p>
                <p className="text-white/70 text-sm">Limassol, Cyprus · Serving the Mediterranean Region</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
