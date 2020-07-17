import Vue from 'vue';
import App from './App.vue';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faSpotify);

Vue.use(Vuesax);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
