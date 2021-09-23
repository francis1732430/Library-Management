import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { UsersessionService } from './index';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  
  constructor(private session: UsersessionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let authReq = req;
    const token = this.session.load('token');
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq)
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, token) });
  }
  }

  export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ];
