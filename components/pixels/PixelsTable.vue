<template>
  <div>
    <v-data-table
      dense
      :items="items"
      :headers="headers"
      :page.sync="page"
      :items-per-page="50"
      hide-default-footer
      class="row-pointer"
      @page-count="pageCount = $event"
      no-data-text="Нет сохранённых пикселей"
      no-results-text="Нет сохранённых пикселей"
    >
      <template v-slot:item.type="{ item }">
        <v-chip-group>
          <v-chip
            small
            label
            color="primary"
            class="text-uppercase"
            v-for="(language, index) in item.adGroup.languages"
            :key="index"
          >
            {{ language || '?' }}
          </v-chip>
        </v-chip-group>
      </template>

      <template v-slot:item.events="{ item }">
        <v-chip-group>
          <v-chip
            small
            label
            outlined
            color="primary"
            v-for="(event, index) in item.events"
            :key="index"
          >
            {{ enums.events[event] || '?' }}
          </v-chip>
        </v-chip-group>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          small
          outlined
          color="success"
          @click=""
        >
          Залить
        </v-btn>
      </template>
    </v-data-table>

    <div
      class="text-center pt-2"
      v-if="items.length > 50"
    >
      <v-pagination
        v-model="page"
        :length="pageCount"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { EAudienceAgeRange, EAudienceGender } from '@/api/tiktok/types'

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    page: 1,
    pageCount: 0,
    headers: [
      {
        text: 'Наименование',
        value: 'name',
      },
      {
        text: 'Тип',
        value: 'type',
      },
      {
        text: 'Код',
        value: 'code',
      },
      {
        text: 'События',
        value: 'events',
        sortable: false,
      },
    ],
    enums: {
      age: {
        [EAudienceAgeRange.Age13_17]: '13-17',
        [EAudienceAgeRange.Age18_24]: '18-24',
        [EAudienceAgeRange.Age25_34]: '25-34',
        [EAudienceAgeRange.Age35_44]: '35-44',
        [EAudienceAgeRange.Age45_54]: '45-54',
        [EAudienceAgeRange.Age55_100]: '55+',
      },
      gender: {
        [EAudienceGender.Mix]: 'Mix',
        [EAudienceGender.Male]: 'Male',
        [EAudienceGender.Female]: 'Female',
      },
    },
  })
}
</script>

<style scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>
