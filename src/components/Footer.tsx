import React from 'react';
import Link from 'next/link';

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Villa', href: '#villa' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Rates', href: '#rates' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy Policy', href: '#privacy' },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-white pt-16 pb-10 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M9 15C9 15 3 11.5 3 7C3 4.239 5.686 2 9 2C12.314 2 15 4.239 15 7C15 11.5 9 15 9 15Z"
                    stroke="#C9A96E"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  <path
                    d="M6 9C6 9 7.5 7 9 7C10.5 7 12 9 12 9"
                    stroke="#FFFFFF"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="font-serif font-medium text-lg text-white">Blue Coral Landing</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              A luxury waterfront villa on Great Guana Cay, Bahamas. Where the ocean meets an
              extraordinary escape.
            </p>
            <p className="mt-4 label-caps text-accent">From $650 / night</p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer navigation">
            {footerLinks?.map((link) => (
              <Link
                key={link?.href}
                href={link?.href}
                className="nav-link-luxury text-white/50 hover:text-white transition-colors duration-300"
              >
                {link?.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date()?.getFullYear()} Blue Coral Landing. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-accent transition-colors duration-300"
              aria-label="Blue Coral Landing on Instagram"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-accent transition-colors duration-300"
              aria-label="Blue Coral Landing on Facebook"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="mailto:info@bluecorallandingbahamas.com"
              className="text-white/40 hover:text-accent transition-colors duration-300"
              aria-label="Email Blue Coral Landing"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
