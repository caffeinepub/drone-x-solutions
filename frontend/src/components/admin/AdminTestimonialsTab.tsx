import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, Save, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetAllTestimonials, useAddTestimonial, useUpdateTestimonial, useRemoveTestimonial } from '../../hooks/useQueries';
import type { Testimonial } from '../../backend';

interface TestimonialFormState {
  customerName: string;
  rating: string;
  text: string;
  service: string;
  location: string;
}

const emptyForm: TestimonialFormState = {
  customerName: '',
  rating: '5',
  text: '',
  service: '',
  location: '',
};

export default function AdminTestimonialsTab() {
  const { data: testimonials, isLoading } = useGetAllTestimonials();
  const addMutation = useAddTestimonial();
  const updateMutation = useUpdateTestimonial();
  const removeMutation = useRemoveTestimonial();

  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState<TestimonialFormState>(emptyForm);

  const handleEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setForm({
      customerName: t.customerName,
      rating: t.rating.toString(),
      text: t.text,
      service: t.service,
      location: t.location,
    });
    setShowAddForm(false);
  };

  const handleSave = async () => {
    const testimonial: Testimonial = {
      id: editingId ?? BigInt(Date.now()),
      customerName: form.customerName,
      rating: BigInt(parseInt(form.rating)),
      text: form.text,
      service: form.service,
      location: form.location,
      image: undefined,
    };

    if (editingId !== null) {
      await updateMutation.mutateAsync(testimonial);
      setEditingId(null);
    } else {
      await addMutation.mutateAsync(testimonial);
      setShowAddForm(false);
    }
    setForm(emptyForm);
  };

  const handleRemove = async (id: bigint) => {
    if (confirm('Remove this testimonial?')) {
      await removeMutation.mutateAsync(id);
    }
  };

  const isSaving = addMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg text-foreground">Testimonials ({testimonials?.length ?? 0})</h3>
        <Button
          onClick={() => { setShowAddForm(true); setEditingId(null); setForm(emptyForm); }}
          size="sm"
          className="bg-accent-yellow text-navy-dark hover:bg-accent-yellow/90 font-bold"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Testimonial
        </Button>
      </div>

      {showAddForm && (
        <TestimonialForm form={form} setForm={setForm} onSave={handleSave} onCancel={() => setShowAddForm(false)} isSaving={isSaving} />
      )}

      {isLoading ? (
        <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-accent-yellow" /></div>
      ) : testimonials && testimonials.length > 0 ? (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div key={t.id.toString()}>
              {editingId === t.id ? (
                <TestimonialForm form={form} setForm={setForm} onSave={handleSave} onCancel={() => setEditingId(null)} isSaving={isSaving} />
              ) : (
                <div className="bg-card border border-border rounded-sm p-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-display font-bold text-sm text-foreground">{t.customerName}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: Number(t.rating) }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-accent-yellow fill-accent-yellow" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">"{t.text}"</p>
                    <p className="text-xs text-muted-foreground mt-1">{t.service} · {t.location}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(t)} className="border-border h-8 w-8 p-0">
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRemove(t.id)}
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
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">No testimonials yet. Add your first one!</p>
        </div>
      )}
    </div>
  );
}

interface TestimonialFormProps {
  form: TestimonialFormState;
  setForm: React.Dispatch<React.SetStateAction<TestimonialFormState>>;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
}

function TestimonialForm({ form, setForm, onSave, onCancel, isSaving }: TestimonialFormProps) {
  return (
    <div className="bg-secondary border border-accent-yellow/30 rounded-sm p-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs font-semibold">Customer Name</Label>
          <Input value={form.customerName} onChange={(e) => setForm((p) => ({ ...p, customerName: e.target.value }))} className="bg-card border-border text-sm h-8" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-semibold">Rating</Label>
          <Select value={form.rating} onValueChange={(v) => setForm((p) => ({ ...p, rating: v }))}>
            <SelectTrigger className="bg-card border-border h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {['1', '2', '3', '4', '5'].map((r) => (
                <SelectItem key={r} value={r}>{r} Star{r !== '1' ? 's' : ''}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs font-semibold">Review Text</Label>
        <Textarea value={form.text} onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))} rows={3} className="bg-card border-border text-sm resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs font-semibold">Service</Label>
          <Input value={form.service} onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))} placeholder="Window Cleaning" className="bg-card border-border text-sm h-8" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-semibold">Location</Label>
          <Input value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} placeholder="Limassol" className="bg-card border-border text-sm h-8" />
        </div>
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
