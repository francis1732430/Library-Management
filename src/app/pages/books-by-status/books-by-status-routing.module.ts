import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksByStatusComponent } from './books-by-status.component';

// Child Routes
const routes: Routes = [
  {
    path: '',
    component: BooksByStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksByStatusRoutingModule { }
