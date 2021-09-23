import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserSession } from '../models/usersession';
@Injectable({
  providedIn: 'root'
})
export class UsersessionService {
  localStorageSessionKey: string;
  session = new UserSession();
  constructor() {
    this.localStorageSessionKey = 'DemoLibrary-' + environment.apiBaseUrl + '-AuthData';
  }
  create(session: UserSession) {
    this.setNewSession(session);
  }
  setNewSession(session: any) {
    localStorage.setItem(this.localStorageSessionKey, JSON.stringify(session));
  }
  load(): any {
    const jsonObj = localStorage.getItem(this.localStorageSessionKey) ? JSON.parse(String(localStorage.getItem(this.localStorageSessionKey))) : '';
    return jsonObj;
  }
  destroy() {
    localStorage.setItem(this.localStorageSessionKey, '');
  }
}
