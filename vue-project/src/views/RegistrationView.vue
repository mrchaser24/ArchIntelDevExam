<template>
    <div class="flex justify-center items-center pa-5 h-screen">
      <div class="left-side w-1/2"><RegisterForm title="Editor Registration" :userType="'Editor'"/></div>
    </div>
  </template>
  
  <script setup>
  import RegisterForm from '@/components/RegisterForm.vue';
  
  </script>
  
  <style>
  
  </style>