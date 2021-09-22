<template>
  <v-container>
    <v-col>
      <h1>{{ title }}</h1>
      <v-divider width="400px"/>
    </v-col>

    <v-row class="col mt-2 ml-0">
      <v-btn
        outlined
        class="mr-3"
        color="success"
        to="/campaigns/new"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        Новый залив
      </v-btn>

      <v-btn
        text
        class="mr-3"
        elevation="0"
        @click="refreshData"
      >
        <v-icon left>
          mdi-refresh
        </v-icon>
        Обновить
      </v-btn>
    </v-row>

    <v-col class="col-12">
      <v-tabs slider-color="blue lighten-4">
        <v-tab>Кампании</v-tab>
        <v-tab>Заливы</v-tab>

        <v-tab-item>
          <CampaignsTable :items="campaigns"></CampaignsTable>
        </v-tab-item>

        <v-tab-item>
          <CampaignLoadsTable :items="campaignLoads"></CampaignLoadsTable>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-container>
</template>

<script>
import CampaignsTable from '@/components/campaigns/CampaignsTable'
import CampaignLoadsTable from '@/components/campaigns/CampaignLoadsTable'

export default {
  components: {
    CampaignLoadsTable,
    CampaignsTable,
  },
  layout: 'dashboard',
  head: () => ({
    title: 'Рекламные кампании',
  }),
  data: () => ({
    title: 'Рекламные кампании',
    campaigns: [],
    campaignLoads: [],
  }),
  methods: {
    refreshData() {
      this.$Campaign
        .list()
        .then((campaigns) => {
          this.campaigns = campaigns
        })
        .catch((err) => {
          this.$notifier.show(err.message, 'error')
        })
      this.$Campaign
        .listLoads()
        .then((campaignLoads) => {
          this.campaignLoads = campaignLoads
        })
        .catch((err) => {
          this.$notifier.show(err.message, 'error')
        })
    },
  },
  created() {
    this.refreshData()
  },
}
</script>
