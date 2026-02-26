import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAdminSession } from '../hooks/useAdminSession';
import AdminHomepageTab from '../components/admin/AdminHomepageTab';
import AdminServicesTab from '../components/admin/AdminServicesTab';
import AdminTestimonialsTab from '../components/admin/AdminTestimonialsTab';
import AdminGalleryTab from '../components/admin/AdminGalleryTab';
import AdminBookingsTab from '../components/admin/AdminBookingsTab';
import AdminTranslationsTab from '../components/admin/AdminTranslationsTab';
import AdminThemeTab from '../components/admin/AdminThemeTab';
import { Zap, LogOut } from 'lucide-react';

export default function AdminPanel() {
  const { isAdminAuthenticated, adminLogout } = useAdminSession();
  const navigate = useNavigate();

  if (!isAdminAuthenticated) {
    navigate({ to: '/admin/login' });
    return null;
  }

  const handleLogout = () => {
    adminLogout();
    navigate({ to: '/' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="bg-card border-b border-border px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center">
              <Zap className="w-5 h-5 text-steel-900" />
            </div>
            <div>
              <h1 className="font-display font-800 text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Drone X Solutions CMS</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate({ to: '/' })}
              className="text-sm text-muted-foreground hover:text-amber-500 transition-colors"
            >
              View Site
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors border border-border rounded px-3 py-1.5"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="homepage">
          <TabsList className="bg-card border border-border mb-8 flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="homepage" className="font-display font-600 data-[state=active]:bg-amber-500 data-[state=active]:text-steel-900">
              Homepage
            </TabsTrigger>
            <TabsTrigger value="services" className="font-display font-600 data-[state=active]:bg-amber-500 data-[state=active]:text-steel-900">
              Services
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="font-display font-600 data-[state=active]:bg-amber-500 data-[state=active]:text-steel-900">
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="gallery" className="font-display font-600 data-[state=active]:bg-amber-500 data-[state=active]:text-steel-900">
              Gallery
            </TabsTrigger>
            <TabsTrigger value="bookings" className="font-display font-600 data-[state=active]:bg-amber-500 data-[state=active]:text-steel-900">
              Bookings
            </TabsTrigger>
            <TabsTrigger value="translations" className="font-display font-600 data-[state=active]:bg-amber-500 data-[state=active]:text-steel-900">
              Translations
            </TabsTrigger>
            <TabsTrigger value="theme" className="font-display font-600 data-[state=active]:bg-amber-500 data-[state=active]:text-steel-900">
              Theme
            </TabsTrigger>
          </TabsList>

          <TabsContent value="homepage">
            <AdminHomepageTab />
          </TabsContent>
          <TabsContent value="services">
            <AdminServicesTab />
          </TabsContent>
          <TabsContent value="testimonials">
            <AdminTestimonialsTab />
          </TabsContent>
          <TabsContent value="gallery">
            <AdminGalleryTab />
          </TabsContent>
          <TabsContent value="bookings">
            <AdminBookingsTab />
          </TabsContent>
          <TabsContent value="translations">
            <AdminTranslationsTab />
          </TabsContent>
          <TabsContent value="theme">
            <AdminThemeTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
