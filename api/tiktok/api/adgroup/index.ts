import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AbstractTikTokApi } from '~/api/tiktok/AbstractTikTokApi'
import { TAdGroupListResponse } from '~/api/tiktok/api/adgroup/types'

export class TikTokAdGroupApi extends AbstractTikTokApi {
  constructor($axios: NuxtAxiosInstance) {
    super($axios)
  }

  list(accountId: string, advertiserId: string) {
    return this._callApi<TAdGroupListResponse>(
      'POST',
      '/api/v1/tiktok/adgroup',
      {
        accountId,
        advertiserId,
      }
    )
  }
}
