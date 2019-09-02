import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private dataSrvc: DataService, private http: HttpClient) { }

  getUserPosts(): Observable<any> {
    const api = this.dataSrvc.appPath + '/api/todo/posts';
    return this.http.get(api);
  }

  getAllUsersPosts(): Observable<any> {
    const api = this.dataSrvc.appPath + '/api/todo/all';
    return this.http.get(api);
  }

}
