import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { SiFacebook, SiInstagram, SiLinkedin } from 'react-icons/si';
import { Button } from '@/components/ui/button';

const WHATSAPP_NUMBER = '35799000000';
const WHATSAPP_MESSAGE = encodeURIComponent('Hello! I\'m interested in Drone X Solutions cleaning services. Could you provide more information?');

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-yellow/10 border border-accent-yellow/30 rounded-full px-4 py-1.5 mb-4">
            <span className="text-accent-yellow text-xs font-semibold uppercase tracking-widest">Get In Touch</span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-4">
            Contact <span className="text-gradient-yellow">Us</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ready to transform your property? Reach out to us — we serve all of Cyprus.
          </p>
          <div className="accent-line mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-sm p-6">
              <h3 className="font-display font-bold text-lg text-foreground mb-5">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-accent-yellow/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent-yellow" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Phone</div>
                    <a href="tel:+35799000000" className="text-foreground font-semibold hover:text-accent-yellow transition-colors">
                      +357 99 000 000
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-accent-yellow/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent-yellow" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Email</div>
                    <a href="mailto:info@dronexsolutions.cy" className="text-foreground font-semibold hover:text-accent-yellow transition-colors">
                      info@dronexsolutions.cy
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-accent-yellow/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent-yellow" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Coverage Area</div>
                    <div className="text-foreground font-semibold">All over Cyprus</div>
                    <a
                      href="https://www.google.com/maps/place/Cyprus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent-yellow hover:underline mt-0.5 inline-block"
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-card border border-border rounded-sm p-6">
              <h3 className="font-display font-bold text-sm text-foreground mb-4 uppercase tracking-wider">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: SiFacebook, label: 'Facebook', href: 'https://facebook.com/dronexsolutions' },
                  { icon: SiInstagram, label: 'Instagram', href: 'https://instagram.com/dronexsolutions' },
                  { icon: SiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/dronexsolutions' },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-sm bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-accent-yellow hover:border-accent-yellow/50 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* WhatsApp + Map CTA */}
          <div className="space-y-6">
            {/* WhatsApp CTA */}
            <div className="bg-card border border-border rounded-sm p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">Chat on WhatsApp</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Get an instant response from our team. We're available 7 days a week.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="whatsapp-btn w-full font-display font-bold text-base py-6 rounded-sm">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start WhatsApp Chat
                </Button>
              </a>
            </div>

            {/* Coverage */}
            <div className="bg-card border border-border rounded-sm p-6">
              <h3 className="font-display font-bold text-sm text-foreground mb-3 uppercase tracking-wider">Service Coverage</h3>
              <div className="grid grid-cols-2 gap-2">
                {['Nicosia', 'Limassol', 'Larnaca', 'Paphos', 'Famagusta', 'Kyrenia'].map((city) => (
                  <div key={city} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-yellow flex-shrink-0" />
                    {city}
                  </div>
                ))}
              </div>
              <a
                href="https://www.google.com/maps/place/Cyprus"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent-yellow hover:underline"
              >
                <MapPin className="w-4 h-4" />
                View full coverage on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
