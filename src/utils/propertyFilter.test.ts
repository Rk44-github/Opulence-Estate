import test from 'node:test';
import assert from 'node:assert/strict';
import { PROPERTIES } from '../data/properties';
import {
  DEFAULT_FILTER_CRITERIA,
  createInquiryReference,
  filterProperties,
  formatCurrencyUSD,
  validateInquiryForm,
  type InquiryFormValues,
} from './propertyFilter';

test('filterProperties returns all properties with default criteria', () => {
  const result = filterProperties(PROPERTIES, DEFAULT_FILTER_CRITERIA);
  assert.equal(result.length, PROPERTIES.length);
});

test('filterProperties filters by category, region, price band, and bedrooms', () => {
  const penthouses = filterProperties(PROPERTIES, {
    ...DEFAULT_FILTER_CRITERIA,
    category: 'Penthouse',
  });
  assert.equal(penthouses.length, 1);
  assert.equal(penthouses[0].id, 'skyline-penthouse');

  const under3m = filterProperties(PROPERTIES, {
    ...DEFAULT_FILTER_CRITERIA,
    priceBand: 'under-3m',
  });
  assert.equal(under3m.length, 2);

  const largeEstates = filterProperties(PROPERTIES, {
    ...DEFAULT_FILTER_CRITERIA,
    minBedrooms: 5,
    priceBand: 'over-5m',
  });
  assert.equal(largeEstates.length, 1);
  assert.equal(largeEstates[0].id, 'mountain-lodge');

  const emptyResult = filterProperties(PROPERTIES, {
    category: 'Penthouse',
    region: 'Portugal',
    priceBand: 'under-3m',
    minBedrooms: 5,
  });
  assert.equal(emptyResult.length, 0);
});

test('formatCurrencyUSD formats luxury prices without decimals', () => {
  assert.equal(formatCurrencyUSD(3450000), '$3,450,000');
});

test('validateInquiryForm rejects missing name, invalid email, and invalid phone', () => {
  const emptyValues: InquiryFormValues = {
    fullName: '',
    email: 'invalid-email',
    phone: '123',
    propertyId: '',
    purpose: 'Primary Residence',
    preferredType: '',
    budgetRange: '',
    preferredBedrooms: '4+',
    viewingFormat: 'In-Person Private Tour',
    lifestylePreferences: [],
    notes: '',
  };

  const errors = validateInquiryForm(emptyValues);
  assert.ok(errors.fullName);
  assert.ok(errors.email);
  assert.ok(errors.phone);
  assert.ok(errors.preferredType);
  assert.ok(errors.budgetRange);
});

test('validateInquiryForm passes for complete valid inquiry with preferences', () => {
  const validValues: InquiryFormValues = {
    fullName: 'Elena Vance',
    email: 'elena.vance@example.com',
    phone: '+1 310 555 0148',
    propertyId: 'serenity-pavilion',
    purpose: 'Primary Residence',
    preferredType: 'Modern Villa',
    budgetRange: '$2.5M – $5M',
    preferredBedrooms: '4+',
    viewingFormat: 'In-Person Private Tour',
    lifestylePreferences: ['Ocean / Water View', 'Private Pool'],
    notes: 'Prefer southern exposure and quiet cul-de-sac.',
  };

  const errors = validateInquiryForm(validValues);
  assert.deepEqual(errors, {});
  assert.equal(createInquiryReference(17000012345), 'HE-12345');
});
