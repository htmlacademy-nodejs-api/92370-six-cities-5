import { CityType, Offer, OfferType, ServicesType } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    createdDate,
    city,
    preview,
    photos,
    isPremium,
    isFavorite,
    rating,
    type,
    rooms,
    guests,
    cost,
    services,
    author,
    comments,
    coordinates,
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    postDate: new Date(createdDate),
    city: city as CityType,
    preview,
    photos: photos.split(';'),
    isPremium: Boolean(isPremium),
    isFavorite: Boolean(isFavorite),
    rating: Number.parseInt(rating, 10),
    type: type as OfferType,
    rooms: Number.parseInt(rooms, 10),
    guests: Number.parseInt(guests, 10),
    cost: Number.parseInt(cost, 10),
    services: services.split(';') as ServicesType[],
    author,
    comments: Number.parseInt(comments, 10),
    coordinates: {
      latitude: coordinates.split(';')[0],
      longitude: coordinates.split(';')[1],
    },
  };
}
