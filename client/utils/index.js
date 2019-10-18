export default {
  form(payload) {
    return Object.entries(payload).reduce((data, [key, value]) => {
      data.append(key, value);
      return data;
    }, new FormData());
  }
};
