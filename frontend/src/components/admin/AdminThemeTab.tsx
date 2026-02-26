import React, { useState, useEffect } from 'react';
import { Palette, Save, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';
import { useGetSiteTheme, useSetSiteTheme } from '../../hooks/useQueries';
import type { SiteTheme } from '../../backend';

const DEFAULT_THEME: SiteTheme = {
  primaryColor: '#F26522',
  accentColor: '#FFD700',
  backgroundColor: '#181818',
};

interface ColorFieldProps {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
}

function ColorField({ label, description, value, onChange }: ColorFieldProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-card border border-border rounded-lg">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Color swatch */}
        <div
          className="w-12 h-12 rounded-lg border-2 border-border flex-shrink-0 shadow-industrial"
          style={{ backgroundColor: value }}
        />
        <div className="min-w-0">
          <p className="font-display font-700 text-foreground text-sm">{label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          <p className="text-xs font-mono text-amber-500 mt-1">{value}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Native color picker */}
        <label className="relative cursor-pointer">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
          />
          <div className="flex items-center gap-2 bg-secondary border border-border hover:border-amber-500 text-foreground text-sm font-medium px-3 py-2 rounded transition-colors cursor-pointer">
            <Palette className="w-4 h-4 text-amber-500" />
            <span>Pick</span>
          </div>
        </label>
        {/* Hex input */}
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange(v);
          }}
          maxLength={7}
          className="w-24 bg-input border border-border rounded px-2 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-amber-500 transition-colors"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}

export default function AdminThemeTab() {
  const { data: savedTheme, isLoading } = useGetSiteTheme();
  const { mutate: setSiteTheme, isPending } = useSetSiteTheme();

  const [colors, setColors] = useState<SiteTheme>(DEFAULT_THEME);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Pre-fill with saved theme when loaded
  useEffect(() => {
    if (savedTheme) {
      setColors(savedTheme);
    }
  }, [savedTheme]);

  const handleSave = () => {
    setStatus('idle');
    setSiteTheme(colors, {
      onSuccess: () => {
        setStatus('success');
        // Apply immediately to the page
        document.documentElement.style.setProperty('--theme-primary', colors.primaryColor);
        document.documentElement.style.setProperty('--theme-accent', colors.accentColor);
        document.documentElement.style.setProperty('--theme-bg', colors.backgroundColor);
        setTimeout(() => setStatus('idle'), 3000);
      },
      onError: () => {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      },
    });
  };

  const handleReset = () => {
    setColors(DEFAULT_THEME);
    setStatus('idle');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span className="ml-3 text-muted-foreground">Loading theme...</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/30 rounded flex items-center justify-center">
            <Palette className="w-4 h-4 text-amber-500" />
          </div>
          <h2 className="font-display font-800 text-xl text-foreground">Site Theme</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Customize the site's color palette. Changes apply site-wide immediately after saving.
        </p>
      </div>

      {/* Color Fields */}
      <div className="space-y-3 mb-6">
        <ColorField
          label="Primary Color"
          description="Main brand color — buttons, highlights, accents"
          value={colors.primaryColor}
          onChange={(v) => setColors(prev => ({ ...prev, primaryColor: v }))}
        />
        <ColorField
          label="Accent Color"
          description="Secondary accent — badges, hover states, decorative elements"
          value={colors.accentColor}
          onChange={(v) => setColors(prev => ({ ...prev, accentColor: v }))}
        />
        <ColorField
          label="Background Color"
          description="Site background — dark base color for the overall theme"
          value={colors.backgroundColor}
          onChange={(v) => setColors(prev => ({ ...prev, backgroundColor: v }))}
        />
      </div>

      {/* Preview strip */}
      <div className="mb-6 rounded-lg overflow-hidden border border-border">
        <div className="px-4 py-2 bg-card border-b border-border">
          <p className="text-xs font-display font-700 text-muted-foreground uppercase tracking-widest">Preview</p>
        </div>
        <div
          className="p-6 flex items-center gap-4"
          style={{ backgroundColor: colors.backgroundColor }}
        >
          <button
            className="px-4 py-2 rounded font-display font-700 text-sm"
            style={{ backgroundColor: colors.primaryColor, color: '#181818' }}
          >
            Primary Button
          </button>
          <button
            className="px-4 py-2 rounded font-display font-700 text-sm border-2"
            style={{ borderColor: colors.accentColor, color: colors.accentColor, backgroundColor: 'transparent' }}
          >
            Accent Button
          </button>
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: colors.primaryColor }}
          />
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: colors.accentColor }}
          />
        </div>
      </div>

      {/* Status messages */}
      {status === 'success' && (
        <div className="flex items-center gap-2 text-success bg-success/10 border border-success/30 rounded px-4 py-3 mb-4">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-medium">Theme saved successfully! Changes are now live.</span>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-2 text-destructive bg-destructive/10 border border-destructive/30 rounded px-4 py-3 mb-4">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-medium">Failed to save theme. Please try again.</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-steel-900 font-display font-700 text-sm px-5 py-2.5 rounded transition-colors"
        >
          {isPending ? (
            <>
              <div className="w-4 h-4 border-2 border-steel-900 border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Theme
            </>
          )}
        </button>
        <button
          onClick={handleReset}
          disabled={isPending}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground disabled:opacity-50 border border-border hover:border-foreground/30 font-display font-600 text-sm px-5 py-2.5 rounded transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Default
        </button>
      </div>
    </div>
  );
}
