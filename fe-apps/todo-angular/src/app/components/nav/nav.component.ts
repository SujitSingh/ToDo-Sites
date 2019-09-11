import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnChanges {
  @Input() user = <User>{};
  isLoginPage = false;

  constructor(private authSrvc: AuthService, private router: Router) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login') {
          this.isLoginPage = true;
        }
        else if (event.url === '/signup') {
          this.isLoginPage = false;
        }
      }
    });
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    this.user = changes.user.currentValue;
  }

  logout() {
    this.authSrvc.logoutUser();
    this.router.navigate(['/login']);
  }

}
