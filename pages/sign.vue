<template>
  <v-container
    fluid
    class="pa-0 h-100 d-flex flex-row"
  >
    <div
      class="background left-bar fill-height d-flex flex-column justify-space-between pa-3 elevation-5"
    >
      <h1 class="text-white">TikTok Zalivator v0.1 ♪</h1>
      <v-img
        class="flex-grow-0"
        src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/ads/marketing_api/images/login.b27fd3e6a847df3707d8558be29de59a.png"
      ></v-img>
      <h4 class="font-weight-light text-right text-white">© ReduxLand, 2021.</h4>
    </div>

    <v-col class="d-flex align-center">
      <v-card
        width="400"
        class="mx-auto elevation-24 overflow-hidden"
        rounded="xl"
      >
        <v-tabs
          v-model="tab"
          grow
        >
          <v-tabs-slider color="blue lighten-4"></v-tabs-slider>

          <v-tab v-for="(tab, key) in tabs" :key="key">
            <v-icon>{{ tab.icon }}</v-icon>
            <div class="ml-2 py-1">{{ tab.name }}</div>
          </v-tab>

          <v-tab-item>
            <v-card class="px-4 py-3 elevation-0">
              <v-card-text>
                <v-form
                  ref="loginForm"
                  class="text-left"
                  v-model="isLoginValid"
                  lazy-validation
                >
                  <v-text-field
                    dense
                    rounded
                    outlined
                    required
                    label="Имя пользователя"
                    v-model="username"
                    :rules="usernameRules"
                    prepend-inner-icon="mdi-account"
                    @keydown.enter="validate('login')"
                  ></v-text-field>

                  <v-text-field
                    dense
                    rounded
                    outlined
                    label="Пароль"
                    name="input-10-1"
                    prepend-inner-icon="mdi-lock"
                    v-model="password"
                    :append-icon="isShowPassword ? 'eye' : 'eye-off'"
                    :rules="[passwordRules.required]"
                    :type="isShowPassword ? 'text' : 'password'"
                    @keydown.enter="validate('login')"
                    @click:append="isShowPassword = !isShowPassword"
                  ></v-text-field>

                  <v-btn
                    large
                    rounded
                    color="indigo"
                    class="text-white"
                    :disabled="!isLoginValid"
                    @click="validate('login')"
                  >
                    Войти
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card class="px-4 py-3 elevation-0">
              <v-card-text>
                <v-form
                  ref="registerForm"
                  class="text-right"
                  v-model="isRegisterValid"
                >
                  <v-text-field
                    dense
                    rounded
                    outlined
                    required
                    label="Имя пользователя"
                    v-model="username"
                    :rules="usernameRules"
                    prepend-inner-icon="mdi-account"
                    @keydown.enter="validate('register')"
                  ></v-text-field>

                  <v-text-field
                    dense
                    rounded
                    outlined
                    counter
                    label="Пароль"
                    name="input-10-1"
                    hint="Не менее 8 символов"
                    prepend-inner-icon="mdi-lock"
                    v-model="password"
                    :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[passwordRules.required, passwordRules.min]"
                    :type="isShowPassword ? 'text' : 'password'"
                    @keydown.enter="validate('register')"
                    @click:append="isShowPassword = !isShowPassword"
                  ></v-text-field>

                  <v-text-field
                    dense
                    rounded
                    outlined
                    counter
                    name="input-10-1"
                    label="Повторите пароль"
                    prepend-inner-icon="mdi-lock-check"
                    v-model="verifyPassword"
                    :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[passwordRules.required, passwordMatch]"
                    :type="isShowPassword ? 'text' : 'password'"
                    @keydown.enter="validate('register')"
                    @click:append="isShowPassword = !isShowPassword"
                  ></v-text-field>

                  <v-btn
                    large
                    rounded
                    color="indigo"
                    class="text-white"
                    :disabled="!isRegisterValid"
                    @click="validate('register')"
                  >
                    Зарегистрироваться
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-col>

    <v-snackbar
      right
      top
      rounded
      elevation="15"
      color="red lighten-2"
      v-model="error.isShow"
      :timeout="error.timeout"
    >
      {{ error.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          text
          color="white"
          v-bind="attrs"
          @click="error.isShow = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  head: () => ({
    title: 'Авторизация',
  }),
  data: () => ({
    tab: 0,
    tabs: [
      { name: 'Вход', icon: 'mdi-account-lock' },
      { name: 'Регистрация', icon: 'mdi-account-key' },
    ],
    username: '',
    password: '',
    verifyPassword: '',
    isLoginValid: false,
    isRegisterValid: false,
    isShowPassword: false,
    usernameRules: [
      v => !!v || 'Необходимо заполнить поле',
    ],
    passwordRules: {
      required: value => !!value || 'Необходимо заполнить поле',
      min: v => (v && v.length >= 8) || 'Минимум 8 символов',
    },
    error: {
      isShow: false,
      timeout: 4000,
      message: '',
    }
  }),
  computed: {
    passwordMatch() {
      return () => this.password === this.verifyPassword || 'Пароли должны совпадать'
    }
  },
  methods: {
    validate(type) {
      switch (type) {
        case 'login':
          if (this.$refs.loginForm.validate()) {
            return this.$Auth
              .login({ username: this.username, password: this.password })
              .then(() => this.$router.push('/dashboard'))
              .catch(({ message }) => this.showError(message))
          }
          return this.showError('Неизвестная ошибка валидации формы')
        case 'register':
          if (this.$refs.registerForm.validate()) {
            return this.$Auth
              .register({ username: this.username, password: this.password })
              .then(() => this.$router.push('/dashboard'))
              .catch(({ message }) => this.showError(message))
          }
          return this.showError('Неизвестная ошибка валидации формы')
        default:
          return this.showError('Неизвестное действие модуля авторизации')
      }
    },
    reset() {
      this.$refs.registerForm.reset()
    },
    resetValidation() {
      this.$refs.registerForm.resetValidation()
    },
    showError(message) {
      this.error.isShow = true
      this.error.message = message
    },
  },
}
</script>

<style lang="scss" scoped>
.h-100 {
  height: 100vh;
}

.left-bar {
  width: 420px;
}

.text-white {
  color: white !important;
}

.background {
  background: url(https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg) no-repeat top center;
  background-size: cover;
}
</style>
