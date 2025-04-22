export interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  description: string;
  beds: number;
  baths: number;
  squareFeet: number;
  propertyType: 'house' | 'apartment' | 'condo' | 'townhouse' | 'land';
  yearBuilt: number;
  features: string[];
  images: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
  latitude: number;
  longitude: number;
}

export interface FilterOptions {
  propertyType: string[];
  priceMin: number;
  priceMax: number;
  bedsMin: number;
  bathsMin: number;
  squareFeetMin: number;
  squareFeetMax: number;
  searchTerm: string;
}

export type ViewMode = 'grid' | 'list' | 'map';
export type SortOption = 'newest' | 'price-asc' | 'price-desc';