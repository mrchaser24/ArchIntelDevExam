<template>
  <div class="m-auto sm:w-11/12 lg:w-2/4 p-5 rounded-lg shadow-md">
    <div class="title w-full text-center mb-10">{{ title }}</div>
    <div class="form">
      <div class="flex justify-between py-3 ">
        <div class="label">Username</div>
        <div>
          <input class="ml-1 shadow w-11/12 px-2 rounded-lg" :class="usernameHint? 'border border-red-600':''" v-model="user.username">
          <div class="text-sm text-red-600 ml-1" v-if="usernameHint">Username is required!</div>
        </div>
      </div>
      <div class="flex justify-between py-3 ">
        <div class="label">Password</div>
        <div>
          <input class="ml-1 shadow w-11/12 px-2 rounded-lg" :class="passwordHint? 'border border-red-600':''" type="password" v-model="user.password">
          <div class="text-sm text-red-600 ml-1" v-if="usernameHint">Username is required!</div>
        </div>
      </div>
      <button class="w-full bg-blue-500 text-white py-2 rounded-lg mt-10" @click="login()">Login</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';
const auth = useAuthStore()

const props = defineProps({
  userType: String,
  title: String
});
const user = ref({
  username: '',
  password: ''
});

const usernameHint = ref(false)
const passwordHint = ref(false)

function login(){
  usernameHint.value = false
  usernameHint.value = false
  if (!user.value.username) return usernameHint.value = true
  if (!user.value.password) return passwordHint.value = true
  auth.login(user.value.username, user.value.password, props.userType)
  router.push('/')

}
</script>

<style></style>
