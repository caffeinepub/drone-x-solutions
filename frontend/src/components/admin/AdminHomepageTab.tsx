import React, { useState, useEffect } from 'react';
import { Loader2, Save, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useGetHomepageContent, useUpdateHomepageContent } from '../../hooks/useQueries';
import { ExternalBlob } from '../../backend';

export default function AdminHomepageTab() {
  const { data: content, isLoading } = useGetHomepageContent();
  const updateMutation = useUpdateHomepageContent();

  const [form, setForm] = useState({
    heroTitle: '',
    heroSubtitle: '',
    ctaText: '',
    aboutText: '',
  });
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (content) {
      setForm({
        heroTitle: content.heroTitle || '',
        heroSubtitle: content.heroSubtitle || '',
        ctaText: content.ctaText || '',
        aboutText: content.aboutText || '',
      });
    }
  }, [content]);

  const handleSave = async () => {
    setSaved(false);
    let heroImage = content?.heroImage;

    if (heroImageFile) {
      const bytes = new Uint8Array(await heroImageFile.arrayBuffer());
      heroImage = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => setUploadProgress(pct));
    }

    await updateMutation.mutateAsync({
      heroTitle: form.heroTitle,
      heroSubtitle: form.heroSubtitle,
      ctaText: form.ctaText,
      aboutText: form.aboutText,
      heroImage,
    });
    setSaved(true);
    setHeroImageFile(null);
    setUploadProgress(0);
    setTimeout(() => setSaved(false), 3000);
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-accent-yellow" /></div>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-card border border-border rounded-sm p-6">
        <h3 className="font-display font-bold text-lg text-foreground mb-5">Hero Section</h3>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Hero Title</Label>
            <Input
              value={form.heroTitle}
              onChange={(e) => setForm((p) => ({ ...p, heroTitle: e.target.value }))}
              placeholder="Professional Drone Cleaning Services"
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Hero Subtitle</Label>
            <Textarea
              value={form.heroSubtitle}
              onChange={(e) => setForm((p) => ({ ...p, heroSubtitle: e.target.value }))}
              rows={3}
              className="bg-secondary border-border resize-none"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">CTA Button Text</Label>
            <Input
              value={form.ctaText}
              onChange={(e) => setForm((p) => ({ ...p, ctaText: e.target.value }))}
              placeholder="Get a Free Quote"
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Hero Background Image</Label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer bg-secondary border border-border rounded-sm px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Upload className="w-4 h-4" />
                {heroImageFile ? heroImageFile.name : 'Choose image...'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setHeroImageFile(e.target.files?.[0] || null)}
                />
              </label>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <span className="text-xs text-accent-yellow">{uploadProgress}%</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-sm p-6">
        <h3 className="font-display font-bold text-lg text-foreground mb-5">About Section</h3>
        <div className="space-y-1.5">
          <Label className="text-sm font-semibold">About Text</Label>
          <Textarea
            value={form.aboutText}
            onChange={(e) => setForm((p) => ({ ...p, aboutText: e.target.value }))}
            rows={6}
            className="bg-secondary border-border resize-none"
          />
        </div>
      </div>

      {updateMutation.isError && (
        <p className="text-destructive text-sm">Failed to save. Please try again.</p>
      )}
      {saved && (
        <p className="text-accent-yellow text-sm font-semibold">✓ Changes saved successfully!</p>
      )}

      <Button
        onClick={handleSave}
        disabled={updateMutation.isPending}
        className="bg-accent-yellow text-navy-dark hover:bg-accent-yellow/90 font-bold"
      >
        {updateMutation.isPending ? (
          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
        ) : (
          <><Save className="w-4 h-4 mr-2" /> Save Changes</>
        )}
      </Button>
    </div>
  );
}
