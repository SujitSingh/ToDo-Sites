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

  constructor(private authSrvc: AuthService, private router: Router) { }

  ngOnInit() { }

  logIn() {
    this.authSrvc.clearStorages();
    const rememberLogin = this.loginObj.keepLogged;
    const loginObj = {
      email: this.loginObj.email,
      password: this.loginObj.password,
    };
    this.authSrvc.logIn(loginObj).subscribe(
      login => {
        delete login.success;
        this.authSrvc.loggedUser = login;
        this.authSrvc.storeLoggedUser(login, rememberLogin);
        this.navigateToHome();
      },
      error => {
        this.loginObj.errorMsg = error.error.message;
      }
    );
  }

  navigateToHome() {
    this.router.navigate(['home']);
  }

}
