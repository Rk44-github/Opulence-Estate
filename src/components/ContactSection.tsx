import { useEffect, useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { PROPERTIES, type Property } from '../data/properties';
import {
  createInquiryReference,
  formatCurrencyUSD,
  validateInquiryForm,
  type InquiryFormValues,
  type InquiryValidationErrors,
} from '../utils/propertyFilter';

interface ContactSectionProps {
  selectedPropertyId: string;
  onClearSelectedProperty: () => void;
}

const PROPERTY_TYPE_OPTIONS = [
  'Modern Villa',
  'Penthouse Apartment',
  'Coastal Estate',
  'Alpine Residence',
];

const BUDGET_OPTIONS = [
  '$1.5M – $3M',
  '$3M – $5M',
  '$5M – $8M',
  '$8M+',
];

const BEDROOM_OPTIONS = ['3+ Bedrooms', '4+ Bedrooms', '5+ Bedrooms', '6+ Bedrooms'];

const VIEWING_FORMAT_OPTIONS = [
  'In-Person Private Tour',
  'Live Architectural Video Tour',
  'Floor Plans & Dossier Only',
];

const LIFESTYLE_PREFERENCES = [
  'Ocean / Water View',
  'Private Pool',
  'Turnkey Furnished',
  'Smart Home Automation',
  'Guest House / Studio',
  'Private Dock or Helipad',
];

const PURPOSE_OPTIONS = [
  'Primary Residence',
  'Vacation Retreat',
  'Investment Portfolio',
];

export function ContactSection({
  selectedPropertyId,
  onClearSelectedProperty,
}: ContactSectionProps) {
  const [values, setValues] = useState<InquiryFormValues>({
    fullName: '',
    email: '',
    phone: '',
    propertyId: selectedPropertyId,
    purpose: 'Primary Residence',
    preferredType: 'Modern Villa',
    budgetRange: '$3M – $5M',
    preferredBedrooms: '4+ Bedrooms',
    viewingFormat: 'In-Person Private Tour',
    lifestylePreferences: [],
    notes: '',
  });

  const [errors, setErrors] = useState<InquiryValidationErrors>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPropertyId) {
      const matched = PROPERTIES.find((p) => p.id === selectedPropertyId);
      setValues((prev) => ({
        ...prev,
        propertyId: selectedPropertyId,
        preferredType: matched
          ? matched.category === 'Penthouse'
            ? 'Penthouse Apartment'
            : matched.category === 'Estate'
              ? 'Coastal Estate'
              : 'Modern Villa'
          : prev.preferredType,
      }));
      setSubmittedRef(null);
    }
  }, [selectedPropertyId]);

  const selectedProperty: Property | undefined = PROPERTIES.find(
    (p) => p.id === values.propertyId
  );

  const toggleLifestylePreference = (pref: string) => {
    setValues((prev) => {
      const exists = prev.lifestylePreferences.includes(pref);
      return {
        ...prev,
        lifestylePreferences: exists
          ? prev.lifestylePreferences.filter((item) => item !== pref)
          : [...prev.lifestylePreferences, pref],
      };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateInquiryForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmittedRef(createInquiryReference());
  };

  const handleNewInquiry = () => {
    setSubmittedRef(null);
    setErrors({});
    setValues({
      fullName: '',
      email: '',
      phone: '',
      propertyId: '',
      purpose: 'Primary Residence',
      preferredType: 'Modern Villa',
      budgetRange: '$3M – $5M',
      preferredBedrooms: '4+ Bedrooms',
      viewingFormat: 'In-Person Private Tour',
      lifestylePreferences: [],
      notes: '',
    });
    onClearSelectedProperty();
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 border-t border-neutral-200 bg-white"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Narrative Column */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] font-medium leading-[1.15] tracking-[-0.02em] text-[#111111] text-balance">
              Begin your private property search
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-600">
              Share your architectural criteria, preferred residence, and
              timeline. A dedicated senior advisor will prepare a private
              dossier within 24 hours.
            </p>

            {selectedProperty && (
              <div className="mt-6 p-4 rounded-xl border border-neutral-200 bg-[#FAFAFA] flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-neutral-500">Selected Residence</p>
                  <p className="text-sm font-medium text-[#111111] truncate mt-0.5">
                    {selectedProperty.title} ·{' '}
                    <span className="tabular-nums">
                      {formatCurrencyUSD(selectedProperty.price)}
                    </span>
                  </p>
                  <p className="text-xs text-neutral-500 truncate">
                    {selectedProperty.location}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Clear selected property"
                  onClick={() => {
                    setValues((prev) => ({ ...prev, propertyId: '' }));
                    onClearSelectedProperty();
                  }}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:text-[#111111] cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-neutral-200 space-y-4">
              <div>
                <p className="text-xs text-neutral-500">Direct Advisory Desk</p>
                <p className="text-sm font-medium text-[#111111] mt-0.5">
                  concierge@horizonestate.com
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-500">Private Client Line</p>
                <p className="text-sm font-medium text-[#111111] tabular-nums mt-0.5">
                  +1 (917) 555-0194
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-500">Regional Offices</p>
                <p className="text-sm text-neutral-700 mt-0.5">
                  New York · Los Angeles · Lisbon · Aspen
                </p>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            {submittedRef ? (
              <div
                data-testid="inquiry-confirmation"
                className="bg-[#FAFAFA] border border-neutral-200 rounded-xl p-6 sm:p-8"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-6 h-6 text-[#111111] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs text-neutral-500 tabular-nums">
                      Reference {submittedRef}
                    </p>
                    <h3 className="font-display text-xl font-medium text-[#111111] mt-1">
                      Private inquiry received
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                      Thank you, {values.fullName}. Senior Property Advisor Marcus
                      Lee has received your acquisition brief and will reply to{' '}
                      <span className="font-medium text-[#111111]">
                        {values.email}
                      </span>{' '}
                      with tailored availability and private viewing options.
                    </p>
                  </div>
                </div>

                <dl className="mt-6 pt-6 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-xs text-neutral-500">Property Interest</dt>
                    <dd className="font-medium text-[#111111] mt-0.5">
                      {selectedProperty
                        ? selectedProperty.title
                        : 'Open Portfolio Advisory'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-neutral-500">Preferred Type &amp; Budget</dt>
                    <dd className="font-medium text-[#111111] mt-0.5 tabular-nums">
                      {values.preferredType} · {values.budgetRange}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-neutral-500">Acquisition Purpose</dt>
                    <dd className="font-medium text-[#111111] mt-0.5">
                      {values.purpose} · {values.preferredBedrooms}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-neutral-500">Viewing Format</dt>
                    <dd className="font-medium text-[#111111] mt-0.5">
                      {values.viewingFormat}
                    </dd>
                  </div>
                  {values.lifestylePreferences.length > 0 && (
                    <div className="sm:col-span-2">
                      <dt className="text-xs text-neutral-500">
                        Selected Preferences
                      </dt>
                      <dd className="font-medium text-[#111111] mt-0.5">
                        {values.lifestylePreferences.join(' · ')}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={handleNewInquiry}
                    className="min-h-[44px] px-5 py-2.5 text-sm font-medium text-white bg-[#111111] rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit}
                className="bg-[#FAFAFA] border border-neutral-200 rounded-xl p-6 sm:p-8 space-y-6"
              >
                {/* Personal Information */}
                <div>
                  <h3 className="font-display text-base font-medium text-[#111111] mb-4">
                    1. Client Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="inquiry-name"
                        className="block text-xs font-medium text-neutral-700 mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="inquiry-name"
                        type="text"
                        required
                        placeholder="Elena Vance"
                        value={values.fullName}
                        onChange={(e) => {
                          setValues((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }));
                          if (errors.fullName) {
                            setErrors((prev) => ({ ...prev, fullName: undefined }));
                          }
                        }}
                        aria-invalid={Boolean(errors.fullName)}
                        className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] ${
                          errors.fullName
                            ? 'border-red-600'
                            : 'border-neutral-200'
                        }`}
                      />
                      {errors.fullName && (
                        <p
                          role="alert"
                          className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-email"
                        className="block text-xs font-medium text-neutral-700 mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        id="inquiry-email"
                        type="email"
                        required
                        placeholder="elena@example.com"
                        value={values.email}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, email: e.target.value }));
                          if (errors.email) {
                            setErrors((prev) => ({ ...prev, email: undefined }));
                          }
                        }}
                        aria-invalid={Boolean(errors.email)}
                        className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] ${
                          errors.email ? 'border-red-600' : 'border-neutral-200'
                        }`}
                      />
                      {errors.email && (
                        <p
                          role="alert"
                          className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="inquiry-phone"
                        className="block text-xs font-medium text-neutral-700 mb-1.5"
                      >
                        Telephone (optional)
                      </label>
                      <input
                        id="inquiry-phone"
                        type="tel"
                        placeholder="+1 (310) 555-0148"
                        value={values.phone}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, phone: e.target.value }));
                          if (errors.phone) {
                            setErrors((prev) => ({ ...prev, phone: undefined }));
                          }
                        }}
                        aria-invalid={Boolean(errors.phone)}
                        className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] ${
                          errors.phone ? 'border-red-600' : 'border-neutral-200'
                        }`}
                      />
                      {errors.phone && (
                        <p
                          role="alert"
                          className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Property Interest */}
                <div className="pt-5 border-t border-neutral-200">
                  <h3 className="font-display text-base font-medium text-[#111111] mb-4">
                    2. Property Interest
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="inquiry-property"
                        className="block text-xs font-medium text-neutral-700 mb-1.5"
                      >
                        Specific Residence of Interest
                      </label>
                      <select
                        id="inquiry-property"
                        value={values.propertyId}
                        onChange={(e) =>
                          setValues((prev) => ({
                            ...prev,
                            propertyId: e.target.value,
                          }))
                        }
                        className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]"
                      >
                        <option value="">Open portfolio consultation</option>
                        {PROPERTIES.map((prop) => (
                          <option key={prop.id} value={prop.id}>
                            {prop.title} ({formatCurrencyUSD(prop.price)})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-purpose"
                        className="block text-xs font-medium text-neutral-700 mb-1.5"
                      >
                        Acquisition Purpose
                      </label>
                      <select
                        id="inquiry-purpose"
                        value={values.purpose}
                        onChange={(e) =>
                          setValues((prev) => ({ ...prev, purpose: e.target.value }))
                        }
                        className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]"
                      >
                        {PURPOSE_OPTIONS.map((purpose) => (
                          <option key={purpose} value={purpose}>
                            {purpose}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* User Preferences */}
                <div className="pt-5 border-t border-neutral-200">
                  <h3 className="font-display text-base font-medium text-[#111111] mb-4">
                    3. Residence Preferences
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="inquiry-type"
                        className="block text-xs font-medium text-neutral-700 mb-1.5"
                      >
                        Preferred Architecture Type *
                      </label>
                      <select
                        id="inquiry-type"
                        value={values.preferredType}
                        onChange={(e) =>
                          setValues((prev) => ({
                            ...prev,
                            preferredType: e.target.value,
                          }))
                        }
                        className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]"
                      >
                        {PROPERTY_TYPE_OPTIONS.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-budget"
                        className="block text-xs font-medium text-neutral-700 mb-1.5"
                      >
                        Target Budget Range *
                      </label>
                      <select
                        id="inquiry-budget"
                        value={values.budgetRange}
                        onChange={(e) =>
                          setValues((prev) => ({
                            ...prev,
                            budgetRange: e.target.value,
                          }))
                        }
                        className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]"
                      >
                        {BUDGET_OPTIONS.map((budget) => (
                          <option key={budget} value={budget}>
                            {budget}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-bedrooms"
                        className="block text-xs font-medium text-neutral-700 mb-1.5"
                      >
                        Minimum Bedrooms
                      </label>
                      <select
                        id="inquiry-bedrooms"
                        value={values.preferredBedrooms}
                        onChange={(e) =>
                          setValues((prev) => ({
                            ...prev,
                            preferredBedrooms: e.target.value,
                          }))
                        }
                        className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]"
                      >
                        {BEDROOM_OPTIONS.map((beds) => (
                          <option key={beds} value={beds}>
                            {beds}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-viewing"
                        className="block text-xs font-medium text-neutral-700 mb-1.5"
                      >
                        Preferred Viewing Format
                      </label>
                      <select
                        id="inquiry-viewing"
                        value={values.viewingFormat}
                        onChange={(e) =>
                          setValues((prev) => ({
                            ...prev,
                            viewingFormat: e.target.value,
                          }))
                        }
                        className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]"
                      >
                        {VIEWING_FORMAT_OPTIONS.map((format) => (
                          <option key={format} value={format}>
                            {format}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Lifestyle & Amenity Checkboxes */}
                  <fieldset className="mt-5">
                    <legend className="text-xs font-medium text-neutral-700 mb-2.5">
                      Architectural &amp; Lifestyle Preferences
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {LIFESTYLE_PREFERENCES.map((pref) => {
                        const checked = values.lifestylePreferences.includes(pref);
                        return (
                          <label
                            key={pref}
                            className={`flex items-center gap-2.5 min-h-[44px] px-3.5 py-2 text-xs sm:text-sm rounded-lg border transition-colors cursor-pointer ${
                              checked
                                ? 'bg-white border-[#111111] text-[#111111] font-medium'
                                : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-400'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleLifestylePreference(pref)}
                              className="w-4 h-4 accent-[#111111] rounded cursor-pointer"
                            />
                            <span>{pref}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="mt-5">
                    <label
                      htmlFor="inquiry-notes"
                      className="block text-xs font-medium text-neutral-700 mb-1.5"
                    >
                      Additional Notes &amp; Preferred Timeline
                    </label>
                    <textarea
                      id="inquiry-notes"
                      rows={3}
                      placeholder="Share preferred neighborhoods, architectural styles, or ideal move-in window..."
                      value={values.notes}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, notes: e.target.value }))
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-neutral-500">
                    All inquiries are handled confidentially by our advisory desk.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 text-sm font-medium text-white bg-[#111111] rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                  >
                    Submit Private Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
