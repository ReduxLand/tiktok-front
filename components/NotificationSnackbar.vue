<template>
  <v-snackbar
    bottom
    right
    rounded
    light
    elevation="5"
    min-height="40"
    min-width="400"
    max-width="400"
    v-model="isShow"
    :timeout="timeout"
    class="pa-0"
    content-class="ma-0 pa-0"
    @click="isShow = false"
  >
    <v-alert
      text
      dense
      dismissible
      border="left"
      class="ma-0"
      v-model="isShow"
      :type="notification.type || 'info'"
      :icon="getNotificationIcon(notification.type)"
    >
      {{ notification.message }}
    </v-alert>
  </v-snackbar>
</template>

<script>
export default {
  name: 'NotificationSnackbar',
  data: () => ({
    isShow: false,
    timeout: 4000,
    notification: {
      type: '',
      message: '',
    }
  }),
  methods: {
    getNotificationIcon(type) {
      switch (type) {
        case 'success':
          return 'mdi-check-circle'
        case 'warning':
          return 'mdi-alert'
        case 'error':
          return 'mdi-alert-octagon'
        case 'info':
        default:
          return 'mdi-information'
      }
    },
  },
  created() {
    this.$store.subscribeAction((action) => {
      if (action.type === 'notifier/SHOW') {
        this.isShow = false // Если в данный момент уже показываем уведомление - закрываем его
        this.notification = action.payload
        this.isShow = true
      }
    })
  },
}
</script>
