'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Calendar, Users, Star } from 'lucide-react';
import Link from 'next/link';

const included = [
  'Four private bedrooms',
  'Four bathrooms',
  'Fully equipped kitchen',
  'Two living areas',
  'Waterfront porch & dock access',
  'Air conditioning & ceiling fans',
  'Smart speakers & streaming TV',
  'Backup generator',
  'Walking distance to beach & dining',
];

export default function RatesPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="rates"
      ref={ref}
      className="py-20 lg:py-28 px-6 lg:px-10 bg-background"
      aria-label="Rates and pricing"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="accent-rule" />
            <span className="label-caps text-muted-foreground">Rates</span>
            <div className="accent-rule" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="section-headline text-foreground"
          >
            Transparent Pricing.
            <br />
            No Surprises.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Rates Card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-7 rates-card"
          >
            {/* Card top — primary bg */}
            <div className="bg-primary p-8 lg:p-10">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <p className="label-caps text-white/60 mb-3">Starting From</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-6xl lg:text-7xl font-light text-white">
                      $650
                    </span>
                    <span className="font-serif text-2xl text-white/60 font-light">/ night</span>
                  </div>
                  <p className="text-white/50 text-sm mt-2">+10% Bahamas VAT</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-4 py-2">
                    <Star size={12} className="text-accent fill-accent" aria-hidden="true" />
                    <span className="text-white text-sm font-medium">Luxury Villa</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/50 text-xs">
                    <Users size={12} aria-hidden="true" />
                    <span>Up to 8 guests</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card bottom — what's included */}
            <div className="p-8 lg:p-10">
              <p className="label-caps text-muted-foreground mb-6">What&apos;s Included</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {included?.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check size={15} className="text-accent mt-0.5 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Booking notice */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="bg-secondary border border-border rounded-2xl p-7"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center">
                  <Calendar size={16} className="text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-lg font-light text-foreground">
                  Booking Information
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  'Minimum stay: 3 nights',
                  'Check-in: 3:00 PM · Check-out: 11:00 AM',
                  'Rates vary by season — contact for exact quote',
                  'No booking engine — direct inquiry only',
                  'Secure your dates with a simple message',
                ]?.map((note) => (
                  <li key={note} className="flex items-start gap-2">
                    <span
                      className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0"
                      aria-hidden="true"
                    />
                    {note}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="bg-foreground rounded-2xl p-7 text-white"
            >
              <p className="font-serif text-2xl font-light mb-2">Ready to Reserve?</p>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Reach out directly. We&apos;ll confirm availability and provide a detailed quote for
                your dates.
              </p>
              <Link href="#contact" className="luxury-btn-primary w-full justify-center">
                Send an Inquiry
              </Link>
            </motion.div>

            {/* VAT note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-xs text-muted-foreground text-center leading-relaxed"
            >
              All rates are in USD. Bahamas VAT of 10% applies to all bookings. A security deposit
              may be required.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
