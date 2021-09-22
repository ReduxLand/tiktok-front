export type TPayload = {
  [key: string]: any
}

export type TApiResponse<T extends object = {}> = {
  success: boolean
  error?: string
  data: T
}
