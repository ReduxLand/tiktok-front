<template>
  <v-col class="col-12 col-md-8 col-lg-6 mx-auto text-center">
    <v-col class="mt-10">
      <h1 class="text-h2 font-weight-bold">Подключение аккаунта TikTok</h1>
    </v-col>

    <v-divider class="my-5"></v-divider>

    <v-col>
      <v-fade-transition mode="out-in">
        <h3
          class="text-h3 font-weight-thin"
          :key="condition"
        >
          {{ conditionText }}
        </h3>
      </v-fade-transition>
    </v-col>

    <v-col>
      <v-scroll-y-transition mode="out-in">
        <v-progress-circular
          v-if="isProcessing"
          :key="1"
          width="5"
          size="70"
          color="indigo"
          indeterminate
        ></v-progress-circular>

        <v-icon
          v-if="isSuccess"
          :key="2"
          size="70"
          color="success"
        >
          mdi-check
        </v-icon>

        <v-icon
          v-if="isFailure"
          :key="3"
          size="70"
          color="error"
        >
          mdi-close-thick
        </v-icon>
      </v-scroll-y-transition>
    </v-col>
  </v-col>
</template>

<script>
const CONDITION_SUCCESS = 'success'
const CONDITION_FAILURE = 'failure'
const CONDITION_PROCESSING = 'processing'

const ConditionText = {
  [CONDITION_SUCCESS]: 'Готово',
  [CONDITION_FAILURE]: 'Ошибка',
  [CONDITION_PROCESSING]: 'Получение Access Token',
}

export default {
  head: () => ({
    title: 'Подключение аккаунта',
  }),
  data() {
    return {
      condition: CONDITION_PROCESSING,
    }
  },
  computed: {
    conditionText() {
      return ConditionText[this.condition]
    },
    isSuccess() {
      return this.condition === CONDITION_SUCCESS
    },
    isFailure() {
      return this.condition === CONDITION_FAILURE
    },
    isProcessing() {
      return this.condition === CONDITION_PROCESSING
    }
  },
  created() {
    if (process.client) {
      const { auth_code: authCode } = this.$route.query

      if (!authCode) {
        return this.condition = CONDITION_FAILURE
      }

      this.$TikTokAccount
        .connect(authCode.toString())
        .then(() => this.condition = CONDITION_SUCCESS)
        .catch(() => this.condition = CONDITION_FAILURE)
        .then(() => setTimeout(() => {
          if (process.client && window) {
            window.close()
          }
        }, 2000))

    }
  }
}
</script>
