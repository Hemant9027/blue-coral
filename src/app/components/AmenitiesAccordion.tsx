'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Wifi, Car, Monitor, Anchor, Trees, ShieldCheck } from 'lucide-react';

export default function AmenitiesAccordion({
  groups,
}: {
  groups: { title: string; items: string[] }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-6 space-y-3">
      {groups.map((g, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={g.title} className="rounded-2xl border border-border bg-white p-3">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <span className="text-accent">
                  {i === 0 ? (
                    <Car size={16} />
                  ) : i === 1 ? (
                    <Wifi size={16} />
                  ) : i === 2 ? (
                    <Anchor size={16} />
                  ) : i === 3 ? (
                    <ShieldCheck size={16} />
                  ) : (
                    <Trees size={16} />
                  )}
                </span>
                <span className="font-medium text-foreground">{g.title}</span>
                <span className="text-sm text-muted-foreground">({g.items.length})</span>
              </div>
              <div className="text-accent">{isOpen ? '−' : '+'}</div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="overflow-hidden mt-3"
                >
                  <div className="grid gap-2 sm:grid-cols-2">
                    {g.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                        <Check size={14} className="text-primary shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
