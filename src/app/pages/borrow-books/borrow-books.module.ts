import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BorrowBooksRoutingModule } from './borrow-books-routing.module';
import { BorrowBooksComponent } from './borrow-books.component';


@NgModule({
  declarations: [
    BorrowBooksComponent
  ],
  imports: [
    CommonModule,
    BorrowBooksRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BorrowBooksModule { }
