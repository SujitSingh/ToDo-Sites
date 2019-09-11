import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User';

@Pipe({
  name: 'userName', 
  // pure: false // uncomment for multiple checks
})
export class UserNamePipe implements PipeTransform {

  constructor(private authSrvc: AuthService, private userSrvc: UserService) { }

  transform(userId: string): string {
    const users: User[] = this.userSrvc.getUsersObj();
    const currUser = this.authSrvc.loggedUser.getValue();
    if (currUser.id === userId) {
      return 'Mine';
    }
    return users && users[userId] && users[userId].name || userId;
  }

}
