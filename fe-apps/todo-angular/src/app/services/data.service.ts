import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  appPath = '';

  constructor() {
    this.appPath = 'http://127.0.0.1:3240';
  }
}
