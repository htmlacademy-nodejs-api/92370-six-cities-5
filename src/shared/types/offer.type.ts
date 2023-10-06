import {
  OfferType,
  CityType,
  ServicesType,
  CoordinatesType,
  Author,
} from './index.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: CityType;
  preview: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  rooms: number;
  guests: number;
  cost: number;
  services: ServicesType[];
  author: Author;
  comments: number;
  coordinates: CoordinatesType;
};
