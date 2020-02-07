import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeDetailsComponent } from './home-details.component';
import { ViewMode } from '../../../models/view-mode.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HomeDetailsComponent', () => {
  let component: HomeDetailsComponent;
  let fixture: ComponentFixture<HomeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeDetailsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDetailsComponent);
    component = fixture.componentInstance;
    component.book = {
      id: 0,
      title: 'title',
      author: 'author',
      genre: 'genre',
      publisher: 'publisher'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have "Book Details" displayed in the component', () => {
    expect(fixture.debugElement.nativeElement.textContent.trim()).toContain(
      'Book Details'
    );
  });

  it('should have a p-panel', () => {
    const pPanel: Element = fixture.debugElement.nativeElement.querySelector(
      'p-panel'
    );
    expect(pPanel).toBeTruthy();
  });

  it('should emit edit view mode on edit click', () => {
    const spy = spyOn(component.viewMode, 'emit');
    component.onEditClick();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(ViewMode.Edit);
  });

  it('should emit table view mode on cancel click', () => {
    const spy = spyOn(component.viewMode, 'emit');
    component.onCancelClick();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(ViewMode.Table);
  });

  it('should have text containing the books information', () => {
    let text: string = fixture.debugElement.nativeElement.textContent
      .trim()
      .toLowerCase();
    expect(text).toContain('title');
    expect(text).toContain('author');
    expect(text).toContain('genre');
    expect(text).toContain('publisher');

    component.book = {
      id: 0,
      title: 'brand new',
      author: 'other thing',
      genre: 'pop culture',
      publisher: 'know things'
    };
    fixture.detectChanges();

    text = fixture.debugElement.nativeElement.textContent.trim().toLowerCase();

    expect(text).toContain('brand new');
    expect(text).toContain('other thing');
    expect(text).toContain('pop culture');
    expect(text).toContain('know things');
  });

  it('should have two buttons that read "Edit" and "Cancel"', () => {
    const text: NodeList = fixture.debugElement.nativeElement.querySelectorAll(
      'button[type="button"]'
    );
    expect(text.length).toEqual(2);
    let buttonTextShould = ['edit', 'cancel'];
    text.forEach(button => {
      expect(buttonTextShould).toContain(
        button.textContent.trim().toLowerCase()
      );
      buttonTextShould = buttonTextShould.filter(
        b => b !== button.textContent.trim().toLowerCase()
      );
    });
  });
});
