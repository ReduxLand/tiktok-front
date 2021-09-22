<template>
  <v-container>
    <v-col>
      <h1>{{ title }}</h1>
      <v-divider width="400px"/>
    </v-col>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
  head: () => ({
    title: 'Подписка',
  }),
  data: () => ({
    title: 'Управление подпиской',
  }),
}
</script>
