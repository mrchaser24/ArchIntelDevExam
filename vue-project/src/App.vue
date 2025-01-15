<template>
  <header>
    <div class="wrapper">
      <HeaderUnAuth v-if="!auth.auth" />
      <HeaderAuth v-if="auth.auth" />
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderUnAuth from './components/header/HeaderUnAuth.vue';
import HeaderAuth from './components/header/HeaderAuth.vue';
import { useAuthStore } from './stores/auth';
const auth = useAuthStore()
</script>

<style scoped>
</style>
