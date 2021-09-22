import { NuxtCookies } from 'cookie-universal-nuxt'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Context, NuxtAppOptions } from '@nuxt/types'
import { AbstractApi } from '../AbstractApi'
import {
  IAuthApi,
  TAuthLoginPayload,
  TAuthLoginResponse,
  TAuthRegisterPayload,
  TAuthRegisterResponse,
} from './types'

declare module '@nuxt/types' {
  export interface NuxtAppOptions {
    $cookies: NuxtCookies
  }
}

export * from './types'

export class AuthApi extends AbstractApi implements IAuthApi {
  private readonly _app: NuxtAppOptions
  private readonly _redirect: Context['redirect']

  constructor($axios: NuxtAxiosInstance, app: NuxtAppOptions, redirect: Context['redirect']) {
    super($axios)
    this._app = app
    this._redirect = redirect
  }

  login(payload: TAuthLoginPayload) {
    return this._callApi<TAuthLoginResponse>(
      'POST',
      '/api/v1/auth/login',
      payload,
    ).then((res) => {
      // Ошибка проверяется уровнем выше в _callApi
      // Обрабатываем следующие случаи
      if (res.success) {
        // В идеале ставить httpOnly cookie в хидерах ответа, а не так (защита от угона сессии через потенциальную XSS)
        // TODO сделать middleware где надо, чтобы всегда проверялась авторизация (сейчас только в nuxtServerInit)
        if (res.data?.token) {
          // Пишем сессию в куки
          this._app.$cookies.set('session', res.data.token)

          // Подставляем новую сессию во все дальнейшие запросы
          this._axios.setHeader('Authorization', 'Bearer ' + res.data.token)
        }
        return
      }

      throw new Error('Неизвестная ошибка авторизации.')
    })
  }

  register(payload: TAuthRegisterPayload) {
    return this._callApi<TAuthRegisterResponse>(
      'POST',
      '/api/v1/auth/register',
      payload,
    ).then((res) => {
      if (res.error) {
        throw new Error(res.error)
      }

      if (res.success && res.data?.token) {
        this._app.$cookies.set('session', res.data.token)
        this._axios.setHeader('Authorization', 'Bearer ' + res.data.token)
        return
      }

      throw new Error('Неизвестная ошибка регистрации.')
    })
  }

  logout() {
    return this._callApi(
      'POST',
      '/api/v1/auth/logout',
    ).then((res) => {
      if (res.success) {
        this._app.$cookies.remove('session')
        return this._redirect('/sign')
      }

      throw new Error('Неизвестная ошибки завершения сессии.')
    })
  }
}
