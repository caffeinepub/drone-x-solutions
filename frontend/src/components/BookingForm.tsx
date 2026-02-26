import React, { useState } from 'react';
import { CalendarDays, CheckCircle2, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSubmitBookingRequest, useGetAllServices } from '../hooks/useQueries';

const DEFAULT_SERVICE_OPTIONS = [
  'Window Cleaning',
  'Solar Panel Cleaning',
  'Roof Cleaning',
  'Hot Pressure Wash',
  'Cold Pressure Wash',
  'Soft Wash',
  'Foam Application',
  'Pesticide Application',
  'Paint Application',
  'Pressured Air',
];

export default function BookingForm() {
  const { data: services } = useGetAllServices();
  const submitMutation = useSubmitBookingRequest();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    location: '',
    preferredDate: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const serviceOptions = services && services.length > 0
    ? services.map((s) => s.title)
    : DEFAULT_SERVICE_OPTIONS;

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.serviceType || !form.location) return;

    try {
      await submitMutation.mutateAsync({
        id: BigInt(0),
        name: form.name,
        email: form.email,
        phone: form.phone,
        serviceType: form.serviceType,
        location: form.location,
        preferredDate: form.preferredDate,
        message: form.message,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Booking submission failed:', err);
    }
  };

  if (submitted) {
    return (
      <section id="booking" className="py-24 bg-secondary">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="w-20 h-20 rounded-full bg-accent-yellow/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-accent-yellow" />
          </div>
          <h2 className="font-display font-black text-3xl text-foreground mb-4">Request Received!</h2>
          <p className="text-muted-foreground text-lg mb-6">
            Thank you for contacting Drone X Solutions. Our team will get back to you within 24 hours to discuss your cleaning needs.
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            className="border-accent-yellow text-accent-yellow hover:bg-accent-yellow/10"
          >
            Submit Another Request
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Left: Info */}
          <div>
            <div className="inline-flex items-center gap-2 bg-accent-yellow/10 border border-accent-yellow/30 rounded-full px-4 py-1.5 mb-4">
              <span className="text-accent-yellow text-xs font-semibold uppercase tracking-widest">Get Started</span>
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-4">
              Request a <span className="text-gradient-yellow">Free Quote</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Tell us about your project and we'll provide a tailored quote for your drone cleaning needs anywhere in Cyprus.
            </p>
            <div className="accent-line mb-8" />
            <div className="space-y-4">
              {[
                { icon: '🚁', title: 'Fast Response', desc: 'We reply within 24 hours' },
                { icon: '📍', title: 'All Cyprus Coverage', desc: 'We operate island-wide' },
                { icon: '✅', title: 'Free Assessment', desc: 'No obligation quotes' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-display font-bold text-foreground text-sm">{item.title}</div>
                    <div className="text-muted-foreground text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-card border border-border rounded-sm p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-semibold text-foreground">Full Name *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="John Smith"
                    required
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-sm font-semibold text-foreground">Phone Number</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+357 99 000 000"
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-semibold text-foreground">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="bg-secondary border-border"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-foreground">Service Type *</Label>
                <Select onValueChange={(val) => handleChange('serviceType', val)} required>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select a service..." />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {serviceOptions.map((opt) => (
                      <SelectItem key={opt} value={opt} className="text-foreground hover:bg-secondary">
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="location" className="text-sm font-semibold text-foreground">Location in Cyprus *</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g. Limassol, Nicosia, Paphos..."
                  required
                  className="bg-secondary border-border"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="date" className="text-sm font-semibold text-foreground">
                  <CalendarDays className="w-4 h-4 inline mr-1" />
                  Preferred Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={form.preferredDate}
                  onChange={(e) => handleChange('preferredDate', e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-sm font-semibold text-foreground">Additional Details</Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Describe your property, surface area, specific requirements..."
                  rows={4}
                  className="bg-secondary border-border resize-none"
                />
              </div>

              {submitMutation.isError && (
                <p className="text-destructive text-sm">
                  Failed to submit request. Please try again.
                </p>
              )}

              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full bg-accent-yellow text-navy-dark hover:bg-accent-yellow/90 font-display font-bold text-base py-6 rounded-sm"
              >
                {submitMutation.isPending ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</>
                ) : (
                  <><Send className="w-5 h-5 mr-2" /> Submit Request</>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
