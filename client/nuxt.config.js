module.exports = {
  mode: 'universal',
  dev: process.env.NUXT_ENV !== 'prod',
  srcDir: './client',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Node',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Description' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '@/assets/css/index.scss'
  ],

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
