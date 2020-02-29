import Vue from 'vue';
import VueMq from 'vue-mq';

Vue.use(VueMq, {
  breakpoints: {
    mobile: 420,
    phablet: 720,
    tablet: 960,
    desktop: Infinity
  },
  defaults: 'desktop'
});
