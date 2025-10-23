<template>
  <main>
    <h1>Welcome! {{ userName }}</h1>

    <v-table>
      
    </v-table>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue';
import TokenService from '../services/tokenService';

const userName = computed(()=>{
  return userName.value = TokenService.getUser().name
})

</script>
