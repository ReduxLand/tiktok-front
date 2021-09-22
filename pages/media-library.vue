<template>
  <v-container>
    <v-col>
      <h1>{{ title }}</h1>
      <v-divider width="400px" />
    </v-col>

    <v-row class="col mt-2 ml-0">
      <v-btn
        outlined
        class="mr-3"
        color="success"
        @click.stop="showUploadDialog = true"
      >
        <v-icon left>
          mdi-cloud-upload
        </v-icon>
        Загрузить
      </v-btn>

      <v-btn
        outlined
        class="mr-3"
        color="success"
      >
        <v-icon left>
          mdi-cloud-download
        </v-icon>
        Импортировать
      </v-btn>

      <v-btn
        text
        class="mr-3"
        elevation="0"
      >
        <v-icon left>
          mdi-refresh
        </v-icon>
        Обновить
      </v-btn>
    </v-row>

    <v-col>
      <h1>#TODO</h1>
    </v-col>

    <v-dialog
      max-width="700"
      v-model="showUploadDialog"
    >
      <v-card>
        <v-card-title>Загрузка креативов</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                dense
                outlined
                hide-details
                label="Название креатива"
                v-model="uploadDialog.name"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-file-input
                dense
                outlined
                show-size
                hide-details
                label="Файл креатива"
                accept=".mp4,.mov,.mpeg,.3gp,.avi"
                v-model="uploadDialog.file"
              ></v-file-input>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="text-right">
              <v-btn
                dense
                color="success"
                :disabled="isUploadAllowed"
                @click="uploadCreative"
              >
                <v-icon left>mdi-cloud-upload</v-icon>
                Загрузить
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
  head: () => ({
    title: 'Библиотека креативов'
  }),
  data: () => ({
    title: 'Библиотека креативов',
    showUploadDialog: false,
    showImportDialog: false,
    uploadDialog: {
      name: '',
      file: null,
      isAllowed: false,
    },
  }),
  computed: {
    isUploadAllowed() {
     return !this.uploadDialog.file
    },
  },
  methods: {
    uploadCreative() {
      console.log(this.uploadDialog.file)
    },
  },
}
</script>

<style scoped>

</style>
