import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private dataSrvc: DataService, private http: HttpClient) { }

  getPost(postId): Observable<any> {
    const api = this.dataSrvc.appPath + `/api/todo/item/${postId}`;
    return this.http.get(api);
  }

  getUserPosts = (): Observable<any> => {
    const api = this.dataSrvc.appPath + '/api/todo/posts';
    return this.http.get(api);
  }

  getAllUsersPosts = (): Observable<any> => {
    const api = this.dataSrvc.appPath + '/api/todo/all';
    return this.http.get(api);
  }

  addPost(postObj): Observable<any> {
    const api = this.dataSrvc.appPath + '/api/todo/add';
    return this.http.post(api, postObj);
  }

  updatePost(postObj): Observable<any> {
    const api = this.dataSrvc.appPath + `/api/todo/update/${postObj.id}`;
    return this.http.patch(api, postObj);
  }

  deletePost(postId): Observable<any> {
    const api = this.dataSrvc.appPath + `/api/todo/delete/${postId}`;
    return this.http.delete(api);
  }

}
