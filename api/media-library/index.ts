import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AbstractApi } from '../AbstractApi'
import {
  TMediaAsset,
  IMediaLibraryApi,
  TCreativesList,
  TMediaLibraryUploadPayload,
} from './types'

export class MediaLibraryApi extends AbstractApi implements IMediaLibraryApi {
  constructor($axios: NuxtAxiosInstance) {
    super($axios)
  }

  list() {
    return this._callApi<TCreativesList>(
      'GET',
      '/api/v1/media-library',
    ).then((res) => res.data)
  }

  upload(payload: TMediaLibraryUploadPayload) {
    const formData = new FormData()
    const { type, file } = payload
    formData.append(type, file)

    return this._callApi<TMediaAsset>(
      'POST',
      '/api/v1/media-library',
      formData,
    ).then((res) => res.data)
  }
}
