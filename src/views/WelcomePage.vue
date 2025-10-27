<template>
  <v-container class="py-6" fluid>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="2">
          <div class="text-center mb-3">
            <h2>Welcome,</h2>
            <h3 v-if="user.name">{{ user.name }}</h3>
            <div v-else class="text-subtle">Guest</div>
            <div class="mt-1 text-caption">{{ user.email }}</div>
          </div>

          <div class="mb-3">
            <strong>Role:</strong>
            <span>{{ user.role?.name || '—' }}</span>
          </div>

          <div class="mb-4">
            <strong>Abilities:</strong>
            <span v-if="activeAbilities.length === 0">None</span>
            <v-chip
              v-for="(a, i) in activeAbilities"
              :key="a + i"
              small
              class="ma-1"
              outlined
            >
              {{ a }}
            </v-chip>
          </div>

          <v-row class="d-flex" justify="space-between">
            <v-col cols="auto" class="pa-0">
              <v-btn
                small
                v-if="AuthService.hasAbility(['user','customer'])"
                @click="go('/restaurant')"
              >
                Browse
              </v-btn>
            </v-col>

            <v-col cols="auto" class="pa-0">
              <v-btn
                small
                v-if="AuthService.hasAbility('admin')"
                @click="go('/admin')"
                color="primary"
              >
                Admin
              </v-btn>
            </v-col>

            <v-col cols="auto" class="pa-0">
              <v-btn small text @click="logout">Logout</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import TokenService from '../services/tokenService'
import AuthService from '../services/authService'

const router = useRouter()
const user = ref(TokenService.getUser() || {})

const activeAbilities = computed(() => {
  const abilities = user.value?.abilities || {}
  return Object.keys(abilities).filter(k => !!abilities[k])
})

function go(path) {
  router.push(path)
}

function logout() {
  // adjust to your TokenService API
  if (TokenService.clear) TokenService.clear()
  else {
    TokenService.removeToken?.()
    TokenService.removeUser?.()
  }
  router.push('/login')
}
</script>

<style scoped>
.text-subtle { color: rgba(0,0,0,0.6); }
</style>
