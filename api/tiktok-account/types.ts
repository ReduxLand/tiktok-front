import { EAdvertiserStatus } from '~/api/tiktok/types'

export type TTikTokAccount = {
  id: string
  email: string
  displayName: string
  description?: string
  tiktokApp: {
    id: string
    secret: string
  }
  advertisers: {
    id: string
    name: string
    status: EAdvertiserStatus
  }[]
  // createdAt: number
  // updatedAt: number
}

export type TTikTokAccountsList = {
  list: TTikTokAccount[]
}

export interface ITikTokAccountApi {
  list(): Promise<TTikTokAccountsList>
  refresh(): Promise<{}>
  connect(authCode: string): Promise<TTikTokAccount>
}
