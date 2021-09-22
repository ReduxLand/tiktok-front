import { Context, Plugin } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { MediaLibraryApi } from '~/api/media-library'
import { IMediaLibraryApi } from '~/api/media-library/types'

declare module 'vue/types/vue' {
  interface Vue {
    $MediaLibrary: IMediaLibraryApi
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

  inject('MediaLibrary', new MediaLibraryApi($axios))
}

export default plugin
