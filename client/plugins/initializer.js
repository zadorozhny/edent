/* eslint-disable no-underscore-dangle */
export default async ({ store, app }) => {
  if (store._actions) {
    if (store._actions.nuxtInit) {
      await store.dispatch('nuxtInit', app.context);
    }
    if (process.browser && store._actions.nuxtClientInit) {
      await store.dispatch('nuxtClientInit', app.context);
    }
  }
};
