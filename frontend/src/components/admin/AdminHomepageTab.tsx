import React, { useState, useEffect } from 'react';
import { Loader2, Upload, Save, Image as ImageIcon } from 'lucide-react';
import { useGetHomepageContent, useUpdateHomepageContent } from '../../hooks/useQueries';
import { ExternalBlob } from '../../backend';

export default function AdminHomepageTab() {
  const { data: content, isLoading } = useGetHomepageContent();
  const updateMutation = useUpdateHomepageContent();

  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [heroImageBlob, setHeroImageBlob] = useState<ExternalBlob | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (content) {
      setHeroTitle(content.heroTitle || '');
      setHeroSubtitle(content.heroSubtitle || '');
      setCtaText(content.ctaText || '');
      setAboutText(content.aboutText || '');
      if (content.heroImage) {
        setHeroImagePreview(content.heroImage.getDirectURL());
      }
    }
  }, [content]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const bytes = new Uint8Array(ev.target?.result as ArrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });
      setHeroImageBlob(blob);
      setHeroImagePreview(URL.createObjectURL(new Blob([bytes])));
      setIsUploading(false);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({
        heroTitle,
        heroSubtitle,
        ctaText,
        aboutText,
        heroImage: heroImageBlob || content?.heroImage,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      // handled by mutation state
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  const inputClass = "w-full bg-input border border-border rounded px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all";
  const labelClass = "block text-sm font-medium text-foreground mb-1.5";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-700 text-foreground mb-1">Homepage Content</h2>
        <p className="text-sm text-muted-foreground">Edit the hero section and about section content.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hero Section */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-5">
          <h3 className="font-display font-700 text-foreground border-b border-border pb-3">Hero Section</h3>

          <div>
            <label className={labelClass}>Hero Title</label>
            <input
              type="text"
              value={heroTitle}
              onChange={e => setHeroTitle(e.target.value)}
              placeholder="Advanced Drone Cleaning Solutions"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Hero Subtitle</label>
            <textarea
              value={heroSubtitle}
              onChange={e => setHeroSubtitle(e.target.value)}
              placeholder="Professional drone-powered cleaning..."
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label className={labelClass}>CTA Button Text</label>
            <input
              type="text"
              value={ctaText}
              onChange={e => setCtaText(e.target.value)}
              placeholder="Get a Free Quote"
              className={inputClass}
            />
          </div>

          {/* Hero Image Upload */}
          <div>
            <label className={labelClass}>Hero Background Image</label>
            {heroImagePreview && (
              <div className="mb-3 rounded overflow-hidden border border-border">
                <img src={heroImagePreview} alt="Hero preview" className="w-full h-32 object-cover" />
              </div>
            )}
            <label className="flex items-center gap-3 cursor-pointer bg-input border border-dashed border-border rounded px-4 py-3 hover:border-amber-500/50 transition-colors">
              <Upload className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {isUploading ? `Uploading... ${uploadProgress}%` : 'Click to upload image'}
              </span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {isUploading && (
              <div className="mt-2 h-1.5 bg-steel-700 rounded overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-5">
          <h3 className="font-display font-700 text-foreground border-b border-border pb-3">About Section</h3>

          <div>
            <label className={labelClass}>About Text</label>
            <textarea
              value={aboutText}
              onChange={e => setAboutText(e.target.value)}
              placeholder="Tell your company story..."
              rows={12}
              className={`${inputClass} resize-none`}
            />
            <p className="text-xs text-muted-foreground mt-1">Use double line breaks to separate paragraphs.</p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={updateMutation.isPending}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-steel-900 font-display font-700 px-6 py-2.5 rounded transition-colors"
        >
          {updateMutation.isPending ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
          ) : (
            <><Save className="w-4 h-4" /> Save Changes</>
          )}
        </button>
        {saved && <span className="text-sm text-success">✓ Changes saved successfully!</span>}
        {updateMutation.isError && <span className="text-sm text-destructive">Failed to save. Please try again.</span>}
      </div>
    </div>
  );
}
