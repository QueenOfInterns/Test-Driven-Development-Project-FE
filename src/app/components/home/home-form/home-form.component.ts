import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Book } from 'app/models/book.model';
import { ViewMode } from 'app/models/view-mode.model';
import { Payload } from 'app/models/savePayload.model';

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html'
})
export class HomeFormComponent implements OnInit {
  // These values will be pulled from a parent component
  viewMode: 'Add' | 'Edit';
  book: Book;

  // These values will push to a parent component
  viewModeChange: EventEmitter<ViewMode>;
  saveBook: EventEmitter<Payload>;

  homeForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    throw new Error('Not yet implemented!');
  }

  onSaveClick(): void {
    throw new Error('Not yet implemented!');
  }

  constructPayload(): Payload {
    throw new Error('Not yet implemented!');
  }

  onCancelClick(): void {
    throw new Error('Not yet implemented!');
  }

  get isDifferent(): boolean {
    throw new Error('Not yet implemented!');
  }
}
