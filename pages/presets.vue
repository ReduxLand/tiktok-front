<template>
  <v-container>
    <v-col>
      <h1>{{ title }}</h1>
      <v-divider width="400px" />
    </v-col>

    <v-col>
      <h3>#TODO</h3>
    </v-col>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
  head: () => ({
    title: 'Пресеты кампаний'
  }),
  data: () => ({
    title: 'Пресеты кампаний'
  })
}
</script>

<style scoped>

</style>
