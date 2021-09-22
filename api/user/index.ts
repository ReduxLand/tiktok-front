import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AbstractApi } from '~/api/AbstractApi'
import { IUserApi, TUserSettings } from './types'

export * from './types'

export class UserApi extends AbstractApi implements IUserApi {
  constructor($axios: NuxtAxiosInstance) {
    super($axios)
  }

  loadSettings() {
    return this._callApi<TUserSettings>('GET', '/api/v1/user/settings')
      .then((res) =>
        res.data
      )
  }

  updateSettings(settings: TUserSettings) {
    return this._callApi(
      'POST',
      '/api/v1/user/settings',
      settings,
    ).then(() => {
      return // Нужно вернуть void
    })
  }
}
