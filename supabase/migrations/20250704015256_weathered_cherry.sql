/*
  # Create properties table for Laura Alba Real Estate

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text, property title)
      - `location` (text, property location)
      - `price` (bigint, property price in USD)
      - `bedrooms` (integer, number of bedrooms)
      - `bathrooms` (integer, number of bathrooms)
      - `area` (integer, area in square meters)
      - `type` (text, property type: villa, apartment, penthouse, house)
      - `description` (text, property description)
      - `images` (text array, image URLs)
      - `featured` (boolean, is featured property)
      - `region` (text, property region)
      - `amenities` (text array, property amenities)
      - `coordinates` (jsonb, lat/lng coordinates)
      - `is_sold` (boolean, is property sold)
      - `created_at` (timestamptz, creation timestamp)
      - `updated_at` (timestamptz, last update timestamp)

  2. Security
    - Enable RLS on `properties` table
    - Add policy for authenticated users (admin) to manage all properties
    - Add policy for public users to read available properties only
*/

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  location text NOT NULL,
  price bigint NOT NULL,
  bedrooms integer NOT NULL,
  bathrooms integer NOT NULL,
  area integer NOT NULL,
  type text NOT NULL CHECK (type IN ('villa', 'apartment', 'penthouse', 'house')),
  description text NOT NULL,
  images text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  region text NOT NULL,
  amenities text[] DEFAULT '{}',
  coordinates jsonb NOT NULL DEFAULT '{"lat": 18.7357, "lng": -70.1627}',
  is_sold boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admin)
CREATE POLICY "Admin can do everything" ON properties
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policy for public read access (only available properties)
CREATE POLICY "Public can read available properties" ON properties
  FOR SELECT TO anon
  USING (NOT is_sold);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_properties_updated_at 
    BEFORE UPDATE ON properties 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO properties (
  title, location, price, bedrooms, bathrooms, area, type, description, 
  images, featured, region, amenities, coordinates
) VALUES 
(
  'Villa Serena Oceanfront',
  'Punta Cana',
  2500000,
  5,
  6,
  450,
  'villa',
  'Una villa excepcional frente al mar que combina elegancia contemporánea con la tranquilidad del Caribe. Espacios abiertos, materiales naturales y vistas infinitas del océano.',
  ARRAY[
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ],
  true,
  'Este',
  ARRAY['Piscina infinita', 'Acceso directo a la playa', 'Terraza con vista al mar', 'Cocina gourmet', 'Jardín tropical'],
  '{"lat": 18.5601, "lng": -68.3725}'
),
(
  'Penthouse Moderno Centro',
  'Santo Domingo',
  850000,
  3,
  3,
  200,
  'penthouse',
  'Penthouse contemporáneo en el corazón de la capital. Diseño minimalista con acabados de lujo y vistas panorámicas de la ciudad colonial.',
  ARRAY[
    'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2029721/pexels-photo-2029721.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ],
  true,
  'Distrito Nacional',
  ARRAY['Terraza privada', 'Gimnasio', 'Concierge', 'Estacionamiento', 'Seguridad 24/7'],
  '{"lat": 18.4861, "lng": -69.9312}'
),
(
  'Casa Colonial Restaurada',
  'Zona Colonial',
  1200000,
  4,
  4,
  300,
  'house',
  'Encantadora casa colonial cuidadosamente restaurada que preserva su arquitectura histórica mientras ofrece todas las comodidades modernas.',
  ARRAY[
    'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ],
  true,
  'Distrito Nacional',
  ARRAY['Patio interior', 'Techos altos', 'Detalles originales', 'Cocina moderna', 'Ubicación histórica'],
  '{"lat": 18.4734, "lng": -69.8849}'
);