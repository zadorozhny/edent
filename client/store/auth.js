export const state = () => ({
  tokens: {
    access: '',
    refresh: ''
  },
  profile: {
    id: null,
    name: '',
    email: '',
    role: ''
  }
});

export const getters = {
  authorized: state => Boolean(state.tokens.access)
};

export const mutations = {
  reset(currentState) {
    Object.assign(currentState, state());
  },
  tokens(state, { access, refresh }) {
    state.tokens = { access, refresh };
  },
  profile(state, data) {
    state.profile = data;
  }
};

export const actions = {
  async init({ commit }, tokens = {}) {
    commit('tokens', tokens);
    const profile = await this.$api.profile.get();
    delete profile.tokens;
    commit('profile', profile);
  },
  async refresh({ state, commit }) {
    const tokens = await this.$api.auth.refresh({ refreshToken: state.tokens.refresh });
    commit('tokens', tokens);
  },
  async signin({ commit }, payload) {
    const { tokens, ...profile } = await this.$api.auth.signin(payload);
    commit('tokens', tokens);
    commit('profile', profile);
  },
  async signup({ commit }, payload) {
    const { tokens, ...profile } = await this.$api.auth.signup(payload);
    commit('tokens', tokens);
    commit('profile', profile);
  },
  async signout({ commit }) {
    try {
      await this.$api.auth.signout();
    } finally {
      commit('reset');
    }
  }
};
