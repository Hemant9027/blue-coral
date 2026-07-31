import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import GalleryPageClient from '@/app/components/GalleryPageClient';

export const metadata = {
  title: 'Gallery - Blue Coral Villa',
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <header className="mb-12 rounded-[28px] border border-border bg-white/90 p-8 shadow-[0_32px_80px_rgba(27,79,107,0.08)] backdrop-blur-sm">
            <div className="accent-rule" />
            <h1 className="section-headline text-foreground">Full Villa Gallery</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              An editorial collection of the villa’s photography — click any image to enter the
              immersive viewer.
            </p>
          </header>

          <GalleryPageClient />
        </div>
      </main>
    </>
  );
}
