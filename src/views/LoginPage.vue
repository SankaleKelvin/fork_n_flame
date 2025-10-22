<template>
  <form @submit.prevent="login">
    <v-text-field v-model="state.email" label="email" required></v-text-field>

    <v-text-field v-model="state.password" label="Password" type="password" required></v-text-field>

    <v-btn class="me-4" type="submit"> submit </v-btn>
    <v-btn @click="clear"> clear </v-btn>
  </form>
</template>
<script setup>
import { ref } from 'vue'

import api from '../router/api'

const initialState = {
  email: '',
  password: '',
}

const state = ref({
  ...initialState,
})

async function login() {
  try {
    const response = await api.post('/login', state.value)
    alert('Login Successful!:', response.data)
  } catch (error) {
    console.error('Login Failed', error.response?.data || error.message)
  }
}

function clear(){
  state.value = {...initialState}
}
</script>
