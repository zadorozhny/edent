import Vue from 'vue';

export default (_, inject) => { // TODO: remake
  const observable = Vue.observable({ products: JSON.parse(localStorage.getItem('products')) });
  inject('storage', new Proxy(observable, {
    set(target, key, value) {
      localStorage.setItem(key, JSON.stringify(value));
      return Reflect.set(target, key, value);
    }
  }));
};
