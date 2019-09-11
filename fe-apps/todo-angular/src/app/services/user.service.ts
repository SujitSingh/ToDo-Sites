import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = new BehaviorSubject(null);

  constructor(private http: HttpClient, private dataSrvc: DataService) { }

  getUsersDetails() {
    if (!this.users.value) {
      this.getUsers().subscribe(
        usersInfo => {
          let users: User[] = [];
          if (usersInfo && usersInfo.users) {
            users = usersInfo.users;
          }
          this.generateUsersObject(users);
        },
        error => {
          this.generateUsersObject([]);
        }
      );
    }
  }

  getUsersObj() {
    return this.users.value;
  }

  private getUsers(): Observable<any> {
    const api = this.dataSrvc.appPath + '/api/user/all';
    return this.http.get(api);
  }

  private generateUsersObject(users) {
    let usersObj = {};
    for (let user of users) {
      usersObj[user._id] = user;
    }
    this.users.next(usersObj);
  }

  clearUsers() {
    this.users.next(null);
  }

}
