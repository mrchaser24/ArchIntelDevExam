<template>
  <div class="flex justify-between h-14 items-center px-5 fixed w-full shadow-sm bg-blue-400 text-white">
    <div class="logo-container">
      <RouterLink to="/">Arch Intel Dev Exam</RouterLink>
    </div>
    <div class="login flex items-center relative" ref="dropdownContainer">
      <div class="login ml-2">
        <RouterLink v-if="auth.auth.Type == 'Writer' || auth.auth.Type == 'Editor'" class="mx-2" to="/dashboard">Article Dashboard</RouterLink>
        <RouterLink v-if="auth.auth.Type == 'Editor'" class="mx-2" to="/editor-dashboard">User Dashboard</RouterLink>
        <RouterLink v-if="auth.auth.Type == 'Editor'" class="mx-2" to="/all-media">All Media Dashboard</RouterLink>
      </div>
      <div class="login ml-2">
        Hello, <span class="font-bold capitalize">{{ auth.auth.Firstname }}</span>
      </div>
      <div class="profile-img">
        <img class="cursor-pointer rounded-full m-2" src="https://picsum.photos/200" height="30px" width="30px" alt="profile image" @click="showDropdown()">
      </div>
      <div v-if="showDropDown" class="absolute top-full right-0 bg-white w-32 rounded-lg shadow-lg text-black">
        <div class="p-3 cursor-pointer hover:bg-slate-100 rounded-lg">Edit User</div>
        <div class="p-3 cursor-pointer hover:bg-slate-100 rounded-lg" @click="clickLogout()">Logout</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const showDropDown = ref(false);
const dropdownContainer = ref(null);

function showDropdown() {
  showDropDown.value = !showDropDown.value;
}

function clickLogout() {
  auth.logout();
  showDropDown.value = false;
}

function handleClickOutside(event) {
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) {
    showDropDown.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style>
/* Add your styles here */
</style>