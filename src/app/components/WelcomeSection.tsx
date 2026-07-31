'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const stats = [
  { value: '4', label: 'Bedrooms' },
  { value: '4', label: 'Bathrooms' },
  { value: "Fisher\'s Bay", label: 'Waterfront View' },
  { value: 'Great Guana', label: 'Cay, Bahamas' },
];

export default function WelcomeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
    },
  });

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 lg:py-32 px-6 lg:px-10 bg-background"
      aria-label="Welcome to Blue Coral Landing"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <motion.div
                variants={fadeUp(0)}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="flex items-center gap-3 mb-6"
              >
                <div className="accent-rule" />
                <span className="label-caps text-muted-foreground">Welcome</span>
              </motion.div>

              <motion.h2
                variants={fadeUp(0.1)}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="section-headline text-foreground mb-6"
              >
                A Private Sanctuary on the Edge of the Atlantic
              </motion.h2>

              <motion.p
                variants={fadeUp(0.2)}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="text-muted-foreground text-base leading-relaxed mb-5"
              >
                Blue Coral Landing sits at the water&apos;s edge on Great Guana Cay — one of the
                Bahamas&apos; most beloved out-islands. With four elegant bedrooms, four bathrooms,
                and sweeping views across Fisher&apos;s Bay, this is a place where mornings begin
                with the sound of gentle waves and evenings end with sunsets that defy description.
              </motion.p>

              <motion.p
                variants={fadeUp(0.28)}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="text-muted-foreground text-base leading-relaxed mb-8"
              >
                Thoughtfully designed for discerning travellers, the villa blends contemporary
                comfort with authentic Bahamian character. Two generous living areas, a fully
                equipped kitchen, smart entertainment, and a shared dock give you everything you
                need — and nothing you don&apos;t.
              </motion.p>

              <motion.a
                href="#villa"
                variants={fadeUp(0.36)}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="inline-flex items-center gap-2 label-caps text-primary border-b border-accent pb-1 hover:text-accent transition-colors duration-300"
              >
                Discover the Villa
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M1 6h10M6 1l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>
            </div>

            {/* Stats */}
            <motion.div
              variants={fadeUp(0.44)}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="mt-12 grid grid-cols-2 gap-6 pt-10 border-t border-border"
            >
              {stats?.map((s) => (
                <div key={s?.label} className="flex flex-col gap-1">
                  <span className="font-serif text-2xl font-light text-primary">{s?.value}</span>
                  <span className="label-caps text-muted-foreground">{s?.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image Column */}
          <motion.div
            className="lg:col-span-7 relative"
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <AppImage
                src="/35.jpg"
                alt="Luxury waterfront villa exterior with turquoise water view, bright sunny day, white architecture, tropical landscaping"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={
                isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }
              }
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-6 shadow-xl hidden md:block"
            >
              <p className="font-serif text-3xl font-light text-primary mb-1">$650</p>
              <p className="label-caps text-muted-foreground">Per Night · From</p>
              <p className="text-xs text-muted-foreground mt-1">+10% Bahamas VAT</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
