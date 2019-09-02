import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUserKey = 'loggedUser';
  loggedUser: Object;

  constructor(private data: DataService, private http: HttpClient) { }

  logIn(loginObj): Observable<any> {
    const api = this.data.appPath + '/api/auth/login';
    return this.http.post(api, loginObj);
  }

  signUp(signupObj): Observable<any> {
    const api = this.data.appPath + '/api/auth/signup';
    return this.http.post(api, signupObj);
  }

  storeLoggedUser(loginObj, rememberUser) {
    // store details of logged user
    if (rememberUser) {
      // in localStorage
      localStorage.setItem(this.loggedUserKey, JSON.stringify(loginObj));
    } else {
      // in sessionStorage
      sessionStorage.setItem(this.loggedUserKey, JSON.stringify(loginObj));
    }
  }

  getLoggedUser() {
    if (this.loggedUser) { return this.loggedUser; }
    // check in sessionStorage
    this.loggedUser = JSON.parse(sessionStorage.getItem(this.loggedUserKey));
    if (this.loggedUser) { return this.loggedUser; }
    // check in localStorage
    this.loggedUser = JSON.parse(localStorage.getItem(this.loggedUserKey));
    return this.loggedUser;
  }

  logoutUser() {
    this.loggedUser = undefined;
    this.clearStorages();
  }

  clearStorages() {
    sessionStorage.clear();
    localStorage.clear();
  }
}
