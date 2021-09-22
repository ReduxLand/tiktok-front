<template>
  <v-menu
    right
    bottom
    :offset-y="true"
    min-width="400"
    max-width="400"
    max-height="500"
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
          :value="notificationsCount"
          :content="notificationsCount"
        >
          <v-icon
            size="30"
            color="primary"
          >
            mdi-bell
          </v-icon>
        </v-badge>
      </v-btn>
    </template>

    <v-list class="pa-0">
      <template v-if="notifications.length <= 0">
        <v-list-item>
          <v-list-item-content>Нет уведомлений</v-list-item-content>
        </v-list-item>
      </template>

      <template v-else>
        <v-list-item>
          <v-row class="justify-end">
            <v-btn
              elevation="0"
              color="transparent"
              @click="clearNotifications"
            >
              <v-icon left>
                mdi-bell-remove-outline
              </v-icon>
              Очистить всё
            </v-btn>
          </v-row>
        </v-list-item>

        <v-list-item
          v-for="(item, i) in notifications.slice().reverse()"
          :key="i"
          class="d-block min-height-0 px-0"
        >
          <v-alert
            text
            tile
            dense
            class="ma-0"
            border="left"
            :type="item.type"
            :icon="getNotificationIcon(item.type)"
          >
            {{ item.message }}
          </v-alert>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Notifications',
  computed: {
    ...mapGetters({
      notifications: 'notifier/notifications',
      notificationsCount: 'notifier/notificationsCount',
    }),
  },
  methods: {
    clearNotifications() {
      this.$notifier.log.clear()
    },
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
  },
}
</script>

<style scoped>
.min-height-0 {
  min-height: 0 !important;
}
</style>
