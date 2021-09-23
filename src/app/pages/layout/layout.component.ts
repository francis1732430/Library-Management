import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersessionService, NavigationService, AuthenticationService, UtilityService } from '../../services';
import { UserSession } from '../../models';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean = false;
  subscriptions: any[] = [];
  userProfile: UserSession = new UserSession();

  constructor(private session: UsersessionService,
    private nav: NavigationService,
    private auth: AuthenticationService,
    private utility: UtilityService) { }

  ngOnInit(): void {
    this.handleSubscription(this.utility.authenticationBehaviourSubject.subscribe(() => {
      this.isAuthenticated = this.auth.isAuthenticated();
    }));

    this.handleSubscription(this.utility.userProfileBehaviourSubject.subscribe((userProfile: UserSession) => {
      this.userProfile = userProfile;
    }));
  }

  logout(): void {
    this.session.destroy();
    this.nav.goToLoginPage();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub && sub.unsubscribe();
    });
  }

  handleSubscription(sub: any) {
    this.subscriptions.push(sub);
  }
}
