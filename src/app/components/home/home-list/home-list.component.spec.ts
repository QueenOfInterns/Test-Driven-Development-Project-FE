import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeListComponent } from './home-list.component';
import { TableModule } from 'primeng/table';
import { Book } from 'app/models/book.model';
import { FormsModule } from '@angular/forms';
import { ViewMode } from 'app/models/view-mode.model';

describe('HomeListComponent', () => {
  let component: HomeListComponent;
  let fixture: ComponentFixture<HomeListComponent>;
  const books: Book[] = require('assets/mocks/books.json');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TableModule, FormsModule],
      declarations: [HomeListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeListComponent);
    component = fixture.componentInstance;
    component.books = books;
    component.book = books[0];
    fixture.detectChanges();
  });

  const convertBookToArray = (book: Book) => {
    return [book.author, book.genre, book.publisher, book.title]
      .map(i => i.toLowerCase())
      .sort((a, b) => a.localeCompare(b));
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a p-table', () => {
    const pPanel: Element = fixture.debugElement.nativeElement.querySelector(
      'p-table'
    );
    expect(pPanel).toBeTruthy();
  });

  it('have a ng-template caption with the text "All Books"', () => {
    const caption: Element = fixture.debugElement.nativeElement.querySelector(
      '.ui-table-caption, .ui-widget-header'
    );
    expect(caption).toBeTruthy();
    expect(caption.textContent.trim().toLowerCase()).toEqual('all books');
  });

  it('have a textbox inside of the caption', () => {
    const caption: Element = fixture.debugElement.nativeElement.querySelector(
      '.ui-table-caption, .ui-widget-header'
    );
    expect(caption).toBeTruthy();
    expect(caption.querySelector('input[type="text"]')).toBeTruthy();
  });

  it('have a ng-template header', () => {
    const header: Element = fixture.debugElement.nativeElement.querySelector(
      '.ui-table-thead'
    );
    expect(header).toBeTruthy();
  });

  it('should have a tr in the header', () => {
    const header: Element = fixture.debugElement.nativeElement.querySelector(
      '.ui-table-thead'
    );
    expect(header.querySelector('tr')).toBeTruthy();
  });

  it('should have 4 ths inside of the tr inside of the header', () => {
    const tr: Element = fixture.debugElement.nativeElement
      .querySelector('.ui-table-thead')
      .querySelector('tr');
    const children = Array.from(tr.childNodes);

    expect(children.length).toEqual(4);

    expect(
      children
        .map(node => (node as Element).textContent.trim().toLowerCase())
        .sort((a, b) => a.localeCompare(b))
    ).toEqual(['author', 'genre', 'publisher', 'title']);

    for (const childType of children.map(n => (n as Element).nodeName)) {
      expect(childType.toLowerCase()).toEqual('th');
    }
  });

  it('have a ng-template body', () => {
    const body: Element = fixture.debugElement.nativeElement.querySelector(
      '.ui-table-tbody'
    );
    expect(body).toBeTruthy();
  });

  it('should have a tr in the body for each book', () => {
    const body: Element = fixture.debugElement.nativeElement.querySelector(
      '.ui-table-tbody'
    );
    expect(body.querySelectorAll('tr').length).toEqual(books.length);
  });

  it('should have 4 tds inside of each tr', () => {
    const trs: Element[] = fixture.debugElement.nativeElement
      .querySelector('.ui-table-tbody')
      .querySelectorAll('tr');
    for (let i = 0; i < trs.length; ++i) {
      const each = trs[i];
      const children = Array.from(each.childNodes);

      expect(children.length).toEqual(4);

      expect(
        children
          .map(node => (node as Element).textContent.trim().toLowerCase())
          .sort((a, b) => a.localeCompare(b))
      ).toEqual(convertBookToArray(books[i]));

      for (const childType of children.map(n => (n as Element).nodeName)) {
        expect(childType.toLowerCase()).toEqual('td');
      }
    }
  });

  it('should correctly get the filtered out books', () => {
    component.filterText = 'harry';
    expect(component.filteredBooks.length).toEqual(1);
    component.filterText = 'fiction';
    expect(component.filteredBooks.length).toEqual(2);
    component.filterText = 'NG'; // ng in Rowling and ng in Hemingway
    expect(component.filteredBooks.length).toEqual(2);
    component.filterText = '';
    expect(component.filteredBooks.length).toEqual(3);
  });

  it('should only change the filter text in on search when it can search', () => {
    component.viewMode = ViewMode.Table;
    component.onSearch({ target: { value: 'search text' } });
    expect(component.filterText).toEqual('search text');
    component.viewMode = ViewMode.Details;
    component.onSearch({ target: { value: '' } });
    expect(component.filterText).not.toEqual('');
    expect(component.filterText).toEqual('search text');
  });

  it('should emit select book on select book', () => {
    const spy = spyOn(component.selectBook, 'emit');
    component.onSelectBook();
    expect(spy).toHaveBeenCalledWith(component.book);
  });
});
