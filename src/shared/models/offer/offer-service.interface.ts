import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { UpdateFavoriteOfferDto } from './dto/update-favorite-offer.dto.js';


export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(authorId: string): Promise<DocumentType<OfferEntity> | null>;
  find(): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  findPremium(count: number): Promise<DocumentType<OfferEntity>[]>;
  findFavorite(count: number): Promise<DocumentType<OfferEntity>[]>;
  exists(documentId: string): Promise<boolean>;
  addToFavorite(offerId: string, dto: UpdateFavoriteOfferDto): Promise<DocumentType<OfferEntity> | null>;
}
