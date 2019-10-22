<template src="./signup.html"></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Validations } from 'vuelidate-property-decorators';
import { required } from 'vuelidate/lib/validators';
import authSrvc from '../../services/auth-service';

@Component({})
export default class Signup extends Vue {
  private signupObj = {
    email: '',
    name: '',
    password: '',
    rePassword: '',
    isAdmin: false,
    errorMsg: '',
    successMsg: ''
  };

  @Validations()
  validations = {
    email: { required },
    name: { required },
    password: { required },
    rePassword: { required }
  };

  private get disabledSignup(): boolean {
    const disabled = this.signupObj.email && this.signupObj.name && this.signupObj.password && this.signupObj.rePassword ? false : true; 
    return disabled;
  }

  private signUp() {
    const self = this;
    if (this.signupObj.password === this.signupObj.rePassword) {
      this.signupObj.successMsg = '';
      this.signupObj.errorMsg = '';
      const registerObj = {
        email: this.signupObj.email,
        name: this.signupObj.name,
        password: this.signupObj.password,
        isAdmin: this.signupObj.isAdmin,
      };
      authSrvc.signUp(registerObj).then(signed => {
        signed = signed.data
        self.resetSignupForm();
        self.signupObj.successMsg = signed.message;
      }).catch(error => {
        error = error.response.data;
        self.signupObj.errorMsg = error.message;
      });
    }
  }

  private resetSignupForm() {
    const self = this;
    Object.keys(this.signupObj).forEach(key => {
      self.signupObj[key] = '';
    });
  }
}
</script>

<style lang="scss">
</style>