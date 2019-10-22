import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import Vuex from 'vuex';
import App from './App.vue';
import Login from './pages/login/Login.vue';
import Signup from './pages/signup/Signup.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(Vuex);

import '../../common/css/materialize.min.css';

// axios.defaults.baseURL = 'http://127.0.0.1:3240'; // can have a config

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/', redirect: '/login' },
    { path: '*', redirect: '/login' },
  ]
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
