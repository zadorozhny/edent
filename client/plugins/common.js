import Vue from 'vue';
import Vuelidate from 'vuelidate';

import Kit, { AlertWormhole, LoaderWormhole } from '@/kit';

Vue.use(Vuelidate);
Vue.use(Kit);

export default (_, inject) => {
  inject('alert', new Vue(AlertWormhole));
  inject('loader', new Vue(LoaderWormhole));
};
