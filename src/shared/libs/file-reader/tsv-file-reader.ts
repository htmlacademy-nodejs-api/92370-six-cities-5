import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, OfferType } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
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
      ]) => ({
        title,
        description,
        postDate: new Date(createdDate),
        city,
        preview,
        photos: photos.split(';'),
        isPremium: Boolean(isPremium),
        isFavorite: Boolean(isFavorite),
        rating: Number.parseInt(rating, 10),
        type: OfferType[type as 'apartment' | 'house' | 'room' | 'hotel'],
        rooms: Number.parseInt(rooms, 10),
        guests: Number.parseInt(guests, 10),
        cost: Number.parseInt(cost, 10),
        services: services.split(';'),
        author,
        comments: Number.parseInt(comments, 10),
        coordinates: [coordinates.split(';')[0], coordinates.split(';')[1]]
      }));
  }
}
