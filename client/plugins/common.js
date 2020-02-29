import Vue from 'vue';

import Kit, { AlertWormhole } from '@/kit';

Vue.use(Kit);

export default (_, inject) => {
  inject('alert', new Vue(AlertWormhole));
};
