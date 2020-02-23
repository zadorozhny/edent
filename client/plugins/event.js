import Vue from 'vue';

export default (_, inject) => {
  inject('event', new Vue());
};
