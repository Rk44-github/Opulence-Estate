import { useState } from 'react';
import { Phone } from 'lucide-react';
import { ABOUT_IMAGE, ADVISOR_IMAGE } from '../data/properties';
import { ImageWithFallback } from './ImageWithFallback';

interface AboutSectionProps {
  onBookCall: () => void;
}

const ADVISORY_PILLARS = [
  {
    id: 'selection',
    title: '01. Tailored Property Selection',
    description:
      'Every client receives a curated portfolio of verified off-market and listed architectural residences—complete with sunlight studies, floor plans, and private video walkthroughs.',
  },
  {
    id: 'diligence',
    title: '02. Architectural & Title Due Diligence',
    description:
      'Our structural engineers, coastal surveyors, and cross-border legal counsel verify build integrity, zoning rights, and clean title transfer before you ever submit an offer.',
  },
  {
    id: 'closing',
    title: '03. Discreet Acquisition & Closing',
    description:
      'From cross-currency escrow structuring to bespoke interior staging and property management, one dedicated senior advisor oversees every stage through handover.',
  },
];

export function AboutSection({ onBookCall }: AboutSectionProps) {
  const [activePillarId, setActivePillarId] = useState<string>('selection');

  return (
    <section
      id="about"
      className="py-16 sm:py-24 border-t border-neutral-200 bg-[#FAFAFA]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] font-medium leading-[1.15] tracking-[-0.02em] text-[#111111] text-balance max-w-md">
              See what we offer and how it works
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base leading-relaxed text-neutral-600 max-w-md">
              Virtual walkthroughs, verified architectural provenance, and
              senior advisory—everything you need to explore and acquire with
              complete clarity.
            </p>
          </div>
        </div>

        {/* 2-Column Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Numbered Advisory Pillars + Agency Metrics */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-8">
            <div className="space-y-3">
              {ADVISORY_PILLARS.map((pillar) => {
                const isActive = activePillarId === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActivePillarId(pillar.id)}
                    aria-expanded={isActive}
                    className={`w-full text-left p-5 rounded-xl border transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] ${
                      isActive
                        ? 'bg-white border-[#111111]'
                        : 'bg-white/60 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <h3 className="font-display text-base sm:text-lg font-medium text-[#111111]">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                      {pillar.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Quantified Agency Evidence adjacent to advisory claims */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-200 tabular-nums">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-medium text-[#111111]">
                  142
                </p>
                <p className="mt-1 text-xs text-neutral-600 leading-snug">
                  Residences placed since 2018
                </p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-medium text-[#111111]">
                  14%
                </p>
                <p className="mt-1 text-xs text-neutral-600 leading-snug">
                  Avg. 5-year portfolio appreciation
                </p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-medium text-[#111111]">
                  $1.8B
                </p>
                <p className="mt-1 text-xs text-neutral-600 leading-snug">
                  Private transaction volume closed
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Photography + Advisor Lockup */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="flex-1 overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <ImageWithFallback
                src={ABOUT_IMAGE}
                alt="Sculptural white modernist architectural residence facade with angled roof"
                fallbackTitle="Architectural Advisory"
                className="w-full h-full min-h-[280px] aspect-[4/3] lg:aspect-auto object-cover"
              />
            </div>

            <div className="bg-white border border-neutral-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-14 h-14 rounded-lg overflow-hidden border border-neutral-200 shrink-0 bg-neutral-100">
                  <ImageWithFallback
                    src={ADVISOR_IMAGE}
                    alt="Marcus Lee, Senior Property Advisor at Horizon Estate"
                    fallbackTitle="Marcus Lee"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-medium text-[#111111] truncate">
                    Raj Kumar
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Senior Property Advisor · New York &amp; California
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-700 tabular-nums">
                    <Phone className="w-3.5 h-3.5 text-neutral-500" aria-hidden="true" />
                    +1 (224) 464-3070
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onBookCall}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 min-h-[44px] text-xs font-medium text-white bg-[#111111] rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
              >
                Get consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
