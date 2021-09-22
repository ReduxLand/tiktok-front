<template>
  <v-navigation-drawer
    app
    dark
    permanent
    v-model="drawer"
    :clipped="clipped"
    :mini-variant="miniVariant"
    class="elevation-5"
    :src="require('~/static/images/menu-bg.jpg')"
  >
    <v-list
      nav
      dense
    >
      <!--        <v-list-item-group-->
      <!--          active-class="deep-purple&#45;&#45;text text&#45;&#45;accent-4"-->
      <!--        >-->
      <v-list-item @click.stop="miniVariant = !miniVariant" :ripple="false">
        <v-list-item-action>
          <v-icon>mdi-menu</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="'TikTok ♪'"/>
        </v-list-item-content>
      </v-list-item>

      <v-divider dark></v-divider>

      <v-list-item-group>
        <v-list-item
          v-for="(item, i) in mainMenu"
          :key="i"
          :to="item.to"
          router
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Главное меню
export default {
  name: 'MainMenu',
  data() {
    return {
      drawer: true,
      clipped: false,
      miniVariant: !this.$vuetify.breakpoint.xsOnly, // TODO вообще много чего под мобилки надо будет сделать
      mainMenu: [
        {
          icon: 'mdi-chart-arc',
          title: 'Дэшборд',
          to: '/dashboard',
        },
        {
          icon: 'mdi-account-multiple-check',
          title: 'Аккаунты TikTok',
          to: '/tiktok-accounts',
        },
        {
          icon: 'mdi-bullseye-arrow', // 'mdi-briefcase-edit'
          title: 'Рекламные кампании',
          to: '/campaigns',
        },
        {
          icon: 'mdi-target',
          title: 'Пиксели и события',
          to: '/pixels',
        },
        {
          icon: 'mdi-folder-multiple-image',
          title: 'Креативы',
          to: '/media-library',
        },
        // {
        //   icon: 'mdi-folder-cog',
        //   title: 'Пресеты',
        //   to: '/presets'
        // },
        {
          icon: 'mdi-cog',
          title: 'Настройки',
          to: '/settings',
        },
      ],
    }
  },
}
</script>
