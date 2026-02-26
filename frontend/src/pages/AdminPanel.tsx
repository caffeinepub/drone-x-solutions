import React, { useState } from 'react';
import AdminGuard from '../components/AdminGuard';
import AdminHomepageTab from '../components/admin/AdminHomepageTab';
import AdminServicesTab from '../components/admin/AdminServicesTab';
import AdminTestimonialsTab from '../components/admin/AdminTestimonialsTab';
import AdminGalleryTab from '../components/admin/AdminGalleryTab';
import AdminBookingsTab from '../components/admin/AdminBookingsTab';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LayoutDashboard, Wrench, MessageSquare, Image, CalendarCheck } from 'lucide-react';

const tabs = [
  { id: 'homepage', label: 'Homepage', icon: LayoutDashboard },
  { id: 'services', label: 'Services', icon: Wrench },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
];

export default function AdminPanel() {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-accent-yellow/10 border border-accent-yellow/30 rounded-full px-4 py-1.5 mb-3">
              <span className="text-accent-yellow text-xs font-semibold uppercase tracking-widest">Admin Panel</span>
            </div>
            <h1 className="font-display font-black text-3xl md:text-4xl text-foreground">
              Content <span className="text-gradient-yellow">Management</span>
            </h1>
            <p className="text-muted-foreground mt-2">Manage your website content, services, testimonials, gallery, and booking requests.</p>
          </div>

          <Tabs defaultValue="homepage">
            <TabsList className="bg-secondary border border-border mb-8 flex-wrap h-auto gap-1 p-1">
              {tabs.map(({ id, label, icon: Icon }) => (
                <TabsTrigger
                  key={id}
                  value={id}
                  className="data-[state=active]:bg-accent-yellow data-[state=active]:text-navy-dark font-semibold flex items-center gap-1.5"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="homepage"><AdminHomepageTab /></TabsContent>
            <TabsContent value="services"><AdminServicesTab /></TabsContent>
            <TabsContent value="testimonials"><AdminTestimonialsTab /></TabsContent>
            <TabsContent value="gallery"><AdminGalleryTab /></TabsContent>
            <TabsContent value="bookings"><AdminBookingsTab /></TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminGuard>
  );
}
