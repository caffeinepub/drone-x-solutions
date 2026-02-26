import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { HomepageContent, Service, Testimonial, GalleryImage, BookingRequest, SiteTheme } from '../backend';

export function useGetHomepageContent() {
  const { actor, isFetching } = useActor();
  return useQuery<HomepageContent | null>({
    queryKey: ['homepageContent'],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getHomepageContent();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateHomepageContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (content: HomepageContent) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateHomepageContent(content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homepageContent'] });
    },
  });
}

export function useGetAllServices() {
  const { actor, isFetching } = useActor();
  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddService() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, service }: { id: string; service: Service }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addService(id, service);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}

export function useUpdateService() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, service }: { id: string; service: Service }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateService(id, service);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}

export function useRemoveService() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.removeService(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}

export function useGetAllTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ['testimonials'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (testimonial: Testimonial) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addTestimonial(testimonial);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
}

export function useUpdateTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (testimonial: Testimonial) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateTestimonial(testimonial);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
}

export function useRemoveTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.removeTestimonial(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
}

export function useGetAllGalleryImages() {
  const { actor, isFetching } = useActor();
  return useQuery<GalleryImage[]>({
    queryKey: ['galleryImages'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGalleryImages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddGalleryImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (image: GalleryImage) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addGalleryImage(image);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
    },
  });
}

export function useRemoveGalleryImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.removeGalleryImage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
    },
  });
}

export function useGetAllBookingRequests() {
  const { actor, isFetching } = useActor();
  return useQuery<BookingRequest[]>({
    queryKey: ['bookingRequests'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllBookingRequests();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitBookingRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (request: BookingRequest) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitBookingRequest(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookingRequests'] });
    },
  });
}

export function useDeleteBookingRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_id: bigint) => {
      // Backend doesn't have a delete booking endpoint yet
      throw new Error('Delete booking not yet implemented in backend');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookingRequests'] });
    },
  });
}

// ── Site Theme ────────────────────────────────────────────────────────────────

export function useGetSiteTheme() {
  const { actor, isFetching } = useActor();
  return useQuery<SiteTheme | null>({
    queryKey: ['siteTheme'],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getSiteTheme();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetSiteTheme() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (theme: SiteTheme) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setSiteTheme(theme);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteTheme'] });
    },
  });
}
