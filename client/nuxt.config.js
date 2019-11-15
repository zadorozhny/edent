const isDev = process.env.NUXT_ENV !== 'prod';
const isProd = process.env.NUXT_ENV === 'prod';

module.exports = {
  mode: 'universal',
  modern: isProd,
  dev: isDev,
  srcDir: './client',
  router: {
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link'
  },
  head: {
    title: 'Edent',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Description' }
    ],
    script: [
      {
        src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAFBrCwBNg9F6345BFfK-5faTNO5aNU8GY',
        defer: true
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700,800,900&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ]
  },
  css: [
    '@/assets/css/index.scss'
  ],
  loading: { color: '#283b56', height: '3px' },
  plugins: [
    '@/plugins/common'
  ],
  modules: [
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: '@/assets/css/mixins.scss',
  },
  build: {
    cache: isDev,
    hardSource: isDev,
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({ enforce: 'pre', test: /\.(js|vue)$/, loader: 'eslint-loader', exclude: /(node_modules)/ });
      }
    }
  }
};
