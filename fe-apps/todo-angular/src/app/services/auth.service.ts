import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private data: DataService, private http: HttpClient) { }

  logIn(loginObj): Observable<any> {
    const api = this.data.appPath + '/api/auth/login';
    return this.http.post(api, loginObj);
  }

  signUp(signupObj): Observable<any> {
    const api = this.data.appPath + '/api/auth/signup';
    return this.http.post(api, signupObj);
  }
}
