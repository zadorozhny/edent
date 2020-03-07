export const state = () => ({
  categories: [],
  manufacturers: []
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
  }
};
