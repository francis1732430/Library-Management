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
        component: LandingPageComponent,
        canActivate: [AuthGuardService],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
