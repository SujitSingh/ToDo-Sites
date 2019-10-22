<template src="./login.html"></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import authSrvc from '../../services/auth-service';

@Component({})
export default class Login extends Vue {
  private loginObj = {
    email: '',
    password: '',
    keepLogged: true,
    errorMsg: '',
  };
  private get disabledLogin(): boolean {
    return !this.loginObj.email || !this.loginObj.password;
  }

  private logIn() {
    const self = this;
    const rememberLogin = this.loginObj.keepLogged;
    const loginObj = {
      email: this.loginObj.email.trim(),
      password: this.loginObj.password.trim()
    };
    authSrvc.logIn(loginObj).then(login => {
      delete login.success;
      authSrvc.storeLoggedUser(login.data, rememberLogin);
    }).catch(error => {
      error = error.response.data;
      self.loginObj.errorMsg = error.message;
    });
  }

}
</script>