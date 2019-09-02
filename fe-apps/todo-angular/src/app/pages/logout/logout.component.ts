import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(private authSrvc: AuthService, private router: Router) { }

  ngOnInit() {
    this.authSrvc.logoutUser();
    this.router.navigate(['login']);
  }
}
