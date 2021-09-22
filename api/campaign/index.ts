import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AbstractApi } from '~/api/AbstractApi'
import {
  ICampaignApi,
  TCampaignCreatePayload,
  TCampaignList
} from '~/api/campaign/types'

export class CampaignApi extends AbstractApi implements ICampaignApi {
  constructor($axios: NuxtAxiosInstance) {
    super($axios)
  }

  list() {
    return this._callApi<TCampaignList>(
      'GET',
      '/api/v1/campaigns',
    ).then((res) => res.data)
  }

  create(payload: TCampaignCreatePayload) {
    return this._callApi(
      'POST',
      '/api/v1/campaigns',
      payload,
    ).then((res) => { return })
  }

  // TODO typings
  listLoads() {
    return this._callApi<TCampaignList>(
      'GET',
      '/api/v1/campaigns/loads',
    ).then((res) => res.data)
  }
}
