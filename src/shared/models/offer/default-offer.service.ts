import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { UpdateFavoriteOfferDto } from './dto/update-favorite-offer.dto.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(
    authorId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(authorId).populate(['authorId']).exec();
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find().populate(['authorId']).exec();
  }

  public async deleteById(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate(['authorId'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }

  public async findPremium(
    count: number
  ): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ ['isPremium']: true })
      .sort({ commentCount: SortType.Down })
      .limit(count)
      .populate(['authorId'])
      .exec();
  }

  public async findFavorite(
    count: number
  ): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ ['isFavorite']: true })
      .sort({ commentCount: SortType.Down })
      .limit(count)
      .populate(['authorId'])
      .exec();
  }

  public async addToFavorite(
    offerId: string,
    dto: UpdateFavoriteOfferDto
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate(['authorId'])
      .exec();
  }
}
