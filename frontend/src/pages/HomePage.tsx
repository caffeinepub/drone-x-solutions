import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import BookingForm from '../components/BookingForm';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import GallerySection from '../components/GallerySection';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <BookingForm />
      <AboutSection />
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />
    </>
  );
}
