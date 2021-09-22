import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - TikTok ♪',
    title: 'Автозалив',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios.ts' },
    { src: '~/plugins/api/auth.ts' },
    { src: '~/plugins/api/user.ts' },
    { src: '~/plugins/api/tiktok.ts' },
    { src: '~/plugins/api/campaign.ts' },
    { src: '~/plugins/api/media-library.ts' },
    { src: '~/plugins/api/tiktok-account.ts' },
    { src: '~/plugins/notifier.ts' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['cookie-universal-nuxt', { alias: 'cookies' }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_HOST || '/', // Fallback для publicRuntimeConfig
    validateStatus: true, // Вручную хендлим все non-200 ответы
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.lightGreen.accent4
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Если нужно прокинуть переменные окружения на фронт - это делать здесь
  publicRuntimeConfig: {
    // fooBar: process.env.FOO_BAR, // Будет доступен на фронте в this.$config.fooBar
    axios: {
      browserBaseURL: process.env.API_HOST || '/',
    },
    io: {
      uri: process.env.API_HOST || '/',
    },
  },

  privateRuntimeConfig: {},

  server: {
    host: '0.0.0.0', // Wildcard // TODO в проде должен быть локально
    port: process.env.PORT || 3000
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // analyze: true, // Для просмотра карты сборки
    babel:{
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    }
  },
}
