import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children:
    [
      {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
      },
      { 
        path: 'home', loadChildren: () => import('./pages/landing-page/landing-page.module').then(m => m.LandingPageModule), 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
