import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from '@angular/router';

import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './login.component';
import { addMatchers } from '../../../testing';


let comp: LoginComponent;
let fixture: ComponentFixture<LoginComponent>;
let page: Page;

/////// Tests //////

describe('LoginComponent', () => {
  beforeEach(waitForAsync(() => {
    addMatchers();
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed
        .configureTestingModule({
          imports: [
            ReactiveFormsModule,
            LoginRoutingModule,
            HttpClientTestingModule,
            ToastrModule.forRoot({
              timeOut: 5000,
              positionClass: 'toast-top-right',
              preventDuplicates: true,
            }),
            RouterTestingModule
          ],
          providers: [
            {provide: Router, useValue: routerSpy}
          ]
        })
        .compileComponents()
        .then();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });
});

class Page {
  navSpy: jasmine.Spy;

  constructor() {
    // Get the component's injected router navigation spy
    const routerSpy = fixture.debugElement.injector.get(Router);
    this.navSpy = routerSpy.navigate as jasmine.Spy;
  }
}
