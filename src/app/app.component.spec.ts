import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';

import { RouterLinkDirectiveStub } from '../testing';

import { AppComponent } from './app.component';


@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent {
}


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

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent & TestModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed
        .configureTestingModule({
          declarations: [
            AppComponent
          ],
          imports: [
            HttpClientTestingModule,
            RouterTestingModule.withRoutes(routes)
          ]
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppComponent);
          comp = fixture.componentInstance;
        });
  }));
  tests();
});

function tests() {
  let routerLinks: RouterLinkDirectiveStub[];
  let linkDes: DebugElement[];

  beforeEach(() => {
    
  });

  it('can instantiate the component', () => {
    expect(comp).not.toBeNull();
  });
}
