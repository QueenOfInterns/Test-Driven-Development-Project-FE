import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let domNativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    domNativeElement = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const h1 = domNativeElement.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent.toLowerCase()).toContain('page not found');
  });

  it('should render a link to the home page', () => {
    const a = domNativeElement.querySelector('a');
    expect(a).toBeTruthy();
    expect(a.textContent.toLowerCase()).toContain('home');
  });
});
