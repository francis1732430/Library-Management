import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Module
import { AppRoutingModule } from './app-routing.module';

// Services
import { AuthenticationService, NavigationService } from './services/index';

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
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    NavigationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
