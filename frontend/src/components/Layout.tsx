import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X, Zap } from 'lucide-react';
import LoginButton from './LoginButton';
import { useAdminCheck } from '../hooks/useAdminCheck';

interface LayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Contact', href: '/#contact' },
];

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAdmin } = useAdminCheck();
  const navigate = useNavigate();

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      if (window.location.pathname !== '/') {
        navigate({ to: '/' }).then(() => {
          setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy-dark/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-sm overflow-hidden flex-shrink-0">
              <img
                src="/assets/generated/logo-mark.dim_256x256.png"
                alt="Drone X Solutions Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-900 text-lg text-accent-yellow tracking-tight">DRONE X</span>
              <span className="font-display font-600 text-xs text-muted-foreground tracking-widest uppercase">Solutions</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-accent-yellow transition-colors"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-accent-yellow transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="text-sm font-medium text-accent-yellow hover:text-accent-yellow/80 transition-colors flex items-center gap-1"
              >
                <Zap className="w-3.5 h-3.5" />
                Admin
              </Link>
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LoginButton />
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden bg-navy-dark border-t border-border px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-sm font-medium text-muted-foreground hover:text-accent-yellow transition-colors"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-accent-yellow transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-accent-yellow flex items-center gap-1"
              >
                <Zap className="w-3.5 h-3.5" />
                Admin Panel
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-navy-dark border-t border-border py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-sm overflow-hidden">
                  <img src="/assets/generated/logo-mark.dim_256x256.png" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <span className="font-display font-bold text-accent-yellow">DRONE X SOLUTIONS</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Professional drone cleaning services across Cyprus. Powered by DJI Matrice 400 technology.
              </p>
            </div>
            <div>
              <h4 className="font-display font-bold text-foreground mb-3 text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/#') ? (
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className="text-sm text-muted-foreground hover:text-accent-yellow transition-colors"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-accent-yellow transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-foreground mb-3 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>📍 All over Cyprus</li>
                <li>📞 +357 99 000 000</li>
                <li>✉️ info@dronexsolutions.cy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} Drone X Solutions. All rights reserved.</span>
            <span className="flex items-center gap-1">
              Built with <span className="text-accent-yellow">♥</span> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'drone-x-solutions')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-yellow hover:underline"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
