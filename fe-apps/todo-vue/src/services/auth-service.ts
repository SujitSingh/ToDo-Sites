import axios from 'axios';
import apiBasePath from './data-service';

const loggedUserKey = 'loggedUser';

export default {
  logIn(loginObj: any): Promise<any> {
    const api = apiBasePath + '/api/auth/login';
    return axios.post(api, loginObj);
  },

  signUp(singupObj: any): Promise<any> {
    const api = apiBasePath + '/api/auth/signup';
    return axios.post(api, singupObj);
  },

  storeLoggedUser(loginObj: any, rememberUser: boolean) {
    // store details of logged user
    if (rememberUser) {
      // in localStorage
      localStorage.setItem(loggedUserKey, JSON.stringify(loginObj));
    } else {
      // in sessionStorage
      sessionStorage.setItem(loggedUserKey, JSON.stringify(loginObj));
    }
  },

  clearStorages() {
    sessionStorage.clear();
    localStorage.clear();
  }
}