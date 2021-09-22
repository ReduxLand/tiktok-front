export type TAuthLoginPayload = {
  username?: string
  password?: string
}

export type TAuthLoginResponse = {
  token: string
}

export type TAuthRegisterPayload = {
  username: string
  password: string
}

export type TAuthRegisterResponse = {
  token: string
}

// Методы либо возвращают void, либо выбрасывают исключение
export interface IAuthApi {
  login(payload: TAuthLoginPayload): Promise<void>
  register(payload: TAuthRegisterPayload): Promise<void>
  logout(): Promise<void>
}
