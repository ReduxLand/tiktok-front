export type TUserSettings = {
  tiktokApp: {
    id: string
    secret: string
    oauthUrl: string
  }
}

export interface IUserApi {
  loadSettings(): Promise<TUserSettings>
  updateSettings(settings: TUserSettings): Promise<void>
}
