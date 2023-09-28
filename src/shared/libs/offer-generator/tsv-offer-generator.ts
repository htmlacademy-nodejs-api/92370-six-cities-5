import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import {
  CityType,
  OfferType,
  mockOffer,
  ServicesType,
  CoordinatesType,
} from '../../types/index.js';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../helpers/index.js';

const MIN_PRICE = 100;
const MAX_PRICE = 10000;

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOM = 1;
const MAX_ROOM = 8;

const MIN_QUEST = 1;
const MAX_QUEST = 10;

const MIN_AUTHOR_ID = 1;
const MAX_AUTHOR_ID = 5;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: mockOffer) {}

  public generate(): string {
    const titles = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const citys = getRandomItem<CityType>(this.mockData.citys);
    const preview = getRandomItem<string>(this.mockData.photos);
    const photos = getRandomItems<string>(this.mockData.photos);
    const isPremium = getRandomItem<boolean>(this.mockData.isPremium);
    const isFavorite = getRandomItem<boolean>(this.mockData.isFavorite);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const type = getRandomItem<OfferType>(this.mockData.type);
    const rooms = generateRandomValue(MIN_ROOM, MAX_ROOM).toString();
    const guests = generateRandomValue(MIN_QUEST, MAX_QUEST).toString();
    const cost = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const services = getRandomItems<ServicesType>(this.mockData.services);
    const author = generateRandomValue(MIN_AUTHOR_ID, MAX_AUTHOR_ID).toString();
    const comments = 3;
    const coordinates = JSON.stringify(getRandomItem<CoordinatesType>(
      this.mockData.coordinates
    ));

    return [
      titles,
      description,
      postDate,
      citys,
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
    ].join('\t');
  }
}
