export enum EAudienceSource {
  Engagement = 'ENGAGEMENT', // Engagement Audience.
  Pixel = 'PIXEL', // Website Traffic Audience.
  App = 'APP', // App Activity Audience.
}

export enum EAudienceType {
  Custom = 'CUSTOM_AUDIENCE', // Customize your audience. Not supported if objective_type is TRAFFIC.
  IncludeInteract = 'INCLUDE_INTERACT_USERS', // Include audience who have interacted with your App.
  ExcludeInteract = 'EXCLUDE_INTERACT_USERS', // Exclude audience who have interacted with your App. Not supported if objective_type is CONVERSIONS.
  IncludeRule = 'INCLUDE_SPECIFIC_EVENTS ', // Include audience who satisfy specific audience_rule.
  ExcludeRule = 'EXCLUDE_SPECIFIC_EVENTS ', // Exclude audience who satisfy specific audience_rule. Not supported if objective_type is CONVERSIONS.
}

export enum EAudienceAgeRange {
  Age13_17 = 'AGE_13_17',
  Age18_24 = 'AGE_18_24',
  Age25_34 = 'AGE_25_34',
  Age35_44 = 'AGE_35_44',
  Age45_54 = 'AGE_45_54',
  Age55_100 = 'AGE_55_100',
}

export enum EAudienceGender {
  Mix = 'GENDER_UNLIMITED',
  Male = 'GENDER_MALE',
  Female = 'GENDER_FEMALE',
}

// Лол
export enum EAudienceNetworkType {
  Any = 'unlimited', // Любое соединение.
  Wifi = 'WIFI',
  '2G' = '2G',
  '3G' = '3G',
  '4G' = '4G',
}

export enum EAudienceOS {
  Android = 'ANDROID',
  iOS = 'IOS',
  PC = 'PC',
}

export enum EAudienceAndroidVersion {
  None = 'NONE', // No limitation.
  '0.0' = '0.0', // No limitation
  '2.0' = '2.0',
  // TODO
}

export enum EAudienceIOSVersion {
  None = 'NONE', // No limitation.
  '0.0' = '0.0', // No limitation
  '4.0' = '4.0',
  // TODO
}

export enum EAudienceLanguage {
  ru = 'ru',
  en = 'en',
  uk = 'uk',
  de = 'de',
  fr = 'fr',
  it = 'it',
  pt = 'pt',
  pl = 'pl',
  cs = 'cs',
  es = 'es',
  ro = 'ro',
  hu = 'hu',
  sv = 'sv',
  fi = 'fi',
  vi = 'vi',
  th = 'th',
  ja = 'ja',
  ko = 'ko',
  hi = 'hi',
  ms = 'ms',
  gu = 'gu',
  gr = 'gr', // TODO проверить
  mr = 'mr',
  kn = 'kn',
  bn = 'bn',
  or = 'or',
  ta = 'ta',
  ml = 'ml',
  pa = 'pa',
  te = 'te',
  tr = 'tr',
  ar = 'ar',
  el = 'el',
  km = 'km',
  id = 'id',
  as = 'as',
  bh = 'bh',
  nl = 'nl',
  he = 'he',
  bgc = 'bgc',
  raj = 'raj',
  zhHant = 'zh-Hant',
}

// TODO взять JSON с документации TikTok API
export enum EAudienceGeoLocation {
  Russia = 2017370,
  Egypt = 357994,
  Indonesia = 1643084,
  Japan = 1861060,
  Korea = 1835841,
  SaudiArabia = 102358,
  Turkey = 298795,
  Thailand = 1605651,
  UnitedArabEmirates = 290557,
}
