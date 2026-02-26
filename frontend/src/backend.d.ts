import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface GalleryImage {
    id: bigint;
    service: string;
    afterImage: ExternalBlob;
    beforeImage: ExternalBlob;
    description: string;
    location: string;
}
export interface Service {
    id: string;
    title: string;
    description: string;
    image?: ExternalBlob;
}
export interface HomepageContent {
    heroSubtitle: string;
    heroImage?: ExternalBlob;
    ctaText: string;
    aboutText: string;
    heroTitle: string;
}
export interface BookingRequest {
    id: bigint;
    serviceType: string;
    name: string;
    email: string;
    message: string;
    preferredDate: string;
    phone: string;
    location: string;
}
export interface UserProfile {
    name: string;
    email: string;
}
export interface Testimonial {
    id: bigint;
    service: string;
    customerName: string;
    text: string;
    rating: bigint;
    image?: ExternalBlob;
    location: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addGalleryImage(galleryImage: GalleryImage): Promise<void>;
    addService(id: string, service: Service): Promise<void>;
    addTestimonial(testimonial: Testimonial): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllBookingRequests(): Promise<Array<BookingRequest>>;
    getAllGalleryImages(): Promise<Array<GalleryImage>>;
    getAllServices(): Promise<Array<Service>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getHomepageContent(): Promise<HomepageContent>;
    getService(id: string): Promise<Service | null>;
    getTestimonialsByRating(): Promise<Array<Testimonial>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    removeGalleryImage(id: bigint): Promise<void>;
    removeService(id: string): Promise<void>;
    removeTestimonial(id: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitBookingRequest(request: BookingRequest): Promise<bigint>;
    updateGalleryImage(galleryImage: GalleryImage): Promise<void>;
    updateHomepageContent(content: HomepageContent): Promise<void>;
    updateService(id: string, service: Service): Promise<void>;
    updateTestimonial(testimonial: Testimonial): Promise<void>;
}
