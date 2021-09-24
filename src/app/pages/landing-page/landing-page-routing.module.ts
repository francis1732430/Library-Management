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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
