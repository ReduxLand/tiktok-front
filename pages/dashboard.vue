<template>
  <v-container>
    <v-col>
      <h1>{{ title }}</h1>
      <v-divider width="400px" />
    </v-col>

    <v-col class="col-12 col-md-6 col-lg-4 col-xl-2">
      <v-card>
        <v-card-title>Статистика</v-card-title>
        <v-card-text>TODO</v-card-text>
        <v-card-actions>
          <v-btn elevation="0">Обновить</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
  head: () => ({
    title: 'Dashboard',
  }),
  data: () =>({
    title: 'Панель информации',
  })
}
</script>
