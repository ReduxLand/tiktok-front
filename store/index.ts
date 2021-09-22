import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {}

// TODO тайпинги для app.$cookies
export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit }, { app, redirect, route }) {
    const jwt = app.$cookies.get('session')
    if (!jwt) {
      return redirect('/sign')
    }

    /**
     * Здесь обязательна синхронность, т.к. редирект происходит с участием хедера Location.
     * Если убрать ожидание промиса - nuxt асинхронно начнёт отдавать контент пользователю, а только после выполнения
     * АПИ-вызова начнёт выставлять заголовки на редирект, когда уже поздно.
     */
    await app.$Auth
      // Проверяем авторизацию
      .login()
      // Если ОК - пропускаем юзера, куда шёл
      .then(() => {
        return route.path === '/' || route.path.toLowerCase() === '/sign'
          ? redirect('/dashboard')
          : redirect(route.fullPath)
      })
      // Если ошибка - на авторизацию. Даже если бэк виноват - там всплывёт инфа
      .catch(() => {
        app.$cookies.remove('session')
        return redirect('/sign')
      })
  },
}
