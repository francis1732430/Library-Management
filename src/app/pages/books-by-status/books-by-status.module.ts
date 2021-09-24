import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { BooksByStatusRoutingModule } from './books-by-status-routing.module';
import { BooksByStatusComponent } from './books-by-status.component';


@NgModule({
  declarations: [
    BooksByStatusComponent
  ],
  imports: [
    CommonModule,
    BooksByStatusRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class BooksByStatusModule { }
