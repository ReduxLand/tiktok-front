import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AbstractTikTokApi } from '~/api/tiktok/AbstractTikTokApi'
import { TCampaignListResponse } from '~/api/tiktok/api/campaign/types'

export class TikTokCampaignApi extends AbstractTikTokApi {
  constructor($axios: NuxtAxiosInstance) {
    super($axios)
  }

  list(accountId: string, advertiserId: string) {
    return this._callApi<TCampaignListResponse>(
      'POST',
      '/api/v1/tiktok/campaign',
      {
        accountId,
        advertiserId,
      }
    )
  }
}
