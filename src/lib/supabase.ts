import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set with valid values.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string;
          title: string;
          location: string;
          price: number;
          bedrooms: number;
          bathrooms: number;
          area: number;
          type: 'villa' | 'apartment' | 'penthouse' | 'house';
          description: string;
          images: string[];
          featured: boolean;
          region: string;
          amenities: string[];
          coordinates: {
            lat: number;
            lng: number;
          };
          is_sold: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          location: string;
          price: number;
          bedrooms: number;
          bathrooms: number;
          area: number;
          type: 'villa' | 'apartment' | 'penthouse' | 'house';
          description: string;
          images: string[];
          featured?: boolean;
          region: string;
          amenities: string[];
          coordinates: {
            lat: number;
            lng: number;
          };
          is_sold?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          location?: string;
          price?: number;
          bedrooms?: number;
          bathrooms?: number;
          area?: number;
          type?: 'villa' | 'apartment' | 'penthouse' | 'house';
          description?: string;
          images?: string[];
          featured?: boolean;
          region?: string;
          amenities?: string[];
          coordinates?: {
            lat: number;
            lng: number;
          };
          is_sold?: boolean;
          updated_at?: string;
        };
      };
    };
  };
};