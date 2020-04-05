const isDev = process.env.NUXT_ENV !== 'prod';
const isProd = process.env.NUXT_ENV === 'prod';

module.exports = {
  mode: 'universal',
  modern: isProd,
  dev: isDev,
  performance: isDev,
  env: {
    BASE_URL: process.env.BASE_URL
  },
  srcDir: './client',
  router: {
    middleware: 'redirect',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link'
  },
  head: {
    title: 'Edent',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover' },
      { name: 'theme-color', content: '#283b56' },
      { name: 'mobile-web-app-capable', content: 'yes' }
    ],
    script: [],
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
    '@/plugins/common',
    '@/plugins/api',
    '@/plugins/utils',
    '@/plugins/cookies',
    '@/plugins/initializer',
    '@/plugins/event',
    { src: '@/plugins/mq', mode: 'client' },
    { src: '@/plugins/storage', mode: 'client' }
  ],
  modules: [
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: '@/assets/css/mixins.scss',
  },
  build: {
    cache: false,
    hardSource: isDev,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: { name: 'styles', test: /\.(css|vue)$/, chunks: 'all', enforce: true }
        }
      }
    },
    loaders: {
      vue: {
        compilerOptions: { preserveWhitespace: false }
      }
    },
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({ enforce: 'pre', test: /\.(js|vue)$/, loader: 'eslint-loader', exclude: /(node_modules)/ });
      }
    }
  }
};
