import { Component, EventEmitter } from '@angular/core';
import { Book } from 'app/models/book.model';
import { ViewMode } from 'app/models/view-mode.model';

@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.component.html'
})
export class HomeDetailsComponent {
  // This value will be pulled from a parent component
  book: Book;

  // This value will push to a parent component
  viewMode: EventEmitter<ViewMode> = new EventEmitter();

  onEditClick(): void {
    throw new Error('Not yet implemented!');
  }

  onCancelClick(): void {
    throw new Error('Not yet implemented!');
  }
}
