import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AbstractApi } from '~/api/AbstractApi'
import { EAdvertiserStatus } from '~/api/tiktok/types'
import { ITikTokAccountApi, TTikTokAccount, TTikTokAccountsList } from './types'

export * from './types'

export class TikTokAccountApi extends AbstractApi implements ITikTokAccountApi {
  constructor($axios: NuxtAxiosInstance) {
    super($axios)
  }

  list() {
    return this._callApi<TTikTokAccountsList>(
      'GET',
      '/api/v1/tiktok-accounts',
    ).then((res) => {
      res.data.list.map((acc) => {
        // Сортируем адвертайзеров по статусам, т.к. DataTable почему-то не может
        acc.advertisers = acc.advertisers.sort((a, b) => a.status === EAdvertiserStatus.Active ? -1 : 1)
        return acc
      })
      return res.data
    })
  }

  refresh() {
    return this._callApi(
      'POST',
      '/api/v1/tiktok-accounts',
    ).then((res) => res.data)
  }

  connect(authCode: string) {
    return this._callApi<TTikTokAccount>(
      'POST',
      '/api/v1/tiktok-accounts/connect',
      { authCode }
    ).then((res) => res.data)
  }
}
