import { Component, OnInit, EventEmitter } from '@angular/core';
import { Book } from '../../../models/book.model';
import { InputTextEvent } from '../../../models/inputTextEvent.model';
import { ViewMode } from '../../../models/view-mode.model';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html'
})
export class HomeListComponent implements OnInit {
  // These values will be pulled from a parent component
  books: Book[];
  viewMode: ViewMode;

  // This value will push to a parent component
  selectBook: EventEmitter<Book>;

  book: Book;
  filterText: string;

  constructor() {}

  ngOnInit() {}

  get filteredBooks(): Book[] {
    throw new Error('Not yet implemented!');
  }

  onSearch(search: InputTextEvent): void {
    throw new Error('Not yet implemented!');
  }

  onSelectBook(): void {
    throw new Error('Not yet implemented!');
  }

  get canSearch(): boolean {
    throw new Error('Not yet implemented!');
  }
}
