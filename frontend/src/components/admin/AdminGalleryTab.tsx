import React, { useState } from 'react';
import { Plus, Trash2, Loader2, Save, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useGetAllGalleryImages, useAddGalleryImage, useRemoveGalleryImage } from '../../hooks/useQueries';
import { ExternalBlob, type GalleryImage } from '../../backend';

interface GalleryFormState {
  description: string;
  service: string;
  location: string;
  beforeFile: File | null;
  afterFile: File | null;
}

const emptyForm: GalleryFormState = {
  description: '',
  service: '',
  location: '',
  beforeFile: null,
  afterFile: null,
};

export default function AdminGalleryTab() {
  const { data: images, isLoading } = useGetAllGalleryImages();
  const addMutation = useAddGalleryImage();
  const removeMutation = useRemoveGalleryImage();

  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState<GalleryFormState>(emptyForm);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewBefore, setPreviewBefore] = useState<string | null>(null);
  const [previewAfter, setPreviewAfter] = useState<string | null>(null);

  const handleFileChange = (field: 'beforeFile' | 'afterFile', file: File | null) => {
    setForm((p) => ({ ...p, [field]: file }));
    if (file) {
      const url = URL.createObjectURL(file);
      if (field === 'beforeFile') setPreviewBefore(url);
      else setPreviewAfter(url);
    }
  };

  const handleAdd = async () => {
    if (!form.beforeFile || !form.afterFile) {
      alert('Please select both before and after images.');
      return;
    }

    const beforeBytes = new Uint8Array(await form.beforeFile.arrayBuffer());
    const afterBytes = new Uint8Array(await form.afterFile.arrayBuffer());

    const beforeBlob = ExternalBlob.fromBytes(beforeBytes).withUploadProgress((pct) =>
      setUploadProgress(pct)
    );
    const afterBlob = ExternalBlob.fromBytes(afterBytes);

    const galleryImage: GalleryImage = {
      id: BigInt(Date.now()),
      description: form.description,
      service: form.service,
      location: form.location,
      beforeImage: beforeBlob,
      afterImage: afterBlob,
    };

    await addMutation.mutateAsync(galleryImage);
    setShowAddForm(false);
    setForm(emptyForm);
    setPreviewBefore(null);
    setPreviewAfter(null);
    setUploadProgress(0);
  };

  const handleRemove = async (id: bigint) => {
    if (confirm('Remove this gallery image pair?')) {
      await removeMutation.mutateAsync(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg text-foreground">
          Gallery ({images?.length ?? 0})
        </h3>
        <Button
          onClick={() => {
            setShowAddForm(true);
            setForm(emptyForm);
            setPreviewBefore(null);
            setPreviewAfter(null);
          }}
          size="sm"
          className="bg-accent-yellow text-navy-dark hover:bg-accent-yellow/90 font-bold"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Image Pair
        </Button>
      </div>

      {showAddForm && (
        <div className="bg-secondary border border-accent-yellow/30 rounded-sm p-4 space-y-4">
          <h4 className="font-display font-bold text-sm text-foreground">New Before/After Pair</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Before Image *</Label>
              <label className="flex items-center gap-2 cursor-pointer bg-card border border-border rounded-sm px-3 py-2 text-xs text-muted-foreground hover:text-foreground w-full">
                <Upload className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">
                  {form.beforeFile ? form.beforeFile.name : 'Choose before image...'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange('beforeFile', e.target.files?.[0] || null)}
                />
              </label>
              {previewBefore && (
                <img
                  src={previewBefore}
                  alt="Before preview"
                  className="w-full h-28 object-cover rounded-sm border border-border"
                />
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold">After Image *</Label>
              <label className="flex items-center gap-2 cursor-pointer bg-card border border-border rounded-sm px-3 py-2 text-xs text-muted-foreground hover:text-foreground w-full">
                <Upload className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">
                  {form.afterFile ? form.afterFile.name : 'Choose after image...'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange('afterFile', e.target.files?.[0] || null)}
                />
              </label>
              {previewAfter && (
                <img
                  src={previewAfter}
                  alt="After preview"
                  className="w-full h-28 object-cover rounded-sm border border-border"
                />
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-semibold">Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={2}
              placeholder="e.g. Solar panel array — before and after professional drone cleaning"
              className="bg-card border-border text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Service</Label>
              <Input
                value={form.service}
                onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                placeholder="Solar Panel Cleaning"
                className="bg-card border-border text-sm h-8"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Location</Label>
              <Input
                value={form.location}
                onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                placeholder="Limassol"
                className="bg-card border-border text-sm h-8"
              />
            </div>
          </div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-card rounded-full h-1.5">
                <div
                  className="bg-accent-yellow h-1.5 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <span className="text-xs text-accent-yellow">{uploadProgress}%</span>
            </div>
          )}

          {addMutation.isError && (
            <p className="text-destructive text-xs">Failed to upload. Please try again.</p>
          )}

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleAdd}
              disabled={addMutation.isPending}
              className="bg-accent-yellow text-navy-dark hover:bg-accent-yellow/90 font-bold h-8"
            >
              {addMutation.isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 mr-1" /> Upload Pair
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setShowAddForm(false);
                setPreviewBefore(null);
                setPreviewAfter(null);
              }}
              className="border-border h-8"
            >
              <X className="w-3.5 h-3.5 mr-1" /> Cancel
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-accent-yellow" />
        </div>
      ) : images && images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((img) => (
            <div key={img.id.toString()} className="bg-card border border-border rounded-sm overflow-hidden">
              <div className="grid grid-cols-2 gap-0">
                <div className="relative">
                  <img
                    src={img.beforeImage.getDirectURL()}
                    alt="Before"
                    className="w-full h-32 object-cover"
                  />
                  <span className="absolute top-2 left-2 text-xs font-bold bg-secondary/80 text-foreground px-1.5 py-0.5 rounded-sm">
                    BEFORE
                  </span>
                </div>
                <div className="relative">
                  <img
                    src={img.afterImage.getDirectURL()}
                    alt="After"
                    className="w-full h-32 object-cover"
                  />
                  <span className="absolute top-2 left-2 text-xs font-bold bg-accent-yellow/90 text-navy-dark px-1.5 py-0.5 rounded-sm">
                    AFTER
                  </span>
                </div>
              </div>
              <div className="p-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-foreground font-medium truncate">{img.description || 'No description'}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {img.service} · {img.location}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRemove(img.id)}
                  disabled={removeMutation.isPending}
                  className="border-destructive/50 text-destructive hover:bg-destructive/10 h-8 w-8 p-0 flex-shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">No gallery images yet. Add your first before/after pair!</p>
        </div>
      )}
    </div>
  );
}
