import { AuthorType } from './author.enum.js';

export type Author = {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  type: AuthorType;
}
