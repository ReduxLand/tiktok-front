import { Context, Plugin } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { TikTokAccountApi, ITikTokAccountApi } from '~/api/tiktok-account'

declare module 'vue/types/vue' {
  interface Vue {
    $TikTokAccount: ITikTokAccountApi
  }
}

declare module '@nuxt/types' {
  interface Context {
    $axios: NuxtAxiosInstance
  }
}

// Плагин для работы с подключаемыми аккаунтами TikTok.
const plugin: Plugin = (
  context: Context,
  inject,
) => {
  const { $axios } = context
  if (!$axios) {
    return console.error('Axios init failure!')
  }

  inject('TikTokAccount', new TikTokAccountApi($axios))
}

export default plugin
