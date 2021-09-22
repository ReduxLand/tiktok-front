import { Context, Plugin } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { UserApi, IUserApi } from '~/api/user'

declare module 'vue/types/vue' {
  interface Vue {
    $User: IUserApi
  }
}

// Плагин для работы с авторизованным пользователем сервиса.
const plugin: Plugin = (
  context: Context & { $axios: NuxtAxiosInstance },
  inject,
) => {
  const { $axios } = context
  if (!$axios) {
    return console.error('Axios init failure!')
  }

  inject('User', new UserApi($axios))
}

export default plugin
