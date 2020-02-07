import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor() {}

  addBook(book: Book): Observable<Book> {
    throw new Error('Not yet implemented!');
  }

  deleteBook(id: string | number): Observable<never> {
    throw new Error('Not yet implemented!');
  }

  updateBook(book: Book): Observable<Book> {
    throw new Error('Not yet implemented!');
  }

  getBooks(): Observable<Book[]> {
    throw new Error('Not yet implemented!');
  }
}
