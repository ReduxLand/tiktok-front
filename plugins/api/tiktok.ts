import { Context, Plugin } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { TikTokAdApi } from '~/api/tiktok/api/ad'
import { TAdListResponse } from '~/api/tiktok/api/ad/types'
import { TikTokAdGroupApi } from '~/api/tiktok/api/adgroup'
import { TAdGroupListResponse } from '~/api/tiktok/api/adgroup/types'
import { TikTokCampaignApi } from '~/api/tiktok/api/campaign'
import { TCampaignListResponse } from '~/api/tiktok/api/campaign/types'

// Описываем тайпингами контекст TikTok API, который будет доступен внутри экземпляра Vue
declare module 'vue/types/vue' {
  interface Vue {
    // TODO
    $TikTok: {
      ads: {
        list: (accountId: string, advertiserId: string) => Promise<TAdListResponse>
      },
      adGroups: {
        list: (accountId: string, advertiserId: string) => Promise<TAdGroupListResponse>
      },
      campaigns: {
        list: (accountId: string, advertiserId: string) => Promise<TCampaignListResponse>
      }
    }
  }
}

declare module '@nuxt/types' {
  interface Context {
    $axios: NuxtAxiosInstance
  }
}

// Плагин для работы с TikTok API вызовами, пробрасываемыми через бэкенд.
const plugin: Plugin = (
  context: Context,
  inject,
) => {
  const { $axios } = context
  if (!$axios) {
    return console.error('Axios init failure!')
  }

  // Бизнес-логика TikTok API, которая будет доступна внутри контекста экземпляра Vue. Тайпинги для этого описаны выше.
  inject('TikTok', {
    ads: new TikTokAdApi($axios),
    adGroups: new TikTokAdGroupApi($axios),
    campaigns: new TikTokCampaignApi($axios),
  })
}

export default plugin
