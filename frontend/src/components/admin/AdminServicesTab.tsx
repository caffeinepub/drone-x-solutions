import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, Save, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useGetAllServices, useAddService, useUpdateService, useRemoveService } from '../../hooks/useQueries';
import { ExternalBlob, type Service } from '../../backend';

const DEFAULT_SERVICE_IDS = [
  'window-cleaning', 'solar-panel-cleaning', 'roof-cleaning',
  'hot-pressure-wash', 'cold-pressure-wash', 'soft-wash',
  'foam-application', 'pesticides', 'paint-application', 'pressured-air',
];

const DEFAULT_SERVICES: Service[] = [
  { id: 'window-cleaning', title: 'Window Cleaning', description: 'Crystal-clear windows on high-rise buildings and hard-to-reach facades using precision drone technology.' },
  { id: 'solar-panel-cleaning', title: 'Solar Panel Cleaning', description: 'Restore up to 30% lost efficiency by removing dust, bird droppings, and grime from solar installations.' },
  { id: 'roof-cleaning', title: 'Roof Cleaning', description: 'Safe, thorough roof cleaning without scaffolding or risk to workers. Ideal for all roof types.' },
  { id: 'hot-pressure-wash', title: 'Hot Pressure Wash', description: 'High-temperature pressure washing for stubborn stains, grease, and industrial contamination.' },
  { id: 'cold-pressure-wash', title: 'Cold Pressure Wash', description: 'Effective cold-water pressure washing for delicate surfaces and general exterior cleaning.' },
  { id: 'soft-wash', title: 'Soft Wash', description: 'Low-pressure soft washing with biodegradable solutions for sensitive surfaces and painted areas.' },
  { id: 'foam-application', title: 'Foam Application', description: 'Specialized foam treatments for deep cleaning and sanitization of large surface areas.' },
  { id: 'pesticides', title: 'Pesticide Application', description: 'Precise aerial pesticide and herbicide application for agricultural and commercial properties.' },
  { id: 'paint-application', title: 'Paint Application', description: 'Drone-assisted paint and coating application for hard-to-reach structures and large surfaces.' },
  { id: 'pressured-air', title: 'Pressured Air', description: 'High-velocity air cleaning for dust removal, ventilation systems, and dry surface cleaning.' },
];

interface ServiceFormState {
  id: string;
  title: string;
  description: string;
  imageFile: File | null;
}

export default function AdminServicesTab() {
  const { data: services, isLoading } = useGetAllServices();
  const addMutation = useAddService();
  const updateMutation = useUpdateService();
  const removeMutation = useRemoveService();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState<ServiceFormState>({ id: '', title: '', description: '', imageFile: null });
  const [uploadProgress, setUploadProgress] = useState(0);

  const displayServices = services && services.length > 0 ? services : DEFAULT_SERVICES;

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setForm({ id: service.id, title: service.title, description: service.description, imageFile: null });
    setShowAddForm(false);
  };

  const handleSave = async () => {
    let image: ExternalBlob | undefined;
    if (form.imageFile) {
      const bytes = new Uint8Array(await form.imageFile.arrayBuffer());
      image = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => setUploadProgress(pct));
    }

    const service: Service = { id: form.id, title: form.title, description: form.description, image };

    if (editingId) {
      await updateMutation.mutateAsync({ id: editingId, service });
      setEditingId(null);
    } else {
      await addMutation.mutateAsync({ id: form.id, service });
      setShowAddForm(false);
    }
    setForm({ id: '', title: '', description: '', imageFile: null });
    setUploadProgress(0);
  };

  const handleRemove = async (id: string) => {
    if (confirm('Remove this service?')) {
      await removeMutation.mutateAsync(id);
    }
  };

  const isSaving = addMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg text-foreground">Services ({displayServices.length})</h3>
        <Button
          onClick={() => { setShowAddForm(true); setEditingId(null); setForm({ id: '', title: '', description: '', imageFile: null }); }}
          size="sm"
          className="bg-accent-yellow text-navy-dark hover:bg-accent-yellow/90 font-bold"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Service
        </Button>
      </div>

      {showAddForm && (
        <ServiceForm
          form={form}
          setForm={setForm}
          onSave={handleSave}
          onCancel={() => setShowAddForm(false)}
          isSaving={isSaving}
          uploadProgress={uploadProgress}
          isNew
        />
      )}

      {isLoading ? (
        <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-accent-yellow" /></div>
      ) : (
        <div className="space-y-3">
          {displayServices.map((service) => (
            <div key={service.id}>
              {editingId === service.id ? (
                <ServiceForm
                  form={form}
                  setForm={setForm}
                  onSave={handleSave}
                  onCancel={() => setEditingId(null)}
                  isSaving={isSaving}
                  uploadProgress={uploadProgress}
                />
              ) : (
                <div className="bg-card border border-border rounded-sm p-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-sm text-foreground">{service.title}</div>
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{service.description}</div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(service)} className="border-border h-8 w-8 p-0">
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRemove(service.id)}
                      disabled={removeMutation.isPending}
                      className="border-destructive/50 text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface ServiceFormProps {
  form: ServiceFormState;
  setForm: React.Dispatch<React.SetStateAction<ServiceFormState>>;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
  uploadProgress: number;
  isNew?: boolean;
}

function ServiceForm({ form, setForm, onSave, onCancel, isSaving, uploadProgress, isNew }: ServiceFormProps) {
  return (
    <div className="bg-secondary border border-accent-yellow/30 rounded-sm p-4 space-y-3">
      {isNew && (
        <div className="space-y-1">
          <Label className="text-xs font-semibold">Service ID (slug)</Label>
          <Input
            value={form.id}
            onChange={(e) => setForm((p) => ({ ...p, id: e.target.value }))}
            placeholder="e.g. window-cleaning"
            className="bg-card border-border text-sm h-8"
          />
        </div>
      )}
      <div className="space-y-1">
        <Label className="text-xs font-semibold">Title</Label>
        <Input
          value={form.title}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          className="bg-card border-border text-sm h-8"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs font-semibold">Description</Label>
        <Textarea
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          rows={2}
          className="bg-card border-border text-sm resize-none"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs font-semibold">Image (optional)</Label>
        <label className="flex items-center gap-2 cursor-pointer bg-card border border-border rounded-sm px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground w-fit">
          <Upload className="w-3.5 h-3.5" />
          {form.imageFile ? form.imageFile.name : 'Choose image...'}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => setForm((p) => ({ ...p, imageFile: e.target.files?.[0] || null }))} />
        </label>
        {uploadProgress > 0 && uploadProgress < 100 && <span className="text-xs text-accent-yellow">{uploadProgress}%</span>}
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={onSave} disabled={isSaving} className="bg-accent-yellow text-navy-dark hover:bg-accent-yellow/90 font-bold h-8">
          {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><Save className="w-3.5 h-3.5 mr-1" /> Save</>}
        </Button>
        <Button size="sm" variant="outline" onClick={onCancel} className="border-border h-8">
          <X className="w-3.5 h-3.5 mr-1" /> Cancel
        </Button>
      </div>
    </div>
  );
}
