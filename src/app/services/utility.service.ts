import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { UserSession } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  authenticationBehaviourSubject = new BehaviorSubject<any>({});
  authenticationSubject = this.authenticationBehaviourSubject.asObservable().pipe(distinctUntilChanged());

  userProfileBehaviourSubject = new BehaviorSubject<UserSession>(new UserSession());
  userProfileSubject = this.userProfileBehaviourSubject.asObservable().pipe(distinctUntilChanged());

  constructor() { }
}
