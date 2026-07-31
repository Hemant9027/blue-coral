'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import { galleryImages, GalleryImage } from '@/lib/gallery-images';

export default function GalleryPageClient() {
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => setIndex(i);
  const close = () => setIndex(null);
  const prev = useCallback(
    () =>
      setIndex((i) => (i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null)),
    []
  );
  const next = useCallback(
    () => setIndex((i) => (i !== null ? (i + 1) % galleryImages.length : null)),
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, prev, next]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {galleryImages.map((img, i) => (
          <motion.div
            key={img.id}
            className="break-inside-avoid mb-4 rounded-[20px] overflow-hidden cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.35 }}
            onClick={() => open(i)}
            role="button"
            tabIndex={0}
            aria-label={`View ${img.caption} fullscreen`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open(i);
              }
            }}
          >
            <div className={`relative w-full ${img.aspectClass || 'aspect-[4/3]'}`}>
              <AppImage
                src={img.src}
                alt={img.alt}
                fill
                quality={85}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <div className="absolute inset-0" />
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 z-40"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Close gallery"
            >
              ✕
            </button>
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 z-40"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
            >
              <ChevronLeft />
            </button>
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 z-40"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
            >
              <ChevronRight />
            </button>

            <motion.div
              className="relative w-full max-w-[95vw] max-h-[95vh] z-30"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x > 80) prev();
                if (info.offset.x < -80) next();
              }}
            >
              <div className="relative w-full h-[80vh] overflow-hidden rounded-[24px] bg-black">
                <AppImage
                  src={galleryImages[index].src}
                  alt={galleryImages[index].alt}
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <div className="mt-4 text-center text-white">
                <h3 className="text-lg font-medium">{galleryImages[index].caption}</h3>
                <p className="mt-2 text-sm text-white/70">{galleryImages[index].alt}</p>
                <div className="mt-2 text-sm text-white/50">
                  {index + 1} / {galleryImages.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
