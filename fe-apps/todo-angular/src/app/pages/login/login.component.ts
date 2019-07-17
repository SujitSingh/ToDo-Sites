import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginObj = {
    email: '',
    password: '',
    keepLogged: true,
    errorMsg: ''
  };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() { }

  logIn() {
    const loginObj = {
      email: this.loginObj.email,
      password: this.loginObj.password,
    };
    this.auth.logIn(loginObj).subscribe(
      login => {
        console.log(login);
      },
      error => {
        console.log(error);
        this.loginObj.errorMsg = error.error.message;
      }
    );
  }

}
