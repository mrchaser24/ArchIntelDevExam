<template>
  <div class="flex justify-between h-10 items-center px-5 fixed w-full shadow-sm bg-slate-50">
    <div class="logo-container">
      <RouterLink to="/">LOGO PO</RouterLink>
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