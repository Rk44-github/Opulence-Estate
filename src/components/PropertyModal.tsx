import { useEffect } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';
import type { Property } from '../data/properties';
import { formatCurrencyUSD } from '../utils/propertyFilter';
import { ImageWithFallback } from './ImageWithFallback';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  onInquire: (property: Property) => void;
}

export function PropertyModal({
  property,
  onClose,
  onInquire,
}: PropertyModalProps) {
  useEffect(() => {
    if (!property) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [property, onClose]);

  if (!property) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-property-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/55 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-neutral-200 rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 py-4 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
          <div className="min-w-0">
            <p className="text-xs text-neutral-500">
              {property.category} · {property.architect} · Built {property.yearBuilt}
            </p>
            <h3
              id="modal-property-title"
              className="font-display text-lg sm:text-xl font-medium text-[#111111] truncate"
            >
              {property.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close residence details"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-neutral-200 text-neutral-700 hover:text-[#111111] hover:bg-neutral-100 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
            <ImageWithFallback
              src={property.image}
              alt={`${property.title} architectural view`}
              fallbackTitle={property.title}
              className="w-full aspect-[16/10] object-cover"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4 pb-5 border-b border-neutral-200">
            <div>
              <p className="text-xs text-neutral-500">Location</p>
              <p className="text-sm font-medium text-[#111111] mt-0.5">
                {property.location}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs text-neutral-500">Guide Price</p>
              <p className="font-display text-2xl font-medium text-[#111111] tabular-nums mt-0.5">
                {formatCurrencyUSD(property.price)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-neutral-200 tabular-nums">
            <div>
              <p className="text-xs text-neutral-500">Interior Area</p>
              <p className="text-sm font-medium text-[#111111] mt-0.5">
                {property.areaSqm} m²
              </p>
            </div>
            <div>
              <p className="text-xs text-neutral-500">Levels</p>
              <p className="text-sm font-medium text-[#111111] mt-0.5">
                {property.floors} {property.floors === 1 ? 'floor' : 'floors'}
              </p>
            </div>
            <div>
              <p className="text-xs text-neutral-500">Bedrooms</p>
              <p className="text-sm font-medium text-[#111111] mt-0.5">
                {property.bedrooms} bedrooms
              </p>
            </div>
            <div>
              <p className="text-xs text-neutral-500">Bathrooms</p>
              <p className="text-sm font-medium text-[#111111] mt-0.5">
                {property.bathrooms} baths
              </p>
            </div>
          </div>

          <div className="py-5">
            <h4 className="font-display text-sm font-medium text-[#111111]">
              Architectural Overview
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {property.summary}
            </p>

            <h4 className="font-display text-sm font-medium text-[#111111] mt-5">
              Key Specifications
            </h4>
            <ul className="mt-2.5 space-y-2">
              {property.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-neutral-700"
                >
                  <Check
                    className="w-4 h-4 text-[#111111] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-5 py-2.5 text-sm font-medium text-neutral-700 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Continue Browsing
            </button>
            <button
              type="button"
              onClick={() => onInquire(property)}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-medium text-white bg-[#111111] rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Inquire About This Residence
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
