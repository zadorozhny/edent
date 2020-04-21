export const state = () => ({
  categories: [],
  manufacturers: [],
  warning: null
});

export const mutations = {
  reset(currentState) {
    Object.assign(currentState, state());
  },
  categories(state, categories) {
    state.categories = categories;
  },
  manufacturers(state, manufacturers) {
    state.manufacturers = manufacturers;
  },
  warning(state, warning) {
    state.warning = warning;
  }
};

export const actions = {
  async categories({ commit }) {
    const categories = await this.$api.categories.getList({
      hierarchy: true
    });
    commit('categories', categories);
  },
  async manufacturers({ commit }) {
    const manufacturers = await this.$api.manufacturers.getList();
    commit('manufacturers', manufacturers);
  },
  async warning({ commit }) {
    const warning = await this.$api.warning.get();
    commit('warning', warning);
  }
};
