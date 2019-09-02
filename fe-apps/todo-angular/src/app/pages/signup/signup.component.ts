import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupObj = {
    email: '',
    name: '',
    password: '',
    rePassword: '',
    isAdmin: false,
    errorMsg: '',
    successMsg: ''
  };

  constructor(private auth: AuthService) { }

  ngOnInit() { }

  signUp() {
    if (this.signupObj.password === this.signupObj.rePassword) {
      this.signupObj.successMsg = '';
      this.signupObj.errorMsg = '';
      const registerObj = {
        email: this.signupObj.email,
        name: this.signupObj.name,
        password: this.signupObj.password,
        isAdmin: this.signupObj.isAdmin,
      };
      this.auth.signUp(registerObj).subscribe(
        signed => {
          this.resetSignupForm();
          this.signupObj.successMsg = signed.message;
        },
        error => {
          this.signupObj.errorMsg = error.error.message;
        }
      );
    } else {
      this.signupObj.errorMsg = 'Please enter matching passwords';
    }
  }

  resetSignupForm() {
    Object.keys(this.signupObj).forEach(key => {
      this.signupObj[key] = '';
    });
  }
}
