import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { BookService } from '../../../services/book/book.service';
import { ViewMode } from '../../../models/view-mode.model';
import { HomeListStubComponent } from '../../../models/stubs/home-list.stub';
import { HomeDetailsStubComponent } from '../../../models/stubs/home-details.stub';
import { HomeFormStubComponent } from '../../../models/stubs/home-form.stub';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const bookService = jasmine.createSpyObj<BookService>('bookService', [
    'addBook',
    'getBooks',
    'updateBook',
    'deleteBook'
  ]);
  const book = {
    id: 0,
    title: 'title',
    author: 'author',
    genre: 'genre',
    publisher: 'publisher'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        HomeListStubComponent,
        HomeDetailsStubComponent,
        HomeFormStubComponent
      ],
      providers: [{ provide: BookService, useValue: bookService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    bookService.getBooks.and.returnValue(of([]));
    bookService.addBook.and.returnValue(of(book));
    bookService.updateBook.and.returnValue(of(book));
    bookService.deleteBook.and.returnValue(of());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the books in on init', () => {
    expect(bookService.getBooks).toHaveBeenCalled();
  });

  it('should have books as title of panel', () => {
    const pPanel: Element = fixture.debugElement.nativeElement.querySelector(
      'p-panel'
    );
    expect(pPanel).toBeTruthy();
    if (pPanel.getAttribute('header')) {
      expect(pPanel.getAttribute('header')).toEqual('Books');
    } else {
      const pHeader: Element = fixture.debugElement.nativeElement.querySelector(
        'p-header'
      );
      expect(pHeader).toBeTruthy();
      expect(pHeader.textContent.trim()).toEqual('Books');
    }
  });

  it('should have a view mode', () => {
    expect(component.viewMode).toEqual(ViewMode.Table);
  });

  it('should always render the table', () => {
    expect(component.homeList).toBeTruthy();
  });

  it('should show details if view mode is details', () => {
    component.viewMode = ViewMode.Details;
    fixture.detectChanges();
    expect(component.homeDetails).toBeTruthy();

    component.viewMode = ViewMode.Add;
    fixture.detectChanges();
    expect(component.homeDetails).toBeFalsy();
  });

  it('should show form if view mode is add or edit', () => {
    component.viewMode = ViewMode.Edit;
    fixture.detectChanges();
    expect(component.homeForm).toBeTruthy();

    component.viewMode = ViewMode.Add;
    fixture.detectChanges();
    expect(component.homeForm).toBeTruthy();

    component.viewMode = ViewMode.Table;
    fixture.detectChanges();
    expect(component.homeForm).toBeFalsy();
  });

  it('should compute if details is enabled', () => {
    component.viewMode = ViewMode.Details;
    expect(component.detailsEnabled).toEqual(true);
    component.viewMode = ViewMode.Table;
    expect(component.detailsEnabled).toEqual(false);
  });

  it('should compute if form is enabled', () => {
    component.viewMode = ViewMode.Edit;
    expect(component.formEnabled).toEqual(true);
    component.viewMode = ViewMode.Add;
    expect(component.formEnabled).toEqual(true);
    component.viewMode = ViewMode.Table;
    expect(component.formEnabled).toEqual(false);
  });

  it('should select a book on selectBook', () => {
    component.selectBook(book);
    expect(component.selectedBook).toBe(book);
  });

  it('should change the view mode to details when you select a book', () => {
    component.selectBook(book);
    expect(component.viewMode).toEqual(ViewMode.Details);
  });

  it('should change the view mode on viewModeChanged', () => {
    component.viewMode = ViewMode.Table;
    component.viewModeChanged(ViewMode.Edit);
    expect(component.viewMode).toEqual(ViewMode.Edit);

    component.viewModeChanged(ViewMode.Add);
    expect(component.viewMode).toEqual(ViewMode.Add);

    component.viewModeChanged(ViewMode.Details);
    expect(component.viewMode).toEqual(ViewMode.Details);
  });

  it('should set up a book and change view mode to add on addBook', () => {
    component.viewMode = ViewMode.Details;
    component.selectedBook = null;
    component.addBook();
    expect(component.viewMode).toEqual(ViewMode.Add);
    expect(component.selectedBook).toEqual({
      id: 0,
      title: '',
      author: '',
      genre: '',
      publisher: ''
    });
  });

  it('should save a new book on saveBook when passed "save"', () => {
    component.saveBook({ type: 'save', book });
    expect(bookService.addBook).toHaveBeenCalledWith(book);
  });

  it('should re-fetch all of the books on saveBook', () => {
    bookService.getBooks.calls.reset();
    component.books = [{ ...book }, { ...book }];
    component.saveBook({ type: 'save', book });
    component.saveBook({ type: 'update', book });
    expect(bookService.getBooks).toHaveBeenCalledTimes(2);
    expect(component.books.length).not.toEqual(2);
  });

  it('should update a book on saveBook when passed "update"', () => {
    component.saveBook({ type: 'update', book });
    expect(bookService.updateBook).toHaveBeenCalledWith(book);
  });
});
