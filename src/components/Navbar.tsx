import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { LUXURY_EASE } from './ScrollReveal';

interface NavbarProps {
  onOpenBooking: (serviceTitle?: string) => void;
  onOpenSmileSimulator: () => void;
  onOpenMapsModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const shouldReduceMotion = useReducedMotion();

  // Scroll-linked progress bar and glassmorphic depth
  const { scrollY, scrollYProgress } = useScroll();
  const navBgOpacity = useTransform(scrollY, [0, 80], [0.85, 0.98]);
  const navBorderOpacity = useTransform(scrollY, [0, 80], [0.4, 0.9]);
  const navShadow = useTransform(
    scrollY,
    [0, 80],
    ['0 0 0 rgba(0,0,0,0)', '0 8px 24px -6px rgba(45,75,62,0.08)']
  );

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = [
            'home',
            'services',
            'transformation',
            'journey',
            'gallery',
            'about',
            'reviews',
            'faq',
            'book',
            'location',
          ];
          for (const id of sections) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 160 && rect.bottom >= 160) {
                setActiveSection(id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Transformations', href: '#transformation', id: 'transformation' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Reviews', href: '#reviews', id: 'reviews' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
    { label: 'Location', href: '#location', id: 'location' },
  ];

  return (
    <>
      {/* Scroll Progress Bar at the top with fluid gradient */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-[#E8E2D6]/40 z-50 overflow-hidden pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-[#2D4B3E] via-[#3E6655] to-[#F0C05A] origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </div>

      <motion.header
        style={{
          boxShadow: navShadow,
        }}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: LUXURY_EASE }}
        className="sticky top-0 z-40 bg-[#2D4B3E]/95 backdrop-blur-md border-b border-[#22392F] transition-colors"
      >
        {/* Main Navbar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo with curved boundary */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-white/20 flex items-center justify-center p-1 shadow-2xs group-hover:scale-105 group-hover:shadow-xs transition-all overflow-hidden shrink-0">
              <img
                src="/assets/aistudio/image_15ca881b.png"
                alt="Dr. Deepal's Dental Clinic Logo"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-clinic text-lg sm:text-xl font-bold tracking-tight text-white leading-none">
                Dr. Deepal's
              </span>
              <span className="text-[10px] font-semibold tracking-[0.2em] text-[#F0C05A] uppercase mt-0.5">
                DENTAL CLINIC
              </span>
            </div>
          </a>

          {/* Desktop Links with animated gliding indicator */}
          <nav className="hidden lg:flex items-center gap-5 text-[13px] font-medium text-stone-200 relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`transition-colors py-1.5 px-1 relative ${
                    isActive ? 'text-[#F0C05A] font-bold' : 'hover:text-[#F0C05A]'
                  }`}
                >
                  {link.label}
                  {isActive && !shouldReduceMotion && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F0C05A] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTA with smooth hover elevation */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => onOpenBooking()}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-[#1A261F] bg-[#F0C05A] hover:bg-[#e2b245] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 rounded-full transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#1A261F]" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile menu trigger - replaced 3 lines with 'MENU' */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden px-3.5 py-1.5 rounded-full border border-white/30 text-white hover:bg-white/10 font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>

        {/* Mobile dropdown with smooth slide-down */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: LUXURY_EASE }}
            className="lg:hidden bg-[#21382E] border-b border-[#182B22] px-6 py-4 space-y-2.5 overflow-hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-xs font-medium py-1.5 transition-colors ${
                  activeSection === link.id ? 'text-[#F0C05A] font-bold' : 'text-stone-200 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-white/15 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-[#1A261F] bg-[#F0C05A] hover:bg-[#e2b245] rounded-full shadow-sm transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-[#1A261F]" />
                <span>Book Appointment</span>
              </button>
            </div>
          </motion.div>
        )}
      </motion.header>
    </>
  );
};
