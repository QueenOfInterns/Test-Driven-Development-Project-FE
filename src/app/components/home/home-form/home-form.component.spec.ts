import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HomeFormComponent } from './home-form.component';
import { ViewMode } from '../../../models/view-mode.model';

describe('HomeFormComponent', () => {
  let component: HomeFormComponent;
  let fixture: ComponentFixture<HomeFormComponent>;
  let domElement: any;

  const findNodeByFormName = (formControlName: string) =>
    domElement
      ? Array.from(domElement.querySelectorAll('input') as NodeList).find(
          n =>
            (n as Element).getAttribute('formcontrolname') === formControlName
        )
      : null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [HomeFormComponent],
      providers: [FormBuilder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFormComponent);
    component = fixture.componentInstance;
    component.viewMode = ViewMode.Edit;
    component.book = {
      id: 0,
      title: 'title',
      author: 'author',
      genre: 'genre',
      publisher: 'publisher'
    };
    fixture.detectChanges();
    domElement = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define a formGroup', () => {
    expect(component.homeForm).toBeTruthy();
  });

  it('should have a form with a form group', () => {
    const form: HTMLElement = domElement.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('should have a p-panel', () => {
    const pPanel: Element = fixture.debugElement.nativeElement.querySelector(
      'p-panel'
    );
    expect(pPanel).toBeTruthy();
  });

  it('should have a p-header with "add book" or "edit book"', () => {
    const pHeader: Element = fixture.debugElement.nativeElement.querySelector(
      'p-header'
    );
    expect(pHeader).toBeTruthy();
    component.viewMode = ViewMode.Edit;
    expect(pHeader.textContent.trim()).toEqual('Edit Book');
    component.viewMode = ViewMode.Add;
    fixture.detectChanges();
    expect(pHeader.textContent.trim()).toEqual('Add Book');
  });

  it('should have 4 inputs (using pInputText) on the form', () => {
    const inputs: NodeList = domElement.querySelectorAll('input');
    expect(inputs).toBeTruthy();
    expect(inputs.length).toEqual(4);
    let fields = ['Title', 'Author', 'Genre', 'Publisher'];
    inputs.forEach(node => {
      const placeholder = (node as Element).getAttribute('placeholder');
      expect((node as Element).getAttribute('pInputText')).not.toBeNull();
      expect(placeholder).not.toBeNull();
      expect(fields).toContain(placeholder);
      fields = fields.filter(field => field !== placeholder);
    });
  });

  it('should have a title input', () => {
    expect(findNodeByFormName('title')).toBeTruthy();
  });

  it('should have a author input', () => {
    expect(findNodeByFormName('author')).toBeTruthy();
  });

  it('should have a title input', () => {
    expect(findNodeByFormName('genre')).toBeTruthy();
  });

  it('should have a title input', () => {
    expect(findNodeByFormName('publisher')).toBeTruthy();
  });

  it('should have title, author, publisher, and genre on formGroup', () => {
    expect(component.homeForm.controls.title).toBeTruthy();
    expect(component.homeForm.controls.author).toBeTruthy();
    expect(component.homeForm.controls.publisher).toBeTruthy();
    expect(component.homeForm.controls.genre).toBeTruthy();
  });

  it('should have 2 buttons (using pButton) on the form', () => {
    const inputs: NodeList = domElement.querySelectorAll('button');
    expect(inputs).toBeTruthy();
    expect(inputs.length).toEqual(2);
  });

  it('should have a save label and a cancel label', () => {
    const inputs: NodeList = domElement.querySelectorAll('button');
    let names = ['Save', 'Cancel'];
    inputs.forEach(node => {
      expect((node as Element).getAttribute('pButton')).not.toBeNull();
      expect(names).toContain(node.firstChild.textContent.trim());
      names = names.filter(name => name !== node.firstChild.textContent.trim());
    });
    expect(names.length).toBe(0);
  });

  it('should correctly select payload type', () => {
    component.book.id = 0;
    expect(component.constructPayload().type).toEqual('save');
    component.book.id = 1;
    expect(component.constructPayload().type).toEqual('update');
  });

  it('should correctly detect if the form has been altered when updating a book', () => {
    expect(component.isDifferent).toEqual(false);
    component.homeForm.controls.title.setValue('new title');
    expect(component.isDifferent).toEqual(true);
  });

  it('should emit a new view mode on cancel click', () => {
    const spy = spyOn(component.viewModeChange, 'emit');
    component.onCancelClick();
    expect(spy).toHaveBeenCalledWith(ViewMode.Table);
  });

  it('should validate form on save click', () => {
    component.homeForm.patchValue({
      title: '',
      author: '',
      genre: '',
      publisher: ''
    });
    const titleSpy = spyOn(component.homeForm.controls.title, 'markAsDirty');
    const authorSpy = spyOn(component.homeForm.controls.author, 'markAsDirty');
    const genreSpy = spyOn(component.homeForm.controls.genre, 'markAsDirty');
    const publisherSpy = spyOn(
      component.homeForm.controls.publisher,
      'markAsDirty'
    );
    component.onSaveClick();
    expect(titleSpy).toHaveBeenCalled();
    expect(authorSpy).toHaveBeenCalled();
    expect(genreSpy).toHaveBeenCalled();
    expect(publisherSpy).toHaveBeenCalled();
  });

  it('should emit a new view mode if the form is valid on save click', () => {
    component.homeForm.patchValue({
      title: 'new title',
      author: 'new author',
      genre: 'new genre',
      publisher: 'new publisher'
    });
    const spy = spyOn(component.viewModeChange, 'emit');
    const spySave = spyOn(component.saveBook, 'emit');
    component.onSaveClick();
    expect(spy).toHaveBeenCalledWith(ViewMode.Table);
    expect(spySave).toHaveBeenCalledWith({
      type: 'save',
      book: component.homeForm.value
    });
  });

  it('should not call emit a save book on save if the book is the same as before', () => {
    const spy = spyOn(component.viewModeChange, 'emit');
    const spySave = spyOn(component.saveBook, 'emit');
    component.onSaveClick();
    expect(spy).toHaveBeenCalledWith(ViewMode.Table);
    expect(spySave).not.toHaveBeenCalled();
  });
});
