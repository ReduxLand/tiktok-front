import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AbstractTikTokApi } from '~/api/tiktok/AbstractTikTokApi'
import { TAdListResponse } from '~/api/tiktok/api/ad/types'

export class TikTokAdApi extends AbstractTikTokApi {
  constructor($axios: NuxtAxiosInstance) {
    super($axios)
  }

  list(accountId: string, advertiserId: string) {
    return this._callApi<TAdListResponse>(
      'POST',
      '/api/v1/tiktok/ad',
      {
        accountId,
        advertiserId,
      }
    )
  }
}
