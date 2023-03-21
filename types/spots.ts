export interface Spots {
  [key: string]: Spot;
}

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
  type: 'bar' | 'restaurant' | 'activity';
  food?: 'pizza' | 'iceCream' | 'burgers'[];
  tags?: string[];
  atmosphere: string[];
  promoted: boolean;
  highlighted: boolean;
  affiliatedLink?: string;
  createdAt: number;
  updatedAt: number;
}
