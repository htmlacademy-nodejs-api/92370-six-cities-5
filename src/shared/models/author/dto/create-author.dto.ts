import { AuthorType } from '../../../types/index.js';

export class CreateAuthorDto {
  public name: string;
  public email: string;
  public avatar?: string;
  public password: string;
  public type: AuthorType;
}
