import { useMemo, useState } from 'react';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import { PROPERTIES, type Property, type PropertyCategory } from '../data/properties';
import {
  DEFAULT_FILTER_CRITERIA,
  filterProperties,
  formatCurrencyUSD,
  type PriceBand,
  type PropertyFilterCriteria,
} from '../utils/propertyFilter';
import { ImageWithFallback } from './ImageWithFallback';

interface PropertyGalleryProps {
  onSelectProperty: (property: Property) => void;
  onInquireProperty: (property: Property) => void;
}

const CATEGORY_TABS: Array<{ label: string; value: 'All' | PropertyCategory }> = [
  { label: 'All Residences', value: 'All' },
  { label: 'Villas', value: 'Villa' },
  { label: 'Penthouses', value: 'Penthouse' },
  { label: 'Estates', value: 'Estate' },
];

export function PropertyGallery({
  onSelectProperty,
  onInquireProperty,
}: PropertyGalleryProps) {
  const [criteria, setCriteria] = useState<PropertyFilterCriteria>(
    DEFAULT_FILTER_CRITERIA
  );

  const availableRegions = useMemo(() => {
    const regions = Array.from(new Set(PROPERTIES.map((p) => p.region)));
    return regions.sort();
  }, []);

  const filteredProperties = useMemo(
    () => filterProperties(PROPERTIES, criteria),
    [criteria]
  );

  const hasActiveFilters =
    criteria.category !== 'All' ||
    criteria.region !== 'All' ||
    criteria.priceBand !== 'all' ||
    criteria.minBedrooms !== 0;

  const handleReset = () => {
    setCriteria(DEFAULT_FILTER_CRITERIA);
  };

  return (
    <section
      id="properties"
      className="py-16 sm:py-24 border-t border-neutral-200 bg-white"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10">
          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] font-medium leading-[1.15] tracking-[-0.02em] text-[#111111] text-balance max-w-md">
              We help you find the home that will be yours
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base leading-relaxed text-neutral-600 max-w-md">
              Our residences are chosen for harmony, architectural provenance,
              and natural light—curated so every square meter feels intentional.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#FAFAFA] border border-neutral-200 rounded-xl p-4 sm:p-5 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-200">
            <div
              role="tablist"
              aria-label="Property Category"
              className="flex flex-wrap items-center gap-1.5"
            >
              {CATEGORY_TABS.map((tab) => {
                const isActive = criteria.category === tab.value;
                return (
                  <button
                    key={tab.value}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() =>
                      setCriteria((prev) => ({ ...prev, category: tab.value }))
                    }
                    className={`px-3.5 py-2 min-h-[40px] text-xs sm:text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] ${
                      isActive
                        ? 'bg-[#111111] text-white'
                        : 'bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-400 hover:text-[#111111]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 tabular-nums">
              {filteredProperties.length}{' '}
              {filteredProperties.length === 1 ? 'residence' : 'residences'}{' '}
              available
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 items-end">
            <div>
              <label
                htmlFor="filter-region"
                className="block text-xs font-medium text-neutral-600 mb-1.5"
              >
                Location
              </label>
              <select
                id="filter-region"
                value={criteria.region}
                onChange={(e) =>
                  setCriteria((prev) => ({ ...prev, region: e.target.value }))
                }
                className="w-full min-h-[44px] px-3 py-2 text-sm text-[#111111] bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]"
              >
                <option value="All">All destinations</option>
                {availableRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="filter-price"
                className="block text-xs font-medium text-neutral-600 mb-1.5"
              >
                Price Range
              </label>
              <select
                id="filter-price"
                value={criteria.priceBand}
                onChange={(e) =>
                  setCriteria((prev) => ({
                    ...prev,
                    priceBand: e.target.value as PriceBand,
                  }))
                }
                className="w-full min-h-[44px] px-3 py-2 text-sm text-[#111111] bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]"
              >
                <option value="all">Any budget</option>
                <option value="under-3m">Under $3,000,000</option>
                <option value="3m-5m">$3,000,000 – $5,000,000</option>
                <option value="over-5m">$5,000,000+</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="filter-bedrooms"
                className="block text-xs font-medium text-neutral-600 mb-1.5"
              >
                Bedrooms
              </label>
              <select
                id="filter-bedrooms"
                value={criteria.minBedrooms}
                onChange={(e) =>
                  setCriteria((prev) => ({
                    ...prev,
                    minBedrooms: Number(e.target.value),
                  }))
                }
                className="w-full min-h-[44px] px-3 py-2 text-sm text-[#111111] bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]"
              >
                <option value={0}>Any bedrooms</option>
                <option value={3}>3+ bedrooms</option>
                <option value={4}>4+ bedrooms</option>
                <option value={5}>5+ bedrooms</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleReset}
                disabled={!hasActiveFilters}
                className={`inline-flex items-center justify-center gap-1.5 w-full min-h-[44px] px-4 py-2 text-sm font-medium rounded-lg border transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] ${
                  hasActiveFilters
                    ? 'border-neutral-300 bg-white text-[#111111] hover:bg-neutral-100'
                    : 'border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                Clear filters
              </button>
            </div>
          </div>
        </div>

        {/* Subheading */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-lg font-medium text-[#111111]">
            Available residences
          </h3>
        </div>

        {/* Empty State or Property Grid */}
        {filteredProperties.length === 0 ? (
          <div className="border border-neutral-200 rounded-xl bg-[#FAFAFA] p-12 text-center">
            <h4 className="font-display text-lg font-medium text-[#111111]">
              No residences match these filters
            </h4>
            <p className="mt-2 text-sm text-neutral-600 max-w-md mx-auto">
              Adjust your location, budget, or bedroom requirements—or reset all
              filters to inspect our full architectural portfolio.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-5 inline-flex items-center justify-center px-5 py-2.5 min-h-[44px] text-sm font-medium text-white bg-[#111111] rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div
            data-testid="property-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
          >
            {filteredProperties.map((property) => (
              <article
                key={property.id}
                className="group flex flex-col bg-white border border-neutral-200 rounded-xl overflow-hidden transition-colors duration-150 hover:border-neutral-400"
              >
                <button
                  type="button"
                  onClick={() => onSelectProperty(property)}
                  aria-label={`Inspect ${property.title} in ${property.region}`}
                  className="block w-full overflow-hidden bg-neutral-100 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#111111]"
                >
                  <ImageWithFallback
                    src={property.image}
                    alt={`${property.title} — ${property.category} in ${property.location}`}
                    fallbackTitle={property.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </button>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="font-display text-base font-medium text-[#111111] truncate">
                        {property.title}
                      </h4>
                      <span className="text-base font-medium text-[#111111] tabular-nums shrink-0">
                        {formatCurrencyUSD(property.price)}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-neutral-500 truncate">
                      {property.location}
                    </p>

                    <div className="mt-3 pt-3 border-t border-neutral-100 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-600 tabular-nums">
                      <span>{property.areaSqm} m²</span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {property.floors}{' '}
                        {property.floors === 1 ? 'floor' : 'floors'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{property.bedrooms} beds</span>
                      <span aria-hidden="true">·</span>
                      <span>{property.bathrooms} baths</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectProperty(property)}
                      className="inline-flex items-center justify-center min-h-[40px] px-2 py-1.5 text-xs font-medium text-neutral-600 hover:text-[#111111] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-md"
                    >
                      View details
                    </button>
                    <button
                      type="button"
                      onClick={() => onInquireProperty(property)}
                      className="inline-flex items-center justify-center gap-1 min-h-[40px] px-3 py-1.5 text-xs font-medium text-[#111111] border border-neutral-200 bg-[#FAFAFA] hover:bg-[#111111] hover:text-white hover:border-[#111111] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                    >
                      Inquire
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
