import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page.component';
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
        canActivate: [AuthGuardService],
      },
      {
        path: 'books-borrowed',
        loadChildren: () => import('../borrow-books/borrow-books.module').then((m) => m.BorrowBooksModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'books-available',
        loadChildren: () => import('../borrow-books/borrow-books.module').then((m) => m.BorrowBooksModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'books-overdue',
        loadChildren: () => import('../borrow-books/borrow-books.module').then((m) => m.BorrowBooksModule),
        canActivate: [AuthGuardService],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
