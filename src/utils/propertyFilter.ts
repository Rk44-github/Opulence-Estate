import type { Property, PropertyCategory } from '../data/properties';

export type PriceBand = 'all' | 'under-3m' | '3m-5m' | 'over-5m';

export interface PropertyFilterCriteria {
  category: 'All' | PropertyCategory;
  region: string;
  priceBand: PriceBand;
  minBedrooms: number;
}

export const DEFAULT_FILTER_CRITERIA: PropertyFilterCriteria = {
  category: 'All',
  region: 'All',
  priceBand: 'all',
  minBedrooms: 0,
};

export function formatCurrencyUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function filterProperties(
  properties: Property[],
  criteria: PropertyFilterCriteria
): Property[] {
  return properties.filter((property) => {
    if (criteria.category !== 'All' && property.category !== criteria.category) {
      return false;
    }

    if (criteria.region !== 'All' && property.region !== criteria.region) {
      return false;
    }

    if (criteria.priceBand === 'under-3m' && property.price >= 3000000) {
      return false;
    }
    if (
      criteria.priceBand === '3m-5m' &&
      (property.price < 3000000 || property.price > 5000000)
    ) {
      return false;
    }
    if (criteria.priceBand === 'over-5m' && property.price <= 5000000) {
      return false;
    }

    if (criteria.minBedrooms > 0 && property.bedrooms < criteria.minBedrooms) {
      return false;
    }

    return true;
  });
}

export interface InquiryFormValues {
  fullName: string;
  email: string;
  phone: string;
  propertyId: string;
  purpose: string;
  preferredType: string;
  budgetRange: string;
  preferredBedrooms: string;
  viewingFormat: string;
  lifestylePreferences: string[];
  notes: string;
}

export type InquiryValidationErrors = Partial<
  Record<'fullName' | 'email' | 'phone' | 'preferredType' | 'budgetRange', string>
>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiryForm(
  values: InquiryFormValues
): InquiryValidationErrors {
  const errors: InquiryValidationErrors = {};

  if (!values.fullName.trim() || values.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (values.phone.trim()) {
    const digitsOnly = values.phone.replace(/\D/g, '');
    if (digitsOnly.length < 7) {
      errors.phone = 'Please enter a valid telephone number or leave it blank.';
    }
  }

  if (!values.preferredType.trim()) {
    errors.preferredType = 'Please select your preferred property type.';
  }

  if (!values.budgetRange.trim()) {
    errors.budgetRange = 'Please choose a target investment range.';
  }

  return errors;
}

export function createInquiryReference(seedTime = Date.now()): string {
  const suffix = String(seedTime).slice(-5);
  return `HE-${suffix}`;
}
