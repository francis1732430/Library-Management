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
  create(session: UserSession, key?: any) {
    this.setNewSession(session, key);
  }
  setNewSession(session: any, key?: any) {
    localStorage.setItem(key ? key: this.localStorageSessionKey, JSON.stringify(session));
  }
  load(key?: any): any {
    const jsonObj = localStorage.getItem(key ? key : this.localStorageSessionKey) ? JSON.parse(String(localStorage.getItem(key ? key : this.localStorageSessionKey))) : '';
    return jsonObj;
  }
  destroy() {
    localStorage.clear();
  }
  removeSession(key?: any) {
    localStorage.setItem(key ? key : this.localStorageSessionKey, '');
  }
}
