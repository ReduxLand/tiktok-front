import { ActionTree, GetterTree, MutationTree } from 'vuex'

export type TNotification = {
  message: string
  type: 'success' | 'warning' | 'error' | 'info'
}

export const state = () => ({
  // Текущее уведомление
  notification: {
    message: '',
    type: 'info',
  } as TNotification,

  // Хранилище всех полученных уведомлений
  notifications: [] as TNotification[],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  notification: (state) => state.notification,
  notifications: (state) => state.notifications,
  notificationsCount: (state) => {
    const count = state.notifications.length
    return count > 99 ? '99+' : count
  },
}

export const mutations: MutationTree<RootState> = {
  SHOW: (state, notification: TNotification) => {
    state.notification = notification // Показываем текущее уведомление
    if (!state.notifications) {
      state.notifications = []
    }
    return state.notifications.push(notification) - 1 // И сохраняем его в общий пул
  },
  LOG_CLEAR: (state) => state.notifications = [],
}

// Best practice - не делить взаимодействие со стейтом на мутации и экшны, а всегда вызывать экшны, даже если
// они просто вызывают мутацию синхронно. Так никогда не будет путаницы между мутациями и экшнами.
export const actions: ActionTree<RootState, RootState> = {
  SHOW: ({ commit }, notification: TNotification) => {
    return commit('SHOW', notification)
  },
  LOG_CLEAR: ({ commit }) => commit('LOG_CLEAR')
}
