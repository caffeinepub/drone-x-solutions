import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type {
  HomepageContent,
  Service,
  Testimonial,
  GalleryImage,
  BookingRequest,
  UserProfile,
} from '../backend';

// ── Homepage ──────────────────────────────────────────────────────────────────

export function useGetHomepageContent() {
  const { actor, isFetching: actorFetching } = useActor();

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
    enabled: !!actor && !actorFetching,
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

// ── Services ──────────────────────────────────────────────────────────────────

export function useGetAllServices() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServices();
    },
    enabled: !!actor && !actorFetching,
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

// ── Testimonials ──────────────────────────────────────────────────────────────

export function useGetAllTestimonials() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Testimonial[]>({
    queryKey: ['testimonials'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTestimonials();
    },
    enabled: !!actor && !actorFetching,
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

// ── Gallery ───────────────────────────────────────────────────────────────────

export function useGetAllGalleryImages() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<GalleryImage[]>({
    queryKey: ['galleryImages'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGalleryImages();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAddGalleryImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (galleryImage: GalleryImage) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addGalleryImage(galleryImage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
    },
  });
}

export function useUpdateGalleryImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (galleryImage: GalleryImage) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateGalleryImage(galleryImage);
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

// ── Booking Requests ──────────────────────────────────────────────────────────

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

export function useGetAllBookingRequests() {
  const { actor, isFetching: actorFetching } = useActor();

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
    enabled: !!actor && !actorFetching,
  });
}

// ── Admin Check ───────────────────────────────────────────────────────────────

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !actorFetching,
  });
}

// ── User Profile ──────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}
