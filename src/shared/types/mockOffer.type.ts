import { OfferType, CityType, ServicesType, CoordinatesType } from './index.js';

export type mockOffer = {
    titles: string[];
    descriptions: string[];
    citys: CityType[];
    photos: string[];
    services: ServicesType[];
    type: OfferType[];
    coordinates: CoordinatesType[];
    isPremium: boolean[];
    isFavorite: boolean[];
}