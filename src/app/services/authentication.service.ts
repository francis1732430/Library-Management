import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsersessionService } from './usersession.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private sessionService: UsersessionService) { }

  login(email: string, password: string) {

    const body: any = {};
    body.email = email;
    body.password = password;
    return this.http.post<any>(this.baseUrl + 'login', body);
  }
  isAuthenticated(): boolean {
    const keys = this.sessionService.load();
    console.log(keys);
    if (keys && keys.id) {
      return true;
    }
    return false;
  }
}
