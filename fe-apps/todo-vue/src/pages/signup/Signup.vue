<template src="./signup.html"></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Validations } from 'vuelidate-property-decorators';
import { required } from 'vuelidate/lib/validators';

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
    console.log(this.signupObj);
  }
}
</script>

<style lang="scss">
</style>