import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import '../../common/css/materialize.min.css';

new Vue({
  render: (h) => h(App),
}).$mount('#app');
