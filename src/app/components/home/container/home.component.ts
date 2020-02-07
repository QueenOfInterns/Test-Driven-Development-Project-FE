import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { ViewMode } from '../../../models/view-mode.model';
import { HomeListComponent } from '../home-list/home-list.component';
import { HomeDetailsComponent } from '../home-details/home-details.component';
import { HomeFormComponent } from '../home-form/home-form.component';
import { Book } from '../../../models/book.model';
import { SaveBook } from 'app/models/saveBook.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  @ViewChild(HomeListComponent, { static: true })
  homeList: HomeListComponent;
  @ViewChild(HomeDetailsComponent, { static: false })
  homeDetails: HomeDetailsComponent;
  @ViewChild(HomeFormComponent, { static: false })
  homeForm: HomeFormComponent;

  viewMode: ViewMode;
  books: Book[];
  selectedBook: Book;

  constructor() {}

  ngOnInit(): void {
    throw new Error('Not yet implemented!');
  }

  fetchBooks(): void {
    throw new Error('Not yet implemented!');
  }

  selectBook(book: Book): void {
    throw new Error('Not yet implemented!');
  }

  viewModeChanged(viewMode: ViewMode): void {
    throw new Error('Not yet implemented!');
  }

  addBook(): void {
    throw new Error('Not yet implemented!');
  }

  saveBook(payload: SaveBook): void {
    throw new Error('Not yet implemented!');
  }

  get detailsEnabled(): boolean {
    throw new Error('Not yet implemented!');
  }
  get formEnabled(): boolean {
    throw new Error('Not yet implemented!');
  }
}
