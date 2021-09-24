import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Module
import { AppRoutingModule } from './app-routing.module';
import { SharedModule  } from './shared/shared.module';

// Services
import { AuthenticationService, NavigationService, AlertService, authInterceptorProviders } from './services/index';

// Component
import { AppComponent } from './app.component';
import { LayoutComponent } from './pages/layout/layout.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    AuthenticationService,
    NavigationService,
    AlertService,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
