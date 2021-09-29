import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthGuardService } from '../../services/auth-guard.service';

// Child Routes

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'books',
        loadChildren: () => import('../books/books.module').then((m) => m.BooksModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'my-books',
        loadChildren: () => import('../books/books.module').then((m) => m.BooksModule),
        data: {roles: ['User']},
        canActivate: [AuthGuardService],
      },
      {
        path: 'books-borrowed',
        loadChildren: () => import('../books-by-status/books-by-status.module').then((m) => m.BooksByStatusModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'books-available',
        loadChildren: () => import('../books-by-status/books-by-status.module').then((m) => m.BooksByStatusModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'books-overdue',
        loadChildren: () => import('../books-by-status/books-by-status.module').then((m) => m.BooksByStatusModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'books-history',
        loadChildren: () => import('../books-by-status/books-by-status.module').then((m) => m.BooksByStatusModule),
        data: {roles: ['Librarian']},
        canActivate: [AuthGuardService],
      },
    ]
  }
];

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageComponent ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        SharedModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
