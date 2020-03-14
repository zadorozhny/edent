export default ({ redirect, route, store }) => {
  const isAdmin = store.getters['auth/isAdmin'];
  const authorized = store.getters['auth/authorized'];

  if (
    (!isAdmin && route.path.includes('admin'))
    || route.path === '/'
    || (authorized && route.path.includes('signin'))
  ) {
    return redirect('/products');
  }
};
