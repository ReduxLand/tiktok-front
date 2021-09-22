import { EMediaLibraryObject } from './enums'

export * from './enums'

export type TMediaAsset = {
  id: string
  folder: string
  fileSize: number
  displayName: string
}

export type TCreativesList = {
  list: TMediaAsset[]
}

export type TMediaLibraryUploadPayload = {
  file: File
  type: EMediaLibraryObject
}

export interface IMediaLibraryApi {
  list: () => Promise<TCreativesList>
  upload: (payload: TMediaLibraryUploadPayload) => Promise<TMediaAsset>
}
