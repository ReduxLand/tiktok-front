import { Context, Plugin } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

// Экстендим контекст Vue инстансом axios (точно зная, что мы его подрубили в конфиге).
declare module '@nuxt/types' {
  interface Context {
    $axios: NuxtAxiosInstance
  }
}

const plugin: Plugin = (
  context: Context,
  inject,
) => {
  const { $axios, app } = context
  if (!$axios) {
    // Такого быть не может, но всё-таки
    return console.error('Axios init failure!')
  }

  // Обрабатываем non-200 ответы, как обычные (REST-way)
  $axios.defaults.validateStatus = () => true

  // Ставим заголовки авторизации на бэке в каждом запросе
  $axios.setHeader('Authorization', 'Bearer ' + (app.$cookies.get('session') || ''))
}

export default plugin
