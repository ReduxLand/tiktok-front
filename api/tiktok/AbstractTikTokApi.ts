import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { TPayload } from '~/api/types'
import { AbstractApi } from '~/api/AbstractApi'
import { TTikTokApiResponse } from '~/api/tiktok/types'

/**
 * Класс TikTok API. Нужен для прокидывания API-вызовов к ТикТоку через наш бэк. Ответ от ТикТока будет завёрнут
 * в полезную нагрузку ответа от нашего бэка.
 *
 * @param {NuxtAxiosInstance} $axios - Инстанс Axios нашего фронта
 * @constructor
 */
export abstract class AbstractTikTokApi extends AbstractApi {
  protected constructor($axios: NuxtAxiosInstance) {
    super($axios)
  }

  protected _callApi<T extends object = {}>(
    method: 'GET' | 'POST',
    endpoint: string,
    payload: TPayload = {}
  ) {
    return super._callApi<TTikTokApiResponse<T>>(method, endpoint, payload)
      .then((res) => {
        const { data } = res

        if (data.code !== 0) {
          throw new Error('Ошибка TikTok API: ' + data.message || 'что-то пошло не так.')
        }

        return data.data
      })
  }
}
