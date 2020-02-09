import Vue from 'vue';
import Cookie from 'cookie-universal';

export default ({ req, res }, inject) => {
  const cookie = new Cookie(req, res);
  const observable = Vue.observable(cookie.getAll());
  inject('cookie', new Proxy(observable, {
    set(target, key, value) {
      cookie.set(key, value);
      return Reflect.set(target, key, value);
    },
    deleteProperty(target, key) {
      cookie.remove(key);
      return Reflect.deleteProperty(target, key);
    }
  }));
};
