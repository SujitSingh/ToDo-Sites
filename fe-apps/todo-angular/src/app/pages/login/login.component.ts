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
    this.auth.clearStorages();
    const rememberLogin = this.loginObj.keepLogged;
    const loginObj = {
      email: this.loginObj.email,
      password: this.loginObj.password,
    };
    this.auth.logIn(loginObj).subscribe(
      login => {
        delete login.success;
        this.auth.loggedUser = login;
        this.auth.storeLoggedUser(login, rememberLogin);
      },
      error => {
        this.loginObj.errorMsg = error.error.message;
      }
    );
  }

}
