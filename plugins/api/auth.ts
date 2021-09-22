import { Inject } from '@nuxt/types/app'
import { Context, Plugin } from '@nuxt/types'
import { AuthApi, IAuthApi } from '~/api/auth'

declare module 'vue/types/vue' {
  interface Vue {
    $Auth: IAuthApi
  }
}

// TODO сделал велосипед, но лучше воспользоваться мопедом https://auth.nuxtjs.org/schemes/cookie
// Плагин для работы с методами авторизации.
const plugin: Plugin = (
  context: Context,
  inject: Inject,
) => {
  const { $axios, app, redirect } = context
  if (!$axios) {
    // Такого быть не может, но всё-таки
    return console.error('Axios init failure!')
  }

  inject('Auth', new AuthApi($axios, app, redirect))
}

export default plugin
