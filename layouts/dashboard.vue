<template>
  <v-app dark>
    <MainMenu></MainMenu>

    <v-app-bar
      :clipped-left="clipped"
      color="transparent"
      elevation="0"
      class="pt-3"
      fixed
    >
      <v-spacer/>
      <!--      <v-btn-->
      <!--        icon-->
      <!--        @click.stop="rightDrawer = !rightDrawer"-->
      <!--      >-->
      <!--        <v-icon>mdi-menu</v-icon>-->
      <!--      </v-btn>-->
      <v-container>
        <v-row class="justify-end flex-grow-0">
          <ActiveTasks></ActiveTasks>

          <Notifications></Notifications>

          <UserMenu></UserMenu>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-slide-x-transition mode="out-in">
        <nuxt class="pa-3"/>
      </v-slide-x-transition>
    </v-main>

    <!--    <v-navigation-drawer-->
    <!--      v-model="rightDrawer"-->
    <!--      :right="right"-->
    <!--      temporary-->
    <!--      fixed-->
    <!--    >-->
    <!--      <v-list>-->
    <!--        <v-list-item @click.native="right = !right">-->
    <!--          <v-list-item-action>-->
    <!--            <v-icon light>-->
    <!--              mdi-repeat-->
    <!--            </v-icon>-->
    <!--          </v-list-item-action>-->
    <!--          <v-list-item-title>Switch drawer (click me)</v-list-item-title>-->
    <!--        </v-list-item>-->
    <!--      </v-list>-->
    <!--    </v-navigation-drawer>-->
    <!--    <v-footer-->
    <!--      :absolute="!fixed"-->
    <!--      app-->
    <!--    >-->
    <!--      <span>&copy; {{ new Date().getFullYear() }}</span>-->
    <!--    </v-footer>-->

    <NotificationSnackbar></NotificationSnackbar>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import io from 'socket.io-client'
import ActiveTasks from '@/components/ActiveTasks'
import MainMenu from '@/components/MainMenu'
import Notifications from '@/components/Notifications'
import NotificationSnackbar from '@/components/NotificationSnackbar'
import UserMenu from '@/components/UserMenu'

export default {
  components: {
    ActiveTasks,
    MainMenu,
    Notifications,
    NotificationSnackbar,
    UserMenu,
  },
  data() {
    return {
      title: 'TikTok ♪',

      // Плагин регистрирует сокет глобально, что вызывает много проблем. Используем его локально в нужном лейауте.
      socket: process.client
        ? io(this.$config.io?.uri || '', {
          auth: {
            token: this.$cookies.get('session') || '',
          },
        })
        : null,

      // Триггеры App Bar
      fixed: false,
      clipped: false,

      // Триггеры правого меню (пока не нужны)
      right: true,
      rightDrawer: false,
    }
  },
  methods: {
    ...mapActions({
      addTask: 'tasker/TASK_ADD',
      doneTask: 'tasker/TASK_DONE',
      taskSuccessProgress: 'tasker/TASK_SUCCESS_PROGRESS',
      taskFailureProgress: 'tasker/TASK_FAILURE_PROGRESS',
    }),
    setSocketReconnectionListener() {
      if (process.client && this.socket) {
        // При каждой ошибке подключения будет отрабатывать эта функция, поэтому мы вешаем .once на реконнект, чтобы не
        // плодить лишних листнеров (при втором подключении будет показано два одинаковых сообщения об успешном реконнекте,
        // потом 3 и т.д.). Once решает эту проблему, т.к. на каждом дисконнекте мы вешаем одноразовый листнер реконнекта.
        // Но если оставить .on на connect_error, он почему-то отрабатывает 2 раза, и соответственно, получаем два уведомления
        // о дисконнекте и два о реконнекте. Поэтому сделал вот так.
        this.socket.once('connect_error', () => {
          this.socket.once('connect', () => {
            this.$notifier.show('Подключение к серверу real-time уведомлений восстановлено.', 'info')
            this.setSocketReconnectionListener()
          })
          this.$notifier.show('Потеряна связь с сервером real-time уведомлений. Информирование временно недоступно.', 'error')
        })
      }
    },
    consoleLogSubtask(taskName, log) {
      if (!log.isDone) {
        console.log(
          `%c${ taskName } %c Processing %c ${ log.description }`,
          'color: black; font-weight: bold;',
          'color: white; font-weight: bold; background-color: blue;',
          'color: blue;',
        )
      } else if (log.isDone && log.isSucceed) {
        console.log(
          `%c${ taskName } %c Success %c ${ log.description }`,
          'color: black; font-weight: bold;',
          'color: white; font-weight: bold; background-color: lime;',
          'color: lime;',
        )
      } else if (log.isDone && !log.isSucceed) {
        console.log(
          `%c${ taskName } %c Error %c ${ log.description } %cПричина: ${ log.error }`,
          'color: black; font-weight: bold;',
          'color: white; font-weight: bold; background-color: red;',
          'color: red;',
          'color: red; font-weight: bold;',
        )
      }
    },
  },
  created() {
    // TODO вынести это куда-нибудь
    if (process.client && this.socket) {
      this.setSocketReconnectionListener()
      this.socket.on('task:list', (taskList) => taskList.map((task) => this.addTask(task)))
      this.socket.on('task:new', (task) => this.addTask(task))
      this.socket.on('task:init', (taskName) => {})
      this.socket.on('task:run', (taskName) => {})
      this.socket.on('task:done', (task) => {
        this.doneTask(task.name)
        const message = task.progress.failure > 0
          ? 'Залив кампании "' + task.name + '" был выполнен с некоторыми ошибками.'
          : 'Залив кампании "' + task.name + '" был успешно завершён.'
        const type = task.progress.failure > 0
          ? 'warning'
          : 'success'
        this.$notifier.show(message, type)
      })
      this.socket.on('task:progress:success', (taskName, progress) => this.taskSuccessProgress({ taskName, progress }))
      this.socket.on('task:progress:failure', (taskName, progress) => this.taskFailureProgress({ taskName, progress }))
      this.socket.on('task:subtask:new', this.consoleLogSubtask)
      this.socket.on('task:subtask:update', this.consoleLogSubtask)
    }
  },
  mounted() {
    this.socket.emit('test')
  },
  beforeDestroy() {
    if (process.client && this.socket) {
      this.socket.disconnect()
    }
  },
}
</script>

<style>
.v-application {
  color: #4c4c4c !important;
}

.pointer {
  cursor: pointer;
}

.text-black {
  color: black;
}
</style>
