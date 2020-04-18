/* eslint-disable no-useless-escape */
export default {
  throttle(fn, wait) {
    let last = -Infinity;
    let timeout = null;
    return function (...args) {
      const now = Date.now();
      if (now < last + wait) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          last = now;
          fn.apply(this, args);
        }, wait);
      } else {
        last = now;
        fn.apply(this, args);
      }
    };
  },
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
  },
  operator(phone) {
    const [number] = phone.match(new RegExp(/\(\d+\)/g));

    switch (Number(number.replace(/[^0-9.]/g, ''))) {
    case 39:
    case 67:
    case 68:
    case 96:
    case 97:
    case 98:
      return 'kyivstar';
    case 50:
    case 66:
    case 95:
    case 99:
      return 'vodafone';
    default:
      return 'none';
    }
  }
};
