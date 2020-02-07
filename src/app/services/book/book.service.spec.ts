import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { BookService } from './book.service';
import { Book } from '../../models/book.model';

describe('BookService', () => {
  let service: BookService;
  let http: HttpTestingController;
  const mocks = require('assets/mocks/books.json');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(BookService);
    http = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all books', () => {
    service.getBooks().subscribe(books => {
      expect(books).toEqual(mocks);
    });

    const request = http.expectOne('http://localhost:8080/');
    expect(request.request.method).toEqual('GET');
    request.flush(mocks);
  });

  it('should add a book', () => {
    const book: Book = {
      id: 0,
      title: '',
      author: '',
      publisher: '',
      genre: ''
    };
    service
      .addBook(book)
      .subscribe(returnBook => expect(returnBook).toEqual(book));

    const request = http.expectOne('http://localhost:8080/');
    expect(request.request.method).toEqual('POST');
    request.flush(book);
  });

  it('should remove a book', () => {
    const bookId = 3;
    service.deleteBook(bookId).subscribe();

    const request = http.expectOne(`http://localhost:8080/${bookId}`);
    expect(request.request.method).toEqual('DELETE');
    request.flush('');
  });

  it('should update a book', () => {
    const book: Book = {
      id: 0,
      title: '',
      author: '',
      publisher: '',
      genre: ''
    };
    service
      .updateBook(book)
      .subscribe(returnBook => expect(returnBook).toEqual(book));

    const request = http.expectOne('http://localhost:8080/');
    expect(request.request.method).toEqual('PUT');
    request.flush(book);
  });
});
