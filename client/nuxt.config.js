module.exports = {
  mode: 'universal',
  modern: process.env.NUXT_ENV === 'prod',
  dev: process.env.NUXT_ENV !== 'prod',
  srcDir: './client',
  head: {
    title: 'Node',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Description' }
    ],
    script: [
      {
        src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAFBrCwBNg9F6345BFfK-5faTNO5aNU8GY',
        defer: true
      },
      {
        src: 'https://www.gstatic.com/charts/loader.js',
        defer: true
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&display=swap&subset=cyrillic-ext' }
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
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({ enforce: 'pre', test: /\.(js|vue)$/, loader: 'eslint-loader', exclude: /(node_modules)/ });
      }
    }
  }
};
