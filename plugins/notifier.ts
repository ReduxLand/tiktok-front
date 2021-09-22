import { Inject } from '@nuxt/types/app'
import { Context, Plugin } from '@nuxt/types'
import { TNotification } from '~/store/notifier'

type TNotificationType = TNotification['type']

declare module 'vue/types/vue' {
  interface Vue {
    $notifier: {
      show: (message: string, type?: TNotificationType) => Promise<void>
      log: {
        clear: () => void
        // remove: (id: number) => void
      }
    }
  }
}

// Плагин глобального нотификатора (показ уведомлений в любой части системы).
const plugin: Plugin = (
  context: Context,
  inject: Inject,
) => {
  const { store } = context
  inject('notifier', {
    show: (message: string, type: TNotificationType = 'info') => store.dispatch('notifier/SHOW', { message, type }),
    log: {
      clear: () => {
        store.dispatch('notifier/LOG_CLEAR')
        return
      },
      // remove: (id: number) => {
      //   store.commit('notifier/LOG_REMOVE_ITEM', id)
      //   return
      // },
    }
  })
}

export default plugin
