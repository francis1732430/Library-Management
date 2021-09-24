import { Component } from '@angular/core';
import { AuthenticationService, NavigationService, UtilityService, UsersessionService } from './services';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'libraryManagement';

  constructor(
    private auth: AuthenticationService,
    private nav: NavigationService,
    private router: Router,
    private utility: UtilityService,
    private session: UsersessionService,
    private modalService: NgbModal
  ) {
    if (this.auth.isAuthenticated()) {
      this.nav.goToLandingPage();
    } else {
      this.nav.goToLoginPage();
    }

    const currentRoute: any = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    );

    currentRoute.subscribe(() => {
      this.utility.authenticationBehaviourSubject.next('');
    });

    this.getRoles();
    this.getUserProfile();
    this.modalService.dismissAll();
  }

  getUserProfile() {
    const userProfile = this.session.load('userprofile');

    if (userProfile) {
      this.utility.userProfileBehaviourSubject.next(userProfile);
    }
  }

  getRoles() {
    const rolesList = this.session.load('roles');

    if (rolesList) {
      this.utility.rolesBehaviourSubject.next(rolesList);
    }
  }
}
