import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PhotoSliderProps {
  slides?: string[];
}

const DEFAULT_SLIDES = [
  '/src/assets/images/sefat_avatar_1780743117841.png',
  '/src/assets/images/sefat_desk_1780743137973.png',
  '/src/assets/images/sefat_standing_1780743155434.png'
];

export default function PhotoSlider({ slides }: PhotoSliderProps) {
  const slideImages = slides && slides.length > 0 ? slides : DEFAULT_SLIDES;
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setSlideIndex((prev) => (prev + 1) % slideImages.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [slideImages.length, isPaused]);

  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + slideImages.length) % slideImages.length);
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % slideImages.length);
  };

  return (
    <motion.section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div
        className="relative overflow-hidden rounded-[32px] border border-zinc-800 bg-[#080a0f]/80 shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative h-[420px] w-full">
          {slideImages.map((src, index) => (
            <img
              key={`${src}-${index}`}
              src={src}
              alt={`Profile photo ${index + 1}`}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${index === slideIndex ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden={index !== slideIndex}
              style={{ willChange: 'opacity' }}
            />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between px-4 pb-4">
          <button
            type="button"
            onClick={handlePrevSlide}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-zinc-100 hover:bg-[#00E5FF]/80 transition-colors"
            aria-label="Previous photo"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-zinc-300">
            <span>Photo {slideIndex + 1}</span>
            <span className="text-zinc-600">/</span>
            <span>{slideImages.length}</span>
          </div>
          <button
            type="button"
            onClick={handleNextSlide}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-zinc-100 hover:bg-[#00E5FF]/80 transition-colors"
            aria-label="Next photo"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
