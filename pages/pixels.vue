<template>
  <v-container>
    <v-col>
      <h1>{{ title }}</h1>
      <v-divider width="400px"/>
    </v-col>

    <v-row class="col mt-2 ml-0">
      <v-btn
        outlined
        class="mr-3"
        color="success"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        Добавить
      </v-btn>

      <v-btn
        text
        class="mr-3"
        elevation="0"
        @click="refreshData"
      >
        <v-icon left>
          mdi-refresh
        </v-icon>
        Обновить
      </v-btn>
    </v-row>

    <v-col>
      <PixelsTable :items="[{name: 'test', type: 'test', events: []}]"></PixelsTable>
    </v-col>
  </v-container>
</template>

<script>
import PixelsTable from '@/components/pixels/PixelsTable'
export default {
  components: { PixelsTable },
  layout: 'dashboard',
  head: () => ({
    title: 'Пиксели и события'
  }),
  data: () => ({
    title: 'Пиксели и события'
  }),
  methods: {
    refreshData() {
      //
    },
  },
}
</script>

<style scoped>

</style>
