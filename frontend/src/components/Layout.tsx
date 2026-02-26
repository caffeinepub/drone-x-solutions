import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { Menu, X, Zap } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useAdminSession } from '../hooks/useAdminSession';
import type { Language } from '../utils/translations';

interface LayoutProps {
  children: React.ReactNode;
}

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'gr', label: 'GR' },
  { code: 'ru', label: 'RU' },
];

export default function Layout({ children }: LayoutProps) {
  const { t, language, setLanguage } = useTranslation();
  const { isAdminAuthenticated, adminLogout } = useAdminSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate({ to: '/' });
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate({ to: '/' });
  };

  const navLinks = [
    { label: t('nav.services'), id: 'services' },
    { label: t('nav.about'), id: 'about' },
    { label: t('nav.testimonials'), id: 'testimonials' },
    { label: t('nav.gallery'), id: 'gallery' },
    { label: t('nav.contact'), id: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Fixed Header — always dark background for maximum nav contrast */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-steel-900 ${
          scrolled
            ? 'shadow-industrial border-b border-border'
            : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => navigate({ to: '/' })}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center group-hover:bg-amber-400 transition-colors">
                <Zap className="w-5 h-5 text-steel-900" />
              </div>
              <span className="font-display font-800 text-lg text-white">
                DRONE<span className="text-amber-500">X</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {!isAdminPage && navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm font-semibold text-white hover:text-amber-500 hover:bg-white/5 transition-all px-3 py-2 rounded"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right side: Language switcher + Admin */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="flex items-center gap-0.5 bg-steel-800/80 rounded border border-white/10 px-1 py-0.5">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-2 py-1 text-xs font-display font-700 rounded transition-all ${
                      language === lang.code
                        ? 'bg-amber-500 text-steel-900'
                        : 'text-white hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              {/* Admin controls */}
              {isAdminAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="hidden md:block text-xs font-semibold text-white hover:text-destructive transition-colors border border-white/20 hover:border-destructive/50 rounded px-3 py-1.5"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => navigate({ to: '/admin/login' })}
                  className="hidden md:block text-xs font-semibold text-white hover:text-amber-500 transition-colors border border-white/20 hover:border-amber-500/50 rounded px-3 py-1.5"
                >
                  {t('nav.adminLogin')}
                </button>
              )}

              {/* Book Now CTA */}
              {!isAdminPage && (
                <button
                  onClick={() => scrollToSection('booking')}
                  className="hidden md:block bg-amber-500 hover:bg-amber-400 text-steel-900 font-display font-700 text-sm px-4 py-2 rounded transition-colors shadow-amber-glow"
                >
                  {t('nav.booking')}
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white p-1 hover:text-amber-500 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-steel-900 border-t border-white/10">
            <div className="px-4 py-4 space-y-1">
              {!isAdminPage && navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left text-sm font-semibold text-white hover:text-amber-500 hover:bg-white/5 transition-all py-2.5 px-3 rounded"
                >
                  {link.label}
                </button>
              ))}
              {!isAdminPage && (
                <button
                  onClick={() => { scrollToSection('booking'); setMobileMenuOpen(false); }}
                  className="block w-full text-left bg-amber-500 hover:bg-amber-400 text-steel-900 font-display font-700 text-sm px-4 py-2.5 rounded transition-colors mt-2"
                >
                  {t('nav.booking')}
                </button>
              )}
              <div className="pt-2 border-t border-white/10 mt-2">
                {isAdminAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-sm font-semibold text-destructive hover:bg-destructive/10 py-2.5 px-3 rounded transition-colors"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => { navigate({ to: '/admin/login' }); setMobileMenuOpen(false); }}
                    className="block w-full text-left text-sm font-semibold text-white hover:text-amber-500 hover:bg-white/5 transition-all py-2.5 px-3 rounded"
                  >
                    {t('nav.adminLogin')}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-steel-900 border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Brand */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-amber-500 rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-steel-900" />
              </div>
              <span className="font-display font-800 text-white">
                DRONE<span className="text-amber-500">X</span>
              </span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="hover:text-amber-500 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Attribution */}
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} DroneX Solutions ·{' '}
              Built with{' '}
              <span className="text-amber-500">♥</span>{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'dronex-solutions')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-500 hover:text-amber-400 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
