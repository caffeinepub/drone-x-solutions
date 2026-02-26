import React, { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useSubmitBookingRequest } from '../hooks/useQueries';

const SERVICE_OPTIONS = [
  'Solar Panel Cleaning',
  'Window & Facade Cleaning',
  'Roof & Gutter Cleaning',
  'Industrial Surface Cleaning',
  'Wind Turbine Cleaning',
  'Water Tank Inspection & Clean',
  'Other',
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  serviceType: string;
  preferredDate: string;
  message: string;
}

const EMPTY_FORM: FormData = {
  name: '',
  email: '',
  phone: '',
  location: '',
  serviceType: '',
  preferredDate: '',
  message: '',
};

export default function BookingForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const submitMutation = useSubmitBookingRequest();

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = t('booking.required');
    if (!form.email.trim()) newErrors.email = t('booking.required');
    if (!form.phone.trim()) newErrors.phone = t('booking.required');
    if (!form.location.trim()) newErrors.location = t('booking.required');
    if (!form.serviceType) newErrors.serviceType = t('booking.required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await submitMutation.mutateAsync({
        id: 0n,
        name: form.name,
        email: form.email,
        phone: form.phone,
        location: form.location,
        serviceType: form.serviceType,
        preferredDate: form.preferredDate,
        message: form.message,
      });
      setSubmitted(true);
      setForm(EMPTY_FORM);
    } catch (err) {
      // Error handled by mutation state
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full bg-steel-800 border ${errors[field] ? 'border-destructive' : 'border-border'} rounded px-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-amber-500 transition-colors text-sm`;

  const labelClass = 'block text-sm font-medium text-white mb-1.5';

  if (submitted) {
    return (
      <section id="booking" className="py-20 bg-steel-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card border border-success/30 rounded-lg p-12">
            <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
            <h3 className="font-display text-2xl font-800 text-white mb-3">
              {t('booking.success')}
            </h3>
            <p className="text-white/75 mb-6">{t('booking.successMsg')}</p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-amber-500 hover:bg-amber-400 text-steel-900 font-display font-700 px-6 py-2.5 rounded transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 bg-steel-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-amber-500/10 border border-amber-500/30 rounded px-3 py-1 mb-4">
            <span className="text-amber-500 text-xs font-display font-700 uppercase tracking-widest">
              Free Quote
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-800 text-white mb-3">
            {t('booking.title')}
          </h2>
          <p className="text-white/75">{t('booking.subtitle')}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-5">
          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>{t('booking.name')} *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder={t('booking.namePlaceholder')}
                className={inputClass('name')}
              />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className={labelClass}>{t('booking.email')} *</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder={t('booking.emailPlaceholder')}
                className={inputClass('email')}
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Phone + Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>{t('booking.phone')} *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder={t('booking.phonePlaceholder')}
                className={inputClass('phone')}
              />
              {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className={labelClass}>{t('booking.location')} *</label>
              <input
                type="text"
                value={form.location}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                placeholder={t('booking.locationPlaceholder')}
                className={inputClass('location')}
              />
              {errors.location && <p className="text-destructive text-xs mt-1">{errors.location}</p>}
            </div>
          </div>

          {/* Service Type */}
          <div>
            <label className={labelClass}>{t('booking.service')} *</label>
            <select
              value={form.serviceType}
              onChange={e => setForm(f => ({ ...f, serviceType: e.target.value }))}
              className={`${inputClass('serviceType')} cursor-pointer`}
            >
              <option value="" className="bg-steel-800 text-white/50">{t('booking.selectService')}</option>
              {SERVICE_OPTIONS.map(opt => (
                <option key={opt} value={opt} className="bg-steel-800 text-white">{opt}</option>
              ))}
            </select>
            {errors.serviceType && <p className="text-destructive text-xs mt-1">{errors.serviceType}</p>}
          </div>

          {/* Preferred Date */}
          <div>
            <label className={labelClass}>{t('booking.date')}</label>
            <input
              type="date"
              value={form.preferredDate}
              onChange={e => setForm(f => ({ ...f, preferredDate: e.target.value }))}
              className={inputClass('preferredDate')}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Message */}
          <div>
            <label className={labelClass}>{t('booking.message')}</label>
            <textarea
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder={t('booking.messagePlaceholder')}
              rows={4}
              className={`${inputClass('message')} resize-none`}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitMutation.isPending}
            className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-steel-900 font-display font-700 text-base py-3.5 rounded transition-all flex items-center justify-center gap-2"
          >
            {submitMutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('booking.submitting')}
              </>
            ) : (
              t('booking.submit')
            )}
          </button>

          {submitMutation.isError && (
            <p className="text-destructive text-sm text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
