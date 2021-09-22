<template>
  <v-menu
    transition="slide-x-transition"
    bottom
    right
    :offset-y="true"
    min-width="200"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        elevation="2"
        class="mx-2"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon
          size="30"
          color="primary"
        >
          mdi-account-circle
        </v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, i) in userMenu"
        :key="i"
        :to="item.to"
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"/>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="logout">
        <v-list-item-action>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Выход</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
// Меню пользователя
export default {
  name: 'UserMenu',
  data: () => ({
    userMenu: [
      {
        icon: 'mdi-account',
        title: 'Профиль',
        to: '/profile',
      },
      {
        icon: 'mdi-credit-card-check-outline',
        title: 'Подписка',
        to: '/subscription',
      },
    ],
  }),
  methods: {
    logout() {
      this.$Auth
        .logout()
        .catch(({ message }) => alert(message))
    },
  },
}
</script>
