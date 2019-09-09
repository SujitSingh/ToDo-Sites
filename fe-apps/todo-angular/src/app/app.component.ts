import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser: User;

  constructor(private authSrvc: AuthService) { }
  
  ngOnInit() {
    this.authSrvc.loggedUser.subscribe((userObj: User) => {
      this.currentUser = userObj;
    });
  }
}
