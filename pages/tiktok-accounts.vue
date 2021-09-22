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
        :loading="isConnectProcessing"
        @click="connectAccount"
      >
        <v-icon left>
          mdi-account-plus
        </v-icon>
        Подключить
      </v-btn>

      <v-btn
        text
        class="mr-3"
        elevation="0"
        :loading="isDataLoading"
        @click="refreshData"
      >
        <v-icon left>
          mdi-refresh
        </v-icon>
        Обновить
      </v-btn>
    </v-row>

    <v-col class="mt-5">
      <v-row>
        <v-col class="col-12 col-md-auto">
          <v-data-table
            dense
            class="elevation-3 row-pointer"
            :headers="tables[0].headers"
            item-key="id"
            :items="accounts"
            :items-per-page="-1"
            :loading="isDataLoading"
            loading-text="Загрузка..."
            no-data-text="Нет подключенных аккаунтов"
            hide-default-footer
            @click:row="selectAccount"
          ></v-data-table>
        </v-col>

        <v-col class="col-12 col-md-auto">
          <v-data-table
            dense
            class="elevation-3 row-pointer"
            :headers="tables[1].headers"
            item-key="id"
            :items="advertisers"
            :items-per-page="-1"
            :loading="isDataLoading"
            loading-text="Загрузка..."
            no-data-text="Нет доступных рекламных аккаунтов"
            hide-default-footer
            @click:row="selectAdvertiser"
          >
            <template v-slot:body="{ items }">
              <tbody>
              <tr
                v-for="item in items"
                :key="item.id"
                @click="selectAdvertiser(item)"
              >
                <!--<td v-for="prop in tables[1].headers">{{ item[prop.value] }}</td>-->
                <td>
                  <v-chip
                    pill
                    x-small
                    text-color="white"
                    :color="item.status === 'STATUS_ENABLE' ? 'success' : 'error'"
                  >
                    {{ item.status === 'STATUS_ENABLE' ? 'ACTIVE' : 'RESTRICTED' }}
                  </v-chip>
                </td>
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
              </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-col>

    <v-dialog
      scrollable
      max-width="1000"
      v-model="advertiserDialog"
      @click:outside="clearAdvertiserData"
    >
      <v-card>
        <v-tabs v-model="advTab">
          <v-tab>Кампании</v-tab>
          <v-tab>Адсеты</v-tab>
          <v-tab>Объявления</v-tab>

          <v-tab-item>
            <v-card-text class="pa-0">
              <v-container class="pa-0">
                <v-col class="col-auto pa-0">
                  <v-data-table
                    dense
                    class="elevation-3 row-pointer"
                    :headers="tables[2].headers"
                    item-key="id"
                    :items="campaigns"
                    :loading="tables[2].isLoading"
                    :items-per-page="-1"
                    loading-text="Загрузка..."
                    no-data-text="Нет рекламных кампаний"
                    hide-default-footer
                    @click:row=""
                  ></v-data-table>
                </v-col>
              </v-container>
            </v-card-text>
          </v-tab-item>

          <v-tab-item>
            <v-card-text class="pa-0">
              <v-container class="pa-0">
                <v-col class="col-auto pa-0">
                  <v-data-table
                    dense
                    class="elevation-3 row-pointer"
                    :headers="tables[3].headers"
                    item-key="id"
                    :items="adGroups"
                    :items-per-page="-1"
                    :loading="tables[3].isLoading"
                    loading-text="Загрузка..."
                    no-data-text="Нет рекламных кампаний"
                    hide-default-footer
                    @click:row=""
                  ></v-data-table>
                </v-col>
              </v-container>
            </v-card-text>
          </v-tab-item>

          <v-tab-item>
            <v-card-text class="pa-0">
              <v-container class="pa-0">
                <v-col class="col-auto pa-0">
                  <v-data-table
                    dense
                    class="elevation-3 row-pointer"
                    :headers="tables[4].headers"
                    item-key="id"
                    :items="ads"
                    :items-per-page="-1"
                    :loading="tables[4].isLoading"
                    loading-text="Загрузка..."
                    no-data-text="Нет рекламных кампаний"
                    hide-default-footer
                    @click:row=""
                  ></v-data-table>
                </v-col>
              </v-container>
            </v-card-text>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
  head: () => ({
    title: 'Аккаунты',
  }),
  data: () => ({
    title: 'Аккаунты TikTok',
    advTab: 0,
    isDataLoading: true,
    isConnectProcessing: false,
    advertiserDialog: false,
    selectedAccountId: null,
    accounts: [],
    advertisers: [],
    campaigns: [],
    adGroups: [],
    ads: [],
    tables: [
      {
        headers: [
          {
            text: 'Account',
            value: 'displayName',
          },
          {
            text: 'Advs',
            value: 'advCount',
          },
        ],
      },
      {
        headers: [
          {
            text: 'Status',
            value: 'status',
          },
          {
            text: 'ID',
            value: 'id',
          },
          {
            text: 'Name',
            value: 'name',
          },
        ],
      },
      {
        isLoading: false,
        headers: [
          {
            text: 'Кампания',
            value: 'campaign_name',
          },
          {
            text: 'Тип',
            value: 'campaign_type',
          },
          {
            text: 'Бюджет',
            value: 'budget',
          },
          {
            text: 'Тип бюджета',
            value: 'budget_mode',
          },
          {
            text: 'Статус',
            value: 'status',
          },
        ],
      },
      {
        isLoading: false,
        headers: [
          {
            text: 'Кампания',
            value: 'campaign_name',
          },
          {
            text: 'Адсет',
            value: 'adgroup_name',
          },
          {
            text: 'Бюджет',
            value: 'budget',
          },
          {
            text: 'Тип бюджета',
            value: 'budget_mode',
          },
          {
            text: 'Статус',
            value: 'status',
          },
        ],
      },
      {
        isLoading: false,
        headers: [
          {
            text: 'Адсет',
            value: 'adgroup_name',
          },
          {
            text: 'Объявление',
            value: 'display_name',
          },
          {
            text: 'Файл',
            value: 'ad_name',
          },
          {
            text: 'Ссылка',
            value: 'landing_page_url',
          },
          {
            text: 'Статус',
            value: 'status',
          },
        ],
      },
    ],
  }),
  methods: {
    listData() {
      this.isDataLoading = true
      this.$TikTokAccount
        .list()
        .then(({ list }) => this.accounts = list.map((account) => {
          // Обновляем рекламщиков выбранного аккаунта, чтобы вторая таблица тоже обновилась
          if (account.id === this.selectedAccountId) {
            this.advertisers = account.advertisers
          }
          // Ставим количество рекламщиков (для первой таблицы)
          account.advCount = account.advertisers.length
          return account
        }))
        .catch(({ message }) => this.$notifier.show(message, 'error'))
        .then(() => this.isDataLoading = false)
    },
    refreshData() {
      this.isDataLoading = true
      this.$TikTokAccount
        .refresh()
        .then(() => this.listData())
        .catch(({ message }) => this.$notifier.show(message, 'error'))
        .then(() => this.isDataLoading = false)
    },
    connectAccount() {
      this.isConnectProcessing = true
      this.$User
        .loadSettings()
        .then((settings) => {
          if (!settings.tiktokApp?.oauthUrl) {
            throw new Error('Сначала нужно указать данные приложения TikTok в настройках профиля.')
          }

          if (process.client && window) {
            window.open(settings.tiktokApp.oauthUrl, '_blank')
          }
        })
        .catch(({ message }) => this.$notifier.show(message, 'error'))
        .then(() => this.isConnectProcessing = false)
    },
    selectAccount(account) {
      this.selectedAccountId = account.id
      this.advertisers = account.advertisers || []
    },
    selectAdvertiser(advertiser) {
      this.tables[2].isLoading = true
      this.tables[3].isLoading = true
      this.tables[4].isLoading = true
      this.advertiserDialog = true

      this.$TikTok.campaigns
        .list(this.selectedAccountId, advertiser.id)
        .then(({ list }) => {
          this.campaigns = list
          this.tables[2].isLoading = false
        })
        .catch(({ message }) => this.$notifier.show(message, 'error'))

      this.$TikTok.adGroups
        .list(this.selectedAccountId, advertiser.id)
        .then(({ list }) => {
          this.adGroups = list
          this.tables[3].isLoading = false
        })
        .catch(({ message }) => this.$notifier.show(message, 'error'))

      this.$TikTok.ads
        .list(this.selectedAccountId, advertiser.id)
        .then(({ list }) => {
          this.ads = list
          this.tables[4].isLoading = false
        })
        .catch(({ message }) => this.$notifier.show(message, 'error'))
    },
    clearAdvertiserData() {
      this.advTab = 0
      this.campaigns = []
      this.adGroups = []
      this.ads = []
    },
  },
  created() {
    this.listData()
  },
}
</script>

<style scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>
