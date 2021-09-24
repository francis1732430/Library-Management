import { Directive, ViewContainerRef, TemplateRef, OnInit, Input,  OnDestroy } from '@angular/core';
import { UtilityService, UsersessionService } from 'src/app/services';

@Directive({
  selector: '[appRolesPermission]'
})
export class RolesPermissionDirective implements OnInit, OnDestroy {

  roles: any = null;
  rolesDetails: any[] = [];
  sub: any = null;
  currentRoleName: string = '';

  constructor(private container: ViewContainerRef,
    private template: TemplateRef<any>,
    private utility: UtilityService,
    private session: UsersessionService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  @Input()
    set appRolesPermission(value: any) {
        this.roles = value;
        this.checkRoles();
    }

    checkRoles() {
      this.rolesDetails = this.session.load('roles');
      ;
      const userProfile = this.session.load('userprofile');
      const roleDetail = this.rolesDetails && 0 < this.rolesDetails.length
      ? this.rolesDetails.find((role: any) => role.id === userProfile.role_id): {};

      const currentRoleName = roleDetail ? roleDetail.role_name : '';

      if (-1 < this.roles.findIndex((role: string) => role === currentRoleName)) {
        this.container.createEmbeddedView(this.template);
      } else {
        this.container.clear();
      }
    }
}
