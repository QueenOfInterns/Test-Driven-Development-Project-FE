import { Book } from './book.model';

export interface Payload {
  type: 'save' | 'update';
  book: Book;
}
