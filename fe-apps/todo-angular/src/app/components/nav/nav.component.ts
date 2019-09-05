import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private authSrvc: AuthService, private router: Router) { }

  ngOnInit() { }

  logout() {
    this.authSrvc.logoutUser();
    this.router.navigate(['/login']);
  }

}
