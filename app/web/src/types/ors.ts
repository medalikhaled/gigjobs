export interface ORSResponse {
  geocoding: Geocoding;
  type: string;
  features: Feature[];
  bbox: number[];
}
interface Geocoding {
  version: string;
  attribution: string;
  query: Query;
  engine: Engine;
  timestamp: number;
}

interface Query {}

interface Engine {
  name: string;
  author: string;
  version: string;
}

interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
  bbox?: number[];
}

interface Geometry {
  type: string;
  coordinates: number[];
}

interface Properties {
  id?: string;
  gid?: string;
  layer?: string;
  source?: string;
  source_id?: string;
  name?: string;
  street?: string;
  confidence?: number;
  distance?: number;
  accuracy?: string;
  country?: string;
  country_gid?: string;
  country_a?: string;
  region?: string;
  region_gid?: string;
  region_a?: string;
  county?: string;
  county_gid?: string;
  county_a?: string;
  continent?: string;
  continent_gid?: string;
  label?: string;
  locality?: string;
  locality_gid?: string;
  addendum?: Addendum;
}

interface Addendum {
  osm: Osm;
}

interface Osm {
  phone: string;
}
