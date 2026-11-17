export type PropertyCategory = 'Villa' | 'Penthouse' | 'Estate';

export interface Property {
  id: string;
  title: string;
  category: PropertyCategory;
  location: string;
  region: string;
  price: number;
  areaSqm: number;
  floors: number;
  bedrooms: number;
  bathrooms: number;
  architect: string;
  yearBuilt: number;
  image: string;
  summary: string;
  highlights: string[];
}

export const PROPERTIES: Property[] = [
  {
    id: 'serenity-pavilion',
    title: 'Serenity Pavilion',
    category: 'Villa',
    location: 'USA / California / Los Angeles',
    region: 'California',
    price: 3450000,
    areaSqm: 320,
    floors: 1,
    bedrooms: 4,
    bathrooms: 4,
    architect: 'Kengo & Partners',
    yearBuilt: 2025,
    image: '/src/assets/images/prop_serenity_pavilion_1794900073444.jpg',
    summary:
      'Board-formed architectural concrete pavilion above Sunset Strip with vanishing glass walls, warm white-oak millwork, and a cantilevered travertine pool terrace.',
    highlights: [
      'Zero-edge heated infinity pool overlooking the basin',
      'Retractable motorized Vitrocsa glass sliders',
      'Private wellness suite with cedar sauna',
    ],
  },
  {
    id: 'island-retreat',
    title: 'Exuma Horizon Villa',
    category: 'Estate',
    location: 'Bahamas / Exuma / Emerald Bay',
    region: 'Bahamas',
    price: 4200000,
    areaSqm: 410,
    floors: 2,
    bedrooms: 5,
    bathrooms: 5,
    architect: 'Studio Maris',
    yearBuilt: 2025,
    image: '/src/assets/images/prop_island_retreat_1794900073163.jpg',
    summary:
      'Sculptural white-concrete coastal estate featuring a dramatic cantilevered canopy, 120 feet of private turquoise beachfront, and an oceanfront lap pool.',
    highlights: [
      'Private deep-water tender dock and beach access',
      'Hurricane-rated acoustic low-iron glazing',
      'Detached two-bedroom oceanfront guest pavilion',
    ],
  },
  {
    id: 'mountain-lodge',
    title: 'Red Mountain Residence',
    category: 'Estate',
    location: 'USA / Colorado / Aspen',
    region: 'Colorado',
    price: 5850000,
    areaSqm: 480,
    floors: 3,
    bedrooms: 6,
    bathrooms: 6,
    architect: 'Vossler Architecture',
    yearBuilt: 2024,
    image: '/src/assets/images/prop_mountain_lodge_1794900074407.jpg',
    summary:
      'Three-level alpine sanctuary framed in warm cedar soffits and bronze steel glazing, capturing unobstructed panoramic views of the Continental Divide.',
    highlights: [
      'Radiant-heated limestone terraces and snow-melt drive',
      'Climate-controlled 900-bottle wine gallery',
      'Three-car heated garage with EV fast charging',
    ],
  },
  {
    id: 'comporta-beach-lux',
    title: 'Comporta Dune House',
    category: 'Villa',
    location: 'Portugal / Alentejo / Comporta',
    region: 'Portugal',
    price: 2690000,
    areaSqm: 280,
    floors: 1,
    bedrooms: 4,
    bathrooms: 4,
    architect: 'Atelier Costa',
    yearBuilt: 2025,
    image: '/src/assets/images/prop_comporta_villa_1794900076605.jpg',
    summary:
      'Sun-drenched whitewashed minimalist villa tucked behind umbrella pines and Atlantic coastal dunes, crafted with hand-laid limestone and natural linen interiors.',
    highlights: [
      '18-meter saltwater pool with shaded pergola dining',
      'Private dune boardwalk 300 meters to the ocean',
      'Solar microgrid with architectural battery storage',
    ],
  },
  {
    id: 'tulum-eco-retreat',
    title: 'Selva Limestone Sanctuary',
    category: 'Villa',
    location: 'Mexico / Quintana Roo / Tulum',
    region: 'Mexico',
    price: 2950000,
    areaSqm: 340,
    floors: 1,
    bedrooms: 4,
    bathrooms: 4,
    architect: 'Taller Verde',
    yearBuilt: 2025,
    image: '/src/assets/images/prop_tulum_retreat_1794900076188.jpg',
    summary:
      'Hand-carved Yucatan limestone residence centered around a tranquil reflection pool and sunken fire lounge, blurring indoor living with tropical canopy.',
    highlights: [
      'Local chukum plaster walls and tzalam hardwood ceilings',
      'Sunken travertine courtyard fire lounge',
      '24/7 private estate concierge and security',
    ],
  },
  {
    id: 'skyline-penthouse',
    title: 'Tribeca Glass Penthouse',
    category: 'Penthouse',
    location: 'USA / New York / Manhattan',
    region: 'New York',
    price: 6400000,
    areaSqm: 365,
    floors: 2,
    bedrooms: 3,
    bathrooms: 4,
    architect: 'Alder & Stone',
    yearBuilt: 2026,
    image: '/src/assets/images/prop_skyline_penthouse_1794900076128.jpg',
    summary:
      'Double-height full-floor penthouse featuring 22-foot curtain-wall glass, honed Roman travertine hearth, private keyed elevator, and wrap-around skyline loggia.',
    highlights: [
      'Private rooftop terrace with outdoor kitchen',
      'White-oak herringbone floors with acoustic underlay',
      'Direct private elevator lobby and 24-hour doorman',
    ],
  },
];

export const HERO_IMAGE = '/src/assets/images/hero_modern_residence_1794900073608.jpg';
export const ABOUT_IMAGE = '/src/assets/images/about_architectural_detail_1794900076939.jpg';
export const ADVISOR_IMAGE = '/src/assets/images/advisor_marcus_lee_1794900076991.jpg';
