import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
} from '@typegoose/typegoose';
import { Author, AuthorType } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface AuthorEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'author',
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class AuthorEntity extends defaultClasses.TimeStamps implements Author {
  @prop({ required: true, default: '' })
  public name = '';

  @prop({ unique: true, required: true })
  public email = '';

  @prop({ required: false, default: '' })
  public avatar = '';

  @prop({ required: true, default: '' })
  public password = '';

  public type = AuthorType.regular;

  constructor(authorData: Author) {
    super();

    this.email = authorData.email;
    this.avatar = authorData.avatar || '';
    this.name = authorData.name;
    this.type = authorData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const AuthorModel = getModelForClass(AuthorEntity);
