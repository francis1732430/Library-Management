import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogin, Role } from '././../../models';
import { AuthenticationService,
  UsersessionService,
  AlertService,
  NavigationService,
  UtilityService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private api: AuthenticationService,
    private session: UsersessionService,
    private alert: AlertService,
    private nav: NavigationService,
    private utility: UtilityService) { 
    this.loginForm = this.fb.group(
      {
        email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
        password: ['', Validators.compose([Validators.required])]});
  }

  ngOnInit(): void {
  }

  submit(ev: any): void {
    let check = true;
    Object.keys(this.loginForm.controls).forEach((key) => {
      const checkValidation: any = this.loginForm.controls[key];
      if (!checkValidation.valid) {
        checkValidation.markAsTouched();
        check = false;
      }

      if (check) {
        const user: UserLogin = this.loginForm.value;
        this.api.login(user.email, user.password).subscribe((res: any) => {
          if (res) {
            this.session.create(res.userDetails, "userprofile");
            this.session.create(res.token, "token");
            this.utility.userProfileBehaviourSubject.next(res.userDetails);
            this.api.getRoles().subscribe((rolesRes: any) => {
              
              this.session.create(rolesRes, "roles");
              this.utility.rolesBehaviourSubject.next(rolesRes);
              this.nav.goToLandingPage();
              this.loginForm.reset();
            });
          }
        }, (err) => {
          const errorMessage = err && err.error && err.error.message ? err.error.message : "";
          this.alert.error(errorMessage);
        });
      }
    });
  }

}
