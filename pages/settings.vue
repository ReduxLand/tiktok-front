<template>
  <v-container>
    <v-col>
      <h1>{{ title }}</h1>
      <v-divider width="400px"/>
    </v-col>

    <v-col class="col-12 col-md-8 col-lg-6 col-xl-4">
      <v-alert
        border="left"
        dense
        outlined
        prominent
        type="info"
      >
        В настройках приложения в качестве Callback Address должен быть указан

        <span class="pointer text-decoration-underline" @click="copyOauthUrl">{{ callbackUrl }}</span>

        <v-btn
          icon
          tile
          small
          color="info"
          @click="copyOauthUrl"
        >
          <v-icon>mdi-content-copy</v-icon>
        </v-btn>
      </v-alert>

      <v-card>
        <v-card-title class="font-weight-light">Данные приложения TikTok</v-card-title>
        <v-card-text>
          <v-form
            v-model="isValidForm"
            :disabled="isProcessing"
          >
            <v-text-field
              dense
              outlined
              required
              counter="19"
              label="App ID"
              v-model="settings.tiktokApp.id"
              prepend-inner-icon="mdi-pound-box"
              :rules="validationRules.appId"
              :success="validationRules.appId[0](settings.tiktokApp.id) === true"
              :disabled="isProcessing"
            ></v-text-field>

            <v-text-field
              dense
              outlined
              required
              counter="40"
              label="App Secret"
              v-model="settings.tiktokApp.secret"
              prepend-inner-icon="mdi-lock-check"
              :append-icon="showAppSecret ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="validationRules.appSecret"
              :type="showAppSecret ? 'text' : 'password'"
              :success="validationRules.appSecret[0](settings.tiktokApp.secret) === true"
              :disabled="isProcessing"
              @click:append="showAppSecret = !showAppSecret"
            ></v-text-field>

            <v-text-field
              dense
              outlined
              required
              label="OAuth URL"
              v-model="settings.tiktokApp.oauthUrl"
              prepend-inner-icon="mdi-web"
              :rules="validationRules.appOauth"
              :success="validationRules.appOauth[0](settings.tiktokApp.oauthUrl) === true"
              :disabled="isProcessing"
            ></v-text-field>

            <v-btn
              color="success"
              :disabled="!isValidForm || isProcessing"
              :loading="isProcessing"
              @click="updateSettings"
            >
              Сохранить
            </v-btn>

            <v-tooltip
              bottom
              max-width="275"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-on="on"
                  v-bind="attrs"
                  color="warning"
                  class="ml-3 pointer"
                >
                  mdi-alert
                </v-icon>
              </template>

              <span>
                Внимание! При обновлении секрета приложения в TikTok Ads также меняется Authorized URL.
              </span>
            </v-tooltip>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
/*
Note: установка атрибута success текстового поля выглядит не самым правильным решением, но, к сожалению, Vuetify не
 даёт механизмов получить статус валидации отдельного поля
*/
// TODO на этапе сохранения данных прилы, проверять формат oauth URL и параметр redirect_uri в частности
// TODO сессии пользователя
// TODO история изменения учёток приложений
// TODO возможно нужно больше правил валидации, чтобы информативнее ошибки были, по очереди поставить чек длины, потом регулярку
// TODO faq-popup с описанием всех кейсов, которые могут возникнуть при обновлении учётных данных

export default {
  layout: 'dashboard',
  head: () => ({
    title: 'Настройки',
  }),
  data: () => ({
    title: 'Настройки профиля',
    callbackUrl: '',
    // TUserSettings
    settings: {
      tiktokApp: {
        id: '',
        secret: '',
        oauthUrl: '',
      },
    },
    isValidForm: false, // Флаг валидной формы
    isProcessing: true, // Обновление настроек
    showAppSecret: false, // Флаг отображения секрета приложения
    validationRules: {
      // Указание длины в регулярке {19} работает только на длину меньше 19, а больше валидация почему-то пропускает
      appId: [v => (v && /^\d{19}$/.test(v)) || 'App ID должен состоять только из цифр'],
      appSecret: [v => (v && /^[0-9a-f]{40}$/i.test(v)) || 'App Secret должен состоять только из hex-символов'],
      appOauth: [v => (v && /^https:\/\/ads\.tiktok\.com\/marketing_api\/auth\?[^\/]+/i.test(v)) || 'OAuth URL имеет неверный формат'],
    },
  }),
  methods: {
    updateSettings() {
      this.isProcessing = true
      this.$User
        .updateSettings(this.settings)
        .catch(({ message }) => this.$notifier.show(message, 'error'))
        .then(() => this.isProcessing = false)
    },
    copyOauthUrl() {
      if (navigator) {
        navigator.clipboard.writeText(this.callbackUrl)
      }
    },
  },
  beforeCreate() {
    this.$User
      .loadSettings()
      .then((settings) => this.settings.tiktokApp = settings.tiktokApp || { id: '', secret: '', oauthUrl: '' })
      .catch(({ message }) => this.$notifier.show(message, 'error'))
      .then(() => this.isProcessing = false)
  },
  beforeMount() {
    if (window) {
      const { protocol, host } = window.location
      this.callbackUrl = `${ protocol }//${ host }/connect`
    }
  },
}
</script>
