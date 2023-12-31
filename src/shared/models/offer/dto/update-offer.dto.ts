import {
  OfferType,
  CityType,
  ServicesType,
  CoordinatesType,
  Author,
} from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public city?: CityType;
  public preview?: string;
  public photos?: string[];
  public isPremium?: boolean;
  public rating?: number;
  public type?: OfferType;
  public rooms?: number;
  public guests?: number;
  public cost?: number;
  public services?: ServicesType[];
  public author?: Author;
  public coordinates?: CoordinatesType;
}
