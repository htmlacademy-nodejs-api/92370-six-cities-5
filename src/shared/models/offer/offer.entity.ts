import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { CityType, CoordinatesType, OfferType, ServicesType } from '../../types/index.js';
import { AuthorEntity } from '../author/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true })
  public description!: string;

  @prop()
  public postDate!: Date;

  @prop({
    type: () => String,
    enum: OfferType,
  })
  public type!: OfferType;

  @prop({ default: 0 })
  public comments!: number;

  @prop({
    ref: AuthorEntity,
    required: true,
  })
  public authorId!: Ref<AuthorEntity>;
  
  @prop({
    type: () => String,
    enum: CityType,
  })
  public city!: CityType;

  @prop()
  public preview!: string;

  @prop()
  public photos!: string[];

  @prop()
  public isPremium!: boolean;

  @prop()
  public isFavorite!: boolean;

  @prop()
  public rating!: number;

  @prop()
  public rooms!: number;

  @prop()
  public guests!: number;

  @prop()
  public cost!: number;

  @prop()
  public services!: ServicesType[];

  @prop()
  public coordinates!: CoordinatesType;
}

export const OfferModel = getModelForClass(OfferEntity);
