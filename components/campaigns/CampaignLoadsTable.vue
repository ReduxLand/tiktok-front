<template>
  <div>
    <v-data-table
      dense
      :items="items"
      :headers="headers"
      :page.sync="page"
      :items-per-page="50"
      hide-default-footer
      class="row-pointer"
      @click:row="showDetails"
      @page-count="pageCount = $event"
      no-data-text="Нет сохранённых заливов"
      no-results-text="Нет сохранённых заливов"
    >
      <template v-slot:item.adGroup.gender="{ item }">
        <v-chip
          small
          label
          color="primary"
          class="text-uppercase"
        >
          {{ enums.gender[item.adGroup.gender] || '?' }}
        </v-chip>
      </template>

      <template v-slot:item.adGroup.languages="{ item }">
        <v-chip-group>
          <v-chip
            small
            label
            color="primary"
            class="text-uppercase"
            v-for="(language, index) in item.adGroup.languages"
            :key="index"
          >
            {{ language || '?' }}
          </v-chip>
        </v-chip-group>
      </template>

      <template v-slot:item.adGroup.age="{ item }">
        <v-chip-group v-if="item.adGroup.age && item.adGroup.age.length > 0">
          <v-chip
            small
            label
            outlined
            color="primary"
            v-for="(age, index) in item.adGroup.age"
            :key="index"
          >
            {{ enums.age[age] || '?' }}
          </v-chip>
        </v-chip-group>

        <v-chip
          v-else
          small
          label
          outlined
          color="primary"
        >
          No Limit
        </v-chip>
      </template>
    </v-data-table>

    <div
      class="text-center pt-2"
      v-if="items.length > 50"
    >
      <v-pagination
        v-model="page"
        :length="pageCount"
      ></v-pagination>
    </div>

    <v-dialog
      scrollable
      max-width="700"
      v-model="isShowingDetails"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{ currentLoad.title }}
        </v-card-title>

        <v-card-subtitle>
          {{ currentLoad.type }}
        </v-card-subtitle>

        <v-card-subtitle>
          <v-progress-linear
            stream
            :color="currentLoad.progress.failure > 0 ? 'warning' : 'success'"
            :value="currentLoad.progress.success"
            :buffer-value="currentLoad.progress.success + currentLoad.progress.failure"
          ></v-progress-linear>
        </v-card-subtitle>

        <v-tabs centered slider-color="blue lighten-4">
          <v-tab>Все</v-tab>
          <v-tab>В процессе</v-tab>
          <v-tab>Ошибки</v-tab>
          <v-tab>Успех</v-tab>

          <v-tab-item>
            <v-list class="pa-0">
              <template v-if="currentLoad.log.all.length <= 0">
                <v-list-item>
                  <v-list-item-content>Нет логов</v-list-item-content>
                </v-list-item>
              </template>

              <template v-else>
                <v-list-item
                  v-for="(item, i) in currentLoad.log.all"
                  :key="i"
                  class="d-block min-height-0 px-0"
                >
                  <v-alert
                    text
                    tile
                    dense
                    border="left"
                    class="ma-0"
                    :type="getLogType(item)"
                  >
                    {{ item.description }}
                    <code class="d-block" v-if="item.error">
                      <ul>
                        <li>{{ item.error }}</li>
                      </ul>
                    </code>
                  </v-alert>
                </v-list-item>
              </template>
            </v-list>
          </v-tab-item>

          <v-tab-item>
            <v-list class="pa-0">
              <template v-if="currentLoad.log.inProgress.length <= 0">
                <v-list-item>
                  <v-list-item-content>Нет логов</v-list-item-content>
                </v-list-item>
              </template>

              <template v-else>
                <v-list-item
                  v-for="(item, i) in currentLoad.log.inProgress"
                  :key="i"
                  class="d-block min-height-0 px-0"
                >
                  <v-alert
                    text
                    tile
                    dense
                    border="left"
                    class="ma-0"
                    :type="getLogType(item)"
                  >
                    {{ item.description }}
                    <code class="d-block" v-if="item.error">
                      <ul>
                        <li>{{ item.error }}</li>
                      </ul>
                    </code>
                  </v-alert>
                </v-list-item>
              </template>
            </v-list>
          </v-tab-item>

          <v-tab-item>
            <v-list class="pa-0">
              <template v-if="currentLoad.log.error.length <= 0">
                <v-list-item>
                  <v-list-item-content>Нет логов</v-list-item-content>
                </v-list-item>
              </template>

              <template v-else>
                <v-list-item
                  v-for="(item, i) in currentLoad.log.error"
                  :key="i"
                  class="d-block min-height-0 px-0"
                >
                  <v-alert
                    text
                    tile
                    dense
                    border="left"
                    class="ma-0"
                    :type="getLogType(item)"
                  >
                    {{ item.description }}
                    <code class="d-block" v-if="item.error">
                      <ul>
                        <li>{{ item.error }}</li>
                      </ul>
                    </code>
                  </v-alert>
                </v-list-item>
              </template>
            </v-list>
          </v-tab-item>

          <v-tab-item>
            <v-list class="pa-0">
              <template v-if="currentLoad.log.success.length <= 0">
                <v-list-item>
                  <v-list-item-content>Нет логов</v-list-item-content>
                </v-list-item>
              </template>

              <template v-else>
                <v-list-item
                  v-for="(item, i) in currentLoad.log.success"
                  :key="i"
                  class="d-block min-height-0 px-0"
                >
                  <v-alert
                    text
                    tile
                    dense
                    border="left"
                    class="ma-0"
                    :type="getLogType(item)"
                  >
                    {{ item.description }}
                    <code class="d-block" v-if="item.error">
                      <ul>
                        <li>{{ item.error }}</li>
                      </ul>
                    </code>
                  </v-alert>
                </v-list-item>
              </template>
            </v-list>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { EAudienceAgeRange, EAudienceGender } from '@/api/tiktok/types'

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    isShowingDetails: false,
    currentLoad: {
      title: '',
      type: '',
      progress: {
        success: 17,
        failure: 5,
      },
      log: {
        all: [],
        inProgress: [],
        success: [],
        error: [],
      },
    },
    page: 1,
    pageCount: 0,
    headers: [
      {
        text: 'Наименование',
        value: 'campaign.name',
      },
      {
        text: 'Тип',
        value: 'campaign.objective',
      },
      {
        text: 'Пол',
        value: 'adGroup.gender',
      },
      {
        text: 'Гео',
        value: 'adGroup.languages',
        sortable: false,
      },
      {
        text: 'Возраст',
        value: 'adGroup.age',
        sortable: false,
      },
    ],
    enums: {
      age: {
        [EAudienceAgeRange.Age13_17]: '13-17',
        [EAudienceAgeRange.Age18_24]: '18-24',
        [EAudienceAgeRange.Age25_34]: '25-34',
        [EAudienceAgeRange.Age35_44]: '35-44',
        [EAudienceAgeRange.Age45_54]: '45-54',
        [EAudienceAgeRange.Age55_100]: '55+',
      },
      gender: {
        [EAudienceGender.Mix]: 'Mix',
        [EAudienceGender.Male]: 'Male',
        [EAudienceGender.Female]: 'Female',
      },
    },
  }),
  methods: {
    getNotificationIcon(type) {
      switch (type) {
        case 'success':
          return 'mdi-check-circle-outline'
        case 'warning':
          return 'mdi-alert-outline'
        case 'error':
          return 'mdi-alert-octagon-outline'
        case 'info':
        default:
          return 'mdi-information-outline'
      }
    },
    getLogType(item) {
      if (item.isDone && item.isSucceed) {
        return 'success'
      } else if (item.isDone && !item.isSucceed) {
        return 'error'
      } else {
        return 'info'
      }
    },
    showDetails(item) {
      this.currentLoad.title = item.campaign.name
      this.currentLoad.type = item.campaign.objective
      this.currentLoad.progress = item.progress || { success: 100, failure: 0 }
      this.currentLoad.log.all = item.log // TODO если в текущем - .slice().reverse()
      this.currentLoad.log.inProgress = []
      this.currentLoad.log.success = []
      this.currentLoad.log.error = []

      item.log.map((log) => {
        if (log.isDone && log.isSucceed) {
          this.currentLoad.log.success.push(log)
        } else if (log.isDone && !log.isSucceed) {
          this.currentLoad.log.error.push(log)
        } else {
          this.currentLoad.log.inProgress.push(log)
        }
      })

      this.isShowingDetails = true
    }
  },
}
</script>

<style scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}

.min-height-0 {
  min-height: 0 !important;
}
</style>
