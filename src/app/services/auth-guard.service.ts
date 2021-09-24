import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService, UsersessionService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private session: UsersessionService) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const roles = route.data.roles;

    if (roles && 0 < roles.length) {
      const rolesDetails = this.session.load('roles');
      ;
      const userProfile = this.session.load('userprofile');
      const roleDetail = rolesDetails && 0 < rolesDetails.length
      ? rolesDetails.find((role: any) => role.id === userProfile.role_id): {};

      const currentRoleName = roleDetail ? roleDetail.role_name : '';
      
      if (-1 < roles.findIndex((role: string) => role === currentRoleName)) {
        return true;
      }
      return false;
    }
    return true;
  }
}
