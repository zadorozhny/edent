import Axios from 'axios';

export default ({ store }, inject) => {
  const axios = Axios.create({
    baseURL: `${process.env.BASE_URL}/api`
  });
  axios.interceptors.request.use(
    config => {
      config.headers.authorization = store.state.auth.tokens.access || '';
      return config;
    }
  );
  axios.interceptors.response.use(
    async response => response.data,
    async error => {
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          await store.dispatch('reset');
        } else if (status === 419) {
          return store.dispatch('auth/refresh')
            .then(() => axios.request(error.config));
        }
      } else {
        throw new Error(error.message || 'error.network');
      }
    }
  );

  inject('api', {
    auth: {
      signin: data => axios.post('/auth/signin', data),
      signout: () => axios.post('/auth/signout'),
      signup: data => axios.post('/auth/signup', data),
      refresh: data => axios.patch('/auth/refresh', data),
      forgotPassword: data => axios.post('/auth/forgot-password', data),
      resetPassword: data => axios.patch('/auth/reset-password', data)
    },
    profile: {
      get: () => axios.get('/profile'),
      remove: () => axios.delete('/profile'),
      update: data => axios.patch('/profile', data),
      updatePassword: data => axios.patch('/profile/password', data),
      confirmation: () => axios.get('/emails/confirmation'),
      updateEmail: data => axios.patch('/profile/email', data),
      removeEmail: () => axios.delete('/profile/email'),
      confirmEmail: data => axios.patch('/emails/confirm', data),
      resendEmail: () => axios.get('/emails/confirmation/resend'),
      uniqueEmail: params => axios.get('/profile/unicity/email', { params })
    },
    products: {
      get: ({ productId }) => axios.get(`/products/${productId}`),
      getList: params => axios.get('/products', { params }),
      create: data => axios.post('/products', data),
      update: ({ productId, ...data }) => axios.patch(`/products/${productId}`, data),
      remove: ({ productId }) => axios.delete(`/products/${productId}`)
    },
    upload: {
      image: () => axios.get('/upload')
    },
    categories: {
      get: ({ categoryId }) => axios.get(`/categories/${categoryId}`),
      getList: params => axios.get('/categories', { params }),
      create: data => axios.post('/categories', data),
      update: ({ categoryId, ...data }) => axios.patch(`/categories/${categoryId}`, data),
      remove: ({ categoryId }) => axios.delete(`/categories/${categoryId}`)
    },
    manufacturers: {
      get: ({ manufacturerId }) => axios.get(`/manufacturers/${manufacturerId}`),
      getList: params => axios.get('/manufacturers', { params }),
      create: data => axios.post('/manufacturers', data),
      update: ({ manufacturerId, ...data }) => axios.patch(`/manufacturers/${manufacturerId}`, data),
      remove: ({ manufacturerId }) => axios.delete(`/manufacturers/${manufacturerId}`)
    },
    users: {
      get: ({ userId }) => axios.get(`/users/${userId}`),
      getList: params => axios.get('/users', { params }),
      update: ({ userId, ...data }) => axios.patch(`/users/${userId}`, data),
      remove: ({ userId }) => axios.delete(`/users/${userId}`)
    },
    orders: {
      get: ({ orderId }) => axios.get(`/orders/${orderId}`),
      getList: params => axios.get('/orders', { params }),
      create: data => axios.post('/orders', data),
      update: ({ orderId, ...data }) => axios.patch(`/orders/${orderId}`, data),
      remove: ({ orderId }) => axios.delete(`/orders/${orderId}`)
    }
  });
};
