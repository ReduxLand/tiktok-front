export type TTikTokApiResponse<T extends object = {}> = {
  // Полезная нагрузка ответа
  data: T

  // Системный код ответа (0 - успех)
  code: number

  // Системное сообщение (OK - успех)
  message: string

  // ID запроса для отладки
  request_id: string
}

export type TPageInfo = {
  page: number
  page_size: number
  total_number: number
  total_page: number
}

const devices = [
  'iPhone 11 Pro Max/XS Max',
  'iPhone 11 Pro/X/XS',
  'iPhone 11/XR',
  'iPhone 6/6s/7/8',
  'iPhone 6/7/8 Plus',
  'iPhone 5/5s/5c/SE',
  'iPhone 4/4s',
  'OPPO A3s',
  'OPPO A5s',
  'OPPO A71',
  'OPPO F7',
  'OPPO F9',
  'OPPO R15',
  'VIVO Y91i',
  'VIVO X20A',
  'RedMi 5A',
  'RedMi 6A',
  'RedMi Y2',
  'Redmi Note 4',
  'RedMi Note 5 Pro',
  'RedMi Note 6 Pro',
  'SAMSUNG Galaxy J2',
  'SAMSUNG Galaxy J2 Prime',
  'SAMSUNG Galaxy J7 Nxt',
  'SAMSUNG Galaxy J7 Prime',
  'SAMSUNG Galaxy A10',
  'SAMSUNG Galaxy S8',
  'HUAWEI P30',
  'Google Pixel 3XL',
]

/**
 * Тип пользовательского устройства.
 * Нужен для предпросмотра рекламного объявления.
 * @see TikTokCreativeApi.previewAd
 */
export type TUserDevice = typeof devices[number]
