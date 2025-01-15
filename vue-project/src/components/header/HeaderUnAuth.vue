<template>
  <div class="flex justify-between h-14 items-center px-5 fixed w-full shadow-sm bg-blue-400 text-white">
    <div class="logo-container">
      <RouterLink to="/">Arch Intel Dev Exam</RouterLink>
    </div>
    <div class="login flex">
      <div class="login ml-2 cursor-pointer">
        <RouterLink class="mx-2" to="/login">Login</RouterLink>
        <RouterLink class="mx-2" to="/register">Register</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style>

</style>