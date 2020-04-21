export const actions = {
  reset({ commit }) {
    commit('auth/reset');
  },
  async nuxtInit() {
    this.subscribe(({ type, payload }) => {
      switch (type) {
      case 'auth/tokens':
        this.$cookie.tokens = {
          access: payload.access,
          refresh: payload.refresh
        };
        break;
      case 'auth/reset':
        delete this.$cookie.tokens;
        break;
      }
    });
  },
  async nuxtServerInit({ dispatch }) {
    try {
      await Promise.all([
        dispatch('auth/init', this.$cookie.tokens),
        dispatch('common/manufacturers'),
        dispatch('common/categories'),
        dispatch('common/warning')
      ]);
    } catch (err) {
      console.error(err);
    }
  }
};
