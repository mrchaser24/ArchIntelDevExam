<template>
  <div class="flex justify-center items-center pa-5 h-screen">
    <div class="left-side w-1/2"><LoginForm title="Editor Login" :userType="'Editor'"/></div>
    <div class="right-side w-1/2"><LoginForm title="Writer Login" :userType="'Writer'"/></div>
  </div>
</template>

<script setup>
import LoginForm from '@/components/LoginForm.vue';

</script>

<style>

</style>