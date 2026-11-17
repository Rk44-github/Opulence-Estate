import { HERO_IMAGE } from '../data/properties';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroSectionProps {
  onBookCall: () => void;
}

export function HeroSection({ onBookCall }: HeroSectionProps) {
  return (
    <section id="hero" className="pt-10 pb-14 sm:pt-14 sm:pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start mb-8 sm:mb-10">
          <div className="lg:col-span-7">
            <h1 className="font-display text-[clamp(2.25rem,4.4vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[#111111] text-balance max-w-xl">
              Find a place you will call home
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onBookCall}
                className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] text-sm font-medium text-white bg-[#111111] rounded-lg hover:bg-neutral-800 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
              >
                Book a Call
              </button>
              <a
                href="#properties"
                className="inline-flex items-center justify-center px-4 py-3 min-h-[44px] text-sm font-medium text-[#111111] hover:text-neutral-600 underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-lg"
              >
                Explore residences
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-2">
            <p className="text-sm sm:text-base leading-relaxed text-neutral-600 max-w-md">
              With us you will find not just accommodation, but a place where your
              new life begins, full of architectural clarity, light, and lasting
              possibilities.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
              <span>Private Portfolio</span>
              <span aria-hidden="true">·</span>
              <span>New York</span>
              <span aria-hidden="true">·</span>
              <span>Los Angeles</span>
              <span aria-hidden="true">·</span>
              <span>Lisbon</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
          <ImageWithFallback
            src={HERO_IMAGE}
            alt="Contemporary dark charcoal concrete and glass two-story residence with cantilevered balcony and reflection pool"
            fallbackTitle="Horizon Estate Signature Residence"
            priority
            className="w-full aspect-[16/9] object-cover block"
          />
        </div>
      </div>
    </section>
  );
}
