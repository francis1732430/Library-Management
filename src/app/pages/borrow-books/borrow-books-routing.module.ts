import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BorrowBooksComponent } from './borrow-books.component';

// Child Routes
const routes: Routes = [
  {
    path: '',
    component: BorrowBooksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BorrowBooksRoutingModule { }
