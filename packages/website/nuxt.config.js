export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Publish your content',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/logo.png' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Alegreya+Sans:400,700&display=swap&subset=vietnamese',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#0052cc', height: '3px' },
  loadingIndicator: {
    name: 'cube-grid',
    color: '#0052cc',
    background: '#fafafa',
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/main.scss', '@pubnow/ui/scss/pubnow-ui.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/vue-atlas',
      ssr: false,
    },
    '~/plugins/http',
    '~/plugins/common',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxt/http',
    'vue-wait/nuxt',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
  ],
  http: {},
  wait: { useVuex: true },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  router: {
    scrollBehavior(to, from, savedPosition) {
      // savedPosition is only available for popstate navigations (back button)
      if (savedPosition) {
        return savedPosition
      }
      return { x: 0, y: 0 }
    },
  },
}
