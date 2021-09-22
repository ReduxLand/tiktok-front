import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { TPayload, TApiResponse } from '~/api/types'

/**
 * Абстрактный класс для работы с API нашего бэкэнда.
 * Поверх него также строится проброс запросов с нашего фронта на ТикТок и обратно.
 *
 * @param {NuxtAxiosInstance} $axios - Инстанс Axios нашего фронта
 * @constructor
 */
export abstract class AbstractApi {
  protected readonly _axios: NuxtAxiosInstance

  protected constructor($axios: NuxtAxiosInstance) {
    this._axios = $axios
  }

  protected _callApi<T extends object = {}>(
    method: 'GET' | 'POST',
    endpoint: string,
    payload: TPayload = {}
  ): Promise<TApiResponse<T>> {
    return this._axios
      .request({
        method,
        url: endpoint,
        data: payload,
      })
      .then(({ data }) => {
        // Наш бэк в ответе всегда возвращает success. Data же не возвращается, если есть поле error, и наоборот
        if (!data.hasOwnProperty('success') || !(data.hasOwnProperty('data') || data.hasOwnProperty('error'))) {
          throw new Error('Неизвестная ошибка API-вызова: получена неверная сигнатура данных.')
        }

        // Сразу выбрасываем ошибки, если таковые есть в ответе
        if (data.error) {
          throw new Error(data.error)
        }
        // Или если операция не была завершена успешно
        else if (!data.success) {
          throw new Error('Не удалось выполнить операцию.')
        }

        return data
      })
  }
}
