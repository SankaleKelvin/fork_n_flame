<template>
  <v-container fluid class="pa-4">
    <v-row align="center" justify="center" style="min-height: 60vh">
      <v-col cols="10" sm="8" md="6" lg="4">
        <v-card elevation="6" rounded="xl" class="pa-6">
          <div class="text-center mb-4">
            <div class="text-h5 font-weight-medium">Welcome back</div>
            <div class="text-subtitle-1 text-secondary">Sign in to access your account</div>
          </div>

          <v-form @submit.prevent="login">
            <v-text-field
              v-model="state.email"
              label="Email"
              required
              prepend-inner-icon="mdi-email"
              type="email"
            />

            <v-text-field
              v-model="state.password"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              required
              prepend-inner-icon="mdi-lock"
            />

            <v-row class="mt-4" justify="center" align="center">
              <v-btn type="button" outlined @click="clear" :disabled="loading">Clear</v-btn>
              &nbsp; &nbsp;
              <v-btn class="ms-4" color="primary" type="submit"> Sign in </v-btn>
            </v-row>
          </v-form>

          <v-divider class="my-6" />

          <div class="text-center">
            <h2 class="text-secondary">Don't have an account? <RouterLink to="/sign-up">register</RouterLink> </h2>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref } from 'vue'

import api from '../services/api'
import TokenService from '../services/tokenService'
import router from '../router/index'

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
    TokenService.setToken(response.data)
    alert('Login Successful!:', response.data)
    router.push('/welcome')
  } catch (error) {
    console.error('Login Failed', error.response?.data || error.message)
  }
}

function clear() {
  state.value = { ...initialState }
}
</script>
