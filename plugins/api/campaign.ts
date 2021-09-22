import { Context, Plugin } from '@nuxt/types'
import { ICampaignApi } from '~/api/campaign/types'
import { CampaignApi } from '~/api/campaign'

declare module 'vue/types/vue' {
  interface Vue {
    $Campaign: ICampaignApi
  }
}

// Плагин для работы с метаданными рекламных кампаний (независимо от ТикТока).
const plugin: Plugin = (
  context: Context,
  inject,
) => {
  const { $axios } = context
  if (!$axios) {
    return console.error('Axios init failure!')
  }

  inject('Campaign', new CampaignApi($axios))
}

export default plugin
