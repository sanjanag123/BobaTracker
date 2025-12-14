export interface BobaEntry {
  id: string;
  date: string; // ISO date string
  shop: string;
  drink: string;
  sweetnessLevel: number; // 0-100
  toppings: string[];
  price: number;
  rating: number; // 1-5 stars
  notes?: string;
}

export type Mode = 'nice' | 'sassy';

