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
    errorMsg: ''
  };

  constructor(private auth: AuthService) { }

  ngOnInit() { }

  signUp() {
    if (this.signupObj.password === this.signupObj.rePassword) {
      const signupObj = {
        email: this.signupObj.email,
        name: this.signupObj.name,
        password: this.signupObj.password,
        isAdmin: this.signupObj.isAdmin,
      };
      this.auth.signUp(signupObj).subscribe(
        signed => {
          console.log(signed);
        },
        error => {
          console.log(error);
          this.signupObj.errorMsg = error.error.message;
        }
      );
    } else {
      this.signupObj.errorMsg = 'Please enter matching passwords';
    }
  }
}
