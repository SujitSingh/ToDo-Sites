import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private authSrvc: AuthService, private userSrvc: UserService, private router: Router) {
    if (this.authSrvc.getLoggedUser()) {
      this.router.navigate(['/home']);
    }
  }

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
        this.authSrvc.storeLoggedUser(login, rememberLogin);
        this.userSrvc.getUsersDetails();
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
