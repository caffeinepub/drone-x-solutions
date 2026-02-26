# Specification

## Summary
**Goal:** Fix text contrast across all sections by setting text to bright white (#FFFFFF) on dark backgrounds throughout the site.

**Planned changes:**
- In `ServicesSection.tsx`, set the section label ("WHAT WE DO"), heading ("Our Services"), subtitle/description, service card titles, service card descriptions, and feature labels to bright white (#FFFFFF)
- In `Layout.tsx`, force the navigation header to always use a dark background and set all nav link text (Services, About, Testimonials, Gallery, Contact), logo text, and other header text to bright white (#FFFFFF) — removing the white/transparent scrolled state that makes text invisible
- In `AboutSection.tsx`, set the section heading, all body/paragraph text, and highlight card labels (Eco-Friendly, Precision Tech, Certified Team, Fast Turnaround) to bright white (#FFFFFF)
- Audit and update `HeroSection`, `TestimonialsSection`, `GallerySection`, `BookingForm`, and `ContactSection` to ensure all headings, body text, labels, and descriptions use bright white (#FFFFFF) on dark backgrounds
- Preserve orange accent colors (#F97316) for buttons, icons, and decorative elements throughout

**User-visible outcome:** All text across the entire public-facing site is clearly legible with maximum contrast — bright white text on dark backgrounds with no invisible or low-contrast text elements remaining.
