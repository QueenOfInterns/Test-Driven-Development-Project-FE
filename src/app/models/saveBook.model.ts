import { Book } from './book.model';

type SaveType = 'save' | 'update';
export interface SaveBook {
  type: SaveType;
  book: Book;
}
