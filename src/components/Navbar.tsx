import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onBookCall: () => void;
}

const NAV_LINKS = [
  { label: 'Residences', href: '#properties' },
  { label: 'About Us', href: '#about' },
  { label: 'Inquire', href: '#contact' },
  { label: 'Offices', href: '#footer' },
];

export function Navbar({ onBookCall }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileLink = () => {
    setMobileOpen(false);
  };

  const handleMobileBookCall = () => {
    setMobileOpen(false);
    onBookCall();
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-[#FAFAFA]/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-[1200px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hero"
          className="font-display text-base font-bold tracking-tight text-[#111111] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-sm"
        >
          Opulence Estate
        </a>

        {/* Zone 2: Concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#111111] hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onBookCall}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 min-h-[40px] text-xs font-medium text-white bg-[#111111] rounded-lg hover:bg-neutral-800 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
          >
            Book a Call
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-neutral-200 bg-white text-[#111111] hover:bg-neutral-100 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-4 py-4 shadow-sm">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleMobileLink}
                className="flex items-center min-h-[44px] px-3 text-sm font-medium text-neutral-700 hover:text-[#111111] hover:bg-neutral-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 mt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={handleMobileBookCall}
                className="w-full min-h-[44px] px-4 py-2.5 text-sm font-medium text-white bg-[#111111] rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Book a Call
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
