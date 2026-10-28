import React, { useState } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TextReveal,
  FadeUp,
  StaggerContainer,
  StaggerItem,
  LUXURY_EASE,
} from './ScrollReveal';

interface PhotoItem {
  id: string;
  url: string;
  category: string;
  title: string;
  alt: string;
}

// Authentic gallery photos preserving original uncropped aspect ratios with concise descriptions
const GALLERY_PHOTOS: PhotoItem[] = [
  {
    id: 'gallery-img-1',
    url: '/assets/user/gal1.webp',
    category: 'Clinic Exterior',
    title: 'Malabar Hill Clinic Entrance',
    alt: 'Malabar Hill Clinic Entrance - Dr. Deepals Dental Clinic',
  },
  {
    id: 'gallery-img-2',
    url: '/assets/user/gal2.webp',
    category: 'Entrance & Hallway',
    title: 'Consultation Suite Entrance',
    alt: 'Consultation Suite Entrance - Malabar Hill',
  },
  {
    id: 'gallery-img-3',
    url: '/assets/user/gal3.webp',
    category: 'Credentials & Honors',
    title: 'Clinical Certifications Wall',
    alt: 'Clinical Certifications Wall - Dr. Deepal Shah',
  },
  {
    id: 'gallery-img-4',
    url: '/assets/user/gal4_new.webp',
    category: 'Operatory Suite',
    title: 'Advanced Treatment Operatory',
    alt: 'Advanced Treatment Operatory and Dental Suite',
  },
  {
    id: 'gallery-img-5',
    url: '/assets/user/gal5.webp',
    category: 'Clinic Signage',
    title: 'Welcome Clinic Signboard',
    alt: 'Welcome Clinic Signboard - Dr. Deepals Dental Clinic',
  },
  {
    id: 'gallery-img-6',
    url: '/assets/user/gal6.webp',
    category: 'Happy Patients',
    title: 'Confident Patient Smiles',
    alt: 'Confident Patient Smiles at Dr. Deepals Dental Clinic',
  },
];

export const PhotoGalleryStrip: React.FC = () => {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx(
        (activePhotoIdx - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((activePhotoIdx + 1) % GALLERY_PHOTOS.length);
    }
  };

  return (
    <section id="gallery" className="py-8 sm:py-12 bg-[#F7F4E9] overflow-hidden border-t border-[#E6DFD1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <TextReveal
            text="Gallery & Results"
            as="h2"
            className="font-serif-clinic text-3xl sm:text-4xl font-bold text-[#1C221D]"
            highlightWords={['Results']}
            highlightClass="text-[#2D4B3E]"
            delay={30}
            once={false}
          />
          <FadeUp delay={60} once={false}>
            <div className="w-10 h-0.5 bg-[#2D4B3E] mx-auto mt-2.5 mb-2 rounded-full" />
          </FadeUp>
        </div>

        {/* Uncropped Responsive Image Grid with concise descriptions */}
        <StaggerContainer
          staggerDelay={0.07}
          delayChildren={0.06}
          once={false}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5"
        >
          {GALLERY_PHOTOS.map((photo, index) => (
            <StaggerItem key={photo.id} distance={18} scale={0.97} className="break-inside-avoid mb-4 sm:mb-5 inline-block w-full">
              <div
                onClick={() => setActivePhotoIdx(index)}
                className="group relative rounded-2xl overflow-hidden bg-[#EFECE3] border border-[#DDD4C3] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer p-2"
              >
                {/* Image rendered in its natural uncropped aspect ratio */}
                <div className="relative rounded-xl overflow-hidden bg-stone-100 flex items-center justify-center">
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03] block"
                  />
                  {/* Subtle hover overlay with zoom icon */}
                  <div className="absolute inset-0 bg-[#1F352C]/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/95 text-[#2D4B3E] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Concise few-word description below each photo */}
                <div className="pt-2.5 pb-1 px-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D4B3E]">
                      {photo.category}
                    </span>
                    <span className="text-[11px] font-semibold tabular-nums text-stone-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-[15px] font-bold text-[#1C221D] leading-snug mt-0.5">
                    {photo.title}
                  </h3>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Lightbox Modal with uncropped display, description, and navigation */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <div
            onClick={() => setActivePhotoIdx(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.93, filter: 'blur(6px)' }}
              transition={{ duration: 0.28, ease: LUXURY_EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#192B23] rounded-3xl overflow-hidden shadow-2xl border border-[#2D4B3E] p-2 sm:p-3 flex flex-col items-center justify-center"
            >
              {/* Uncropped Full Photo Container */}
              <div className="relative w-full max-h-[78vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/50">
                <img
                  src={GALLERY_PHOTOS[activePhotoIdx].url}
                  alt={GALLERY_PHOTOS[activePhotoIdx].alt}
                  referrerPolicy="no-referrer"
                  className="max-h-[76vh] w-auto max-w-full object-contain select-none"
                />

                {/* Left arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all cursor-pointer hover:scale-110 active:scale-90"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all cursor-pointer hover:scale-110 active:scale-90"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Close button */}
                <button
                  onClick={() => setActivePhotoIdx(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all cursor-pointer hover:scale-110 active:scale-90"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Description Footer */}
              <div className="w-full pt-3 pb-1.5 px-4 flex items-end justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F0C05A] block">
                    {GALLERY_PHOTOS[activePhotoIdx].category}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white leading-snug mt-0.5">
                    {GALLERY_PHOTOS[activePhotoIdx].title}
                  </h4>
                </div>
                <span className="text-stone-300 text-xs font-semibold tabular-nums shrink-0">
                  {String(activePhotoIdx + 1).padStart(2, '0')} / {String(GALLERY_PHOTOS.length).padStart(2, '0')}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
