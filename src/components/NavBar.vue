<template>
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
    <v-btn variant="outlined" color="white" class="ml-3">
      {{ isLoggedIn ? 'Logout' : 'Login' }}
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { computed, ref } from 'vue'
import TokenService from '../services/tokenService'
const drawer = ref(true)

const paths = ref([
  { icon: 'mdi-magnify', text: 'Test-Page', route: '/test' },
  { icon: 'mdi-heart', text: 'About Us', route: '/about-us' },
  { icon: 'mdi-mail', text: 'Contact Us', route: '/contact-us' },
  { icon: 'mdi-lock', text: 'Login', route: '/login' },
])

const isLoggedIn = computed(()=>{
  return !!TokenService.getToken();
  console.log(isLoggedIn.value);
})
</script>
<style scoped>
.border {
  border-left: 4px solid #0ba518;
}
</style>
