export default {
  form(payload) {
    return Object.entries(payload).reduce((data, [key, value]) => {
      data.append(key, value);
      return data;
    }, new FormData());
  },
  debounce(fn, wait) {
    let timeout = null;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), wait);
    };
  }
};
