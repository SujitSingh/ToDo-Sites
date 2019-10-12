<template src="./login.html"></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

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
    console.log(this.loginObj);
  }

}
</script>