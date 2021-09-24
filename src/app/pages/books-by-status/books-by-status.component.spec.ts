import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksByStatusComponent } from './books-by-status.component';

describe('BorrowBooksComponent', () => {
  let component: BooksByStatusComponent;
  let fixture: ComponentFixture<BooksByStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksByStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
