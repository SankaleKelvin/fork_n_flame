<template>
  <!--v-navigation-drawer
    v-model="drawer"
    color="teal-darken-1"
    dark
    app
  >
    <v-layout column align-center>
      <v-flex class="my-2 mx-auto text-center">
        <v-avatar size="100">
          <v-img src="https://picsum.photos/1920/1080?random"></v-img>
        </v-avatar>
        <p class="white--text subheading mt-1 text-center">Username</p>
      </v-flex>
    </v-layout>
    <v-list flat>
      <v-list-item
        v-for="path in paths"
        :key="path.text"
        router
        :to="path.route"
        active-class="border"
      >
        <v-list-item-content class="d-flex align-center">
          <v-icon>{{ path.icon }}</v-icon>
          <span class="ml-2">{{ path.text }}</span>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer-->
  <v-app-bar color="teal darken-4">

    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title class="text-uppercase">
      <span class="font-weight-light">Fork n Flame</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-btn text v-bind="props">
          <v-icon left>mdi-chevron-down</v-icon>
          <span>Menu</span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="path in paths"
          :key="path.text"
          router
          :to="path.route"
          active-class="border"          
        >
          <v-list-item-title>{{ path.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(true)
const paths = ref([
  { icon: 'mdi-magnify', text: 'Test-Page', route: '/test' },
  { icon: 'mdi-heart', text: 'About Us', route: '/about-us' },
  { icon: 'mdi-mail', text: 'Contact Us', route: '/contact-us' },
  { icon: 'mdi-lock', text: 'Login', route: '/login' }
])
</script>
<style scoped>
.border {
border-left: 4px solid #0ba518;
}
</style>