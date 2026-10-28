import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ScrollReveal,
  TextReveal,
  StaggerContainer,
  StaggerItem,
  LUXURY_EASE,
} from './ScrollReveal';

interface SmileTransformationSliderProps {
  onOpenBooking?: () => void;
  onOpenSmileSimulator?: () => void;
}

interface TransformationPhoto {
  id: string;
  url: string;
  alt: string;
}

const TRANSFORMATION_PHOTOS: TransformationPhoto[] = [
  {
    id: 'transformation-1',
    url: '/assets/transformations/trans-1.webp',
    alt: 'Fixed Teeth Dental Implant & Crown Transformation - Dr. Deepal Shah',
  },
  {
    id: 'transformation-2',
    url: '/assets/transformations/trans-2.webp',
    alt: 'Gap Closure Dental Transformation & Patient Note - Dr. Deepal Shah',
  },
  {
    id: 'transformation-3',
    url: '/assets/transformations/trans-3.webp',
    alt: 'Before and After Smile Makeover - Dr. Deepal Shah',
  },
  {
    id: 'transformation-4',
    url: '/assets/transformations/trans-4.webp',
    alt: 'New Smile Makeover & Patient Testimonial - Dr. Deepal Shah',
  },
  {
    id: 'transformation-5',
    url: '/assets/transformations/trans-5.webp',
    alt: 'Full Mouth Rehabilitation Before and After - Dr. Deepal Shah',
  },
  {
    id: 'transformation-6',
    url: '/assets/transformations/trans-6.webp',
    alt: 'Composite Bonding Before and After Smile Makeover - Dr. Deepal Shah',
  },
];

export const SmileTransformationSlider: React.FC<SmileTransformationSliderProps> = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) =>
      prev === null
        ? null
        : (prev - 1 + TRANSFORMATION_PHOTOS.length) % TRANSFORMATION_PHOTOS.length
    );
  }, []);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) =>
      prev === null ? null : (prev + 1) % TRANSFORMATION_PHOTOS.length
    );
  }, []);

  useEffect(() => {
    if (activeIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIdx(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIdx, handlePrev, handleNext]);

  return (
    <section
      id="transformation"
      className="py-8 sm:py-12 bg-[#F7F4E9] border-t border-[#E6DFD1] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <TextReveal
            text="Real Smile Transformations"
            as="h2"
            className="font-serif-clinic text-3xl sm:text-4xl font-bold text-[#1C221D]"
            highlightWords={['Smile']}
            highlightClass="text-[#2D4B3E]"
            delay={30}
            once={false}
          />

          <ScrollReveal animation="scale-up" delay={60} once={false}>
            <div className="w-10 h-0.5 bg-[#2D4B3E] mx-auto mt-2.5 rounded-full" />
          </ScrollReveal>
        </div>

        {/* Uncropped 2-column showcase preserving 100% of every provided image as-is */}
        <StaggerContainer
          staggerDelay={0.07}
          delayChildren={0.06}
          once={false}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-start"
        >
          {TRANSFORMATION_PHOTOS.map((photo, index) => (
            <StaggerItem key={photo.id} distance={18} scale={0.98}>
              <button
                type="button"
                onClick={() => setActiveIdx(index)}
                aria-label={`View full size: ${photo.alt}`}
                className="group relative w-full text-left rounded-2xl bg-[#EFECE3] border border-[#DDD4C3] p-1.5 sm:p-2 shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D4B3E]"
              >
                <div className="relative w-full rounded-xl overflow-hidden bg-white">
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto block select-none"
                  />
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/55 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center pointer-events-none">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Full-Resolution Uncropped Lightbox */}
      <AnimatePresence>
        {activeIdx !== null && (
          <div
            onClick={() => setActiveIdx(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: LUXURY_EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#192B23] rounded-3xl overflow-hidden shadow-2xl border border-[#2D4B3E] p-2 sm:p-3 flex flex-col items-center justify-center"
            >
              <div className="relative w-full max-h-[82vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/50">
                <img
                  src={TRANSFORMATION_PHOTOS[activeIdx].url}
                  alt={TRANSFORMATION_PHOTOS[activeIdx].alt}
                  referrerPolicy="no-referrer"
                  className="max-h-[80vh] w-auto max-w-full object-contain select-none block"
                />

                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 text-white hover:bg-black/90 transition-colors cursor-pointer flex items-center justify-center"
                  aria-label="Previous transformation"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 text-white hover:bg-black/90 transition-colors cursor-pointer flex items-center justify-center"
                  aria-label="Next transformation"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveIdx(null)}
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/65 text-white hover:bg-black/90 transition-colors cursor-pointer flex items-center justify-center"
                  aria-label="Close full size view"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="w-full pt-3 pb-1 px-4 flex items-center justify-between text-stone-300 text-xs font-medium tabular-nums">
                <span className="text-stone-400">Dr. Deepal's Dental Clinic</span>
                <span>
                  {activeIdx + 1} / {TRANSFORMATION_PHOTOS.length}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
