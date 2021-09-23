import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserLogin } from '././../../models';
import { AuthenticationService, UsersessionService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public errorMessage: String = '';
  constructor(private fb: FormBuilder,
    private api: AuthenticationService,
    private session: UsersessionService) { 
    this.loginForm = this.fb.group(
      {
        email: ['', Validators.compose([Validators.required, Validators.email])],
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

      const user: UserLogin = this.loginForm.value;
      this.api.login(user.email, user.password).subscribe((res) => {
        if (res) {
          this.session.create(res);
        } else {
          this.loginForm.reset();
        }
      }, (err) => {
        console.log(err);
        this.errorMessage = err && err.error && err.error.message ? err.error.message : "";
      });
    });
  }

}
