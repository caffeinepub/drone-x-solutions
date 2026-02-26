import React, { useState, useEffect } from 'react';
import { Save, Loader2, RotateCcw } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { defaultTranslations, type Language, type TranslationKey, type Translations } from '../../utils/translations';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'gr', label: 'Greek (GR)' },
  { code: 'ru', label: 'Russian (RU)' },
];

const SECTION_GROUPS: { label: string; keys: TranslationKey[] }[] = [
  {
    label: 'Navigation',
    keys: [
      'nav.home', 'nav.services', 'nav.about', 'nav.testimonials',
      'nav.gallery', 'nav.booking', 'nav.contact', 'nav.adminLogin',
    ],
  },
  {
    label: 'Hero Section',
    keys: [
      'hero.badge', 'hero.cta', 'hero.ctaSecondary',
      'hero.stat1Label', 'hero.stat2Label', 'hero.stat3Label',
    ],
  },
  {
    label: 'Services Section',
    keys: ['services.title', 'services.subtitle', 'services.learnMore'],
  },
  {
    label: 'About Section',
    keys: [
      'about.title', 'about.subtitle',
      'about.highlight1', 'about.highlight2', 'about.highlight3', 'about.highlight4',
    ],
  },
  {
    label: 'Testimonials Section',
    keys: ['testimonials.title', 'testimonials.subtitle'],
  },
  {
    label: 'Gallery Section',
    keys: [
      'gallery.title', 'gallery.subtitle',
      'gallery.before', 'gallery.after',
      'gallery.toggleBefore', 'gallery.toggleAfter',
    ],
  },
  {
    label: 'Booking Form',
    keys: [
      'booking.title', 'booking.subtitle',
      'booking.name', 'booking.email', 'booking.phone',
      'booking.location', 'booking.service', 'booking.date', 'booking.message',
      'booking.submit', 'booking.submitting',
      'booking.success', 'booking.successMsg',
      'booking.namePlaceholder', 'booking.emailPlaceholder',
      'booking.phonePlaceholder', 'booking.locationPlaceholder',
      'booking.messagePlaceholder', 'booking.selectService', 'booking.required',
    ],
  },
  {
    label: 'Contact Section',
    keys: [
      'contact.title', 'contact.subtitle',
      'contact.phone', 'contact.email', 'contact.address',
      'contact.whatsapp', 'contact.followUs',
    ],
  },
  {
    label: 'Footer',
    keys: ['footer.rights', 'footer.builtWith'],
  },
];

export default function AdminTranslationsTab() {
  const { getAllTranslationsForLang, saveCustomTranslations } = useTranslation();
  const [activeLang, setActiveLang] = useState<Language>('gr');
  const [edits, setEdits] = useState<Partial<Translations>>({});
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load current translations for the active language
  useEffect(() => {
    const current = getAllTranslationsForLang(activeLang);
    setEdits(current);
    setSaved(false);
  }, [activeLang, getAllTranslationsForLang]);

  const handleChange = (key: TranslationKey, value: string) => {
    setEdits(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleReset = (key: TranslationKey) => {
    const defaultVal = defaultTranslations[activeLang][key];
    setEdits(prev => ({ ...prev, [key]: defaultVal }));
    setSaved(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 300));
    saveCustomTranslations(activeLang, edits);
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputClass =
    'w-full bg-input border border-border rounded px-3 py-2 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-700 text-foreground">Translations</h2>
          <p className="text-sm text-muted-foreground">
            Edit Greek and Russian translations. English values are shown as reference (read-only).
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-steel-900 font-display font-700 px-5 py-2.5 rounded transition-colors text-sm self-start sm:self-auto"
        >
          {isSaving ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
          ) : (
            <><Save className="w-4 h-4" /> Save Translations</>
          )}
        </button>
      </div>

      {saved && (
        <div className="bg-success/10 border border-success/30 rounded px-4 py-3 text-sm text-success">
          ✓ Translations saved successfully! Changes are live on the public site.
        </div>
      )}

      {/* Language Tabs */}
      <div className="flex gap-2">
        {LANGUAGES.map(lang => (
          <button
            key={lang.code}
            onClick={() => setActiveLang(lang.code)}
            className={`px-4 py-2 rounded font-display font-600 text-sm transition-all ${
              activeLang === lang.code
                ? 'bg-amber-500 text-steel-900'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* Translation Groups */}
      <div className="space-y-6">
        {SECTION_GROUPS.map(group => (
          <div key={group.label} className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="bg-steel-800 px-4 py-3 border-b border-border">
              <h3 className="font-display font-700 text-foreground text-sm">{group.label}</h3>
            </div>
            <div className="divide-y divide-border">
              {group.keys.map(key => {
                const englishValue = defaultTranslations['en'][key] || '';
                const currentValue = (edits[key] as string) ?? defaultTranslations[activeLang][key] ?? '';
                const defaultLangValue = defaultTranslations[activeLang][key] ?? '';
                const isModified = currentValue !== defaultLangValue;

                return (
                  <div key={key} className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* English (read-only) */}
                    <div className="px-4 py-3 border-b md:border-b-0 md:border-r border-border bg-steel-900/30">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 font-display font-600">
                        EN — {key}
                      </p>
                      <p className="text-sm text-muted-foreground italic">{englishValue}</p>
                    </div>

                    {/* Editable translation */}
                    <div className="px-4 py-3">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-amber-500 uppercase tracking-wide font-display font-600">
                          {activeLang.toUpperCase()}
                        </p>
                        {isModified && (
                          <button
                            onClick={() => handleReset(key)}
                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                            title="Reset to default"
                          >
                            <RotateCcw className="w-3 h-3" />
                            Reset
                          </button>
                        )}
                      </div>
                      {englishValue.length > 60 ? (
                        <textarea
                          value={currentValue}
                          onChange={e => handleChange(key, e.target.value)}
                          rows={2}
                          className={inputClass}
                        />
                      ) : (
                        <input
                          type="text"
                          value={currentValue}
                          onChange={e => handleChange(key, e.target.value)}
                          className={inputClass}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Save */}
      <div className="flex items-center gap-4 pt-2">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-steel-900 font-display font-700 px-6 py-2.5 rounded transition-colors"
        >
          {isSaving ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
          ) : (
            <><Save className="w-4 h-4" /> Save All Translations</>
          )}
        </button>
        {saved && <span className="text-sm text-success">✓ Saved!</span>}
      </div>
    </div>
  );
}
