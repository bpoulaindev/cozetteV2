export interface Spots {
  [key: string]: Spot;
}

export type FoodType =
  | 'cafe'
  | 'icecream'
  | 'burger'
  | 'cocktail'
  | 'ramen'
  | 'pizza'
  | 'beer'
  | 'bakery'
  | 'wine'
  | 'dining';

export type ActivitiesType =
  | 'sports'
  | 'games'
  | 'animals'
  | 'theater'
  | 'activities'
  | 'relaxed'
  | 'museum'
  | 'music'
  | 'cinema'
  | 'LGBTQIA+'
  | 'nature'
  | 'party';

export interface Spot {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  images: {
    [key: string]: string;
  };
  details: {
    name: string;
    address: string;
    description: string;
    email: string;
    phone: string;
    website: string;
  };
  placeId?: string;
  type: 'bar' | 'restaurant' | 'activity';
  food?: Array<FoodType>;
  activities?: Array<ActivitiesType>;
  ranking?: number;
  features?: Array<'disabled' | 'ecology' | 'family'>;
  tags?: string[];
  atmosphere: string[];
  promoted: boolean;
  highlighted: boolean;
  affiliatedLink?: string;
  createdAt: number;
  updatedAt: number;
}
