<template>
  <v-menu
    right
    bottom
    :offset-y="true"
    min-width="400"
    max-width="400"
    transition="slide-x-transition"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        elevation="2"
        class="mx-2"
        v-bind="attrs"
        v-on="on"
      >
        <v-badge
          bottom
          color="green"
          :value="tasksCount"
          :content="tasksCount"
        >
          <v-icon
            size="30"
            color="primary"
          >
            mdi-play-network
          </v-icon>
        </v-badge>
      </v-btn>
    </template>

    <v-list class="pa-0">
      <template v-if="tasksCount <= 0">
        <v-list-item>
          <v-list-item-content>Нет активных задач</v-list-item-content>
        </v-list-item>
      </template>

      <template v-else>
        <v-list-item
          v-for="(item, i) in tasks"
          :key="i"
          @click=""
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.name"/>
            <v-list-item-subtitle v-text="item.type"/>
            <v-list-item-subtitle>
              <v-progress-linear
                stream
                :color="item.progress.failure > 0 ? 'warning' : 'success'"
                :value="item.progress.success"
                :buffer-value="item.progress.success + item.progress.failure"
              ></v-progress-linear>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ActiveTasks',
  computed: {
    ...mapGetters({
      tasks: 'tasker/tasks',
      tasksCount: 'tasker/tasksCount',
    }),
  },
  methods: {
    getTaskLabel(type) {
      switch (type) {
        case 'CampaignLoad':
          return 'Залив рекламной кампании'
        default:
          return 'Фоновая задача'
      }
    },
  },
}
</script>
