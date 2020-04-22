import Vue from 'vue';
import Vuelidate from 'vuelidate';
import { DateTime, Settings } from 'luxon';

import Kit, { AlertWormhole, LoaderWormhole } from '@/kit';

Vue.use(Vuelidate);
Vue.use(Kit);

export default (_, inject) => {
  Settings.defaultLocale = 'ua';
  inject('luxon', { DateTime });
  inject('alert', new Vue(AlertWormhole));
  inject('loader', new Vue(LoaderWormhole));
};
