<template>
  <div class="m-auto w-3/4 p-5 rounded-lg shadow-md">
    <div class="title w-full text-center mb-10">{{ title }}</div>
    <div class="form">
      <div class="flex justify-between py-3">
        <div class="label">First Name</div>
        <div>
          <input class="ml-1 shadow w-11/12 px-2 rounded-lg" :class="firstnameHint ? 'border border-red-600' : ''" v-model="user.firstname">
          <div class="text-sm text-red-600 ml-1" v-if="firstnameHint">First name is required!</div>
        </div>
      </div>
      <div class="flex justify-between py-3">
        <div class="label">Last Name</div>
        <div>
          <input class="ml-1 shadow w-11/12 px-2 rounded-lg" :class="lastnameHint ? 'border border-red-600' : ''" v-model="user.lastname">
          <div class="text-sm text-red-600 ml-1" v-if="lastnameHint">Last name is required!</div>
        </div>
      </div>
      <div class="flex justify-between py-3">
        <div class="label">Username</div>
        <div>
          <input class="ml-1 shadow w-11/12 px-2 rounded-lg" :class="usernameHint ? 'border border-red-600' : ''" v-model="user.username">
          <div class="text-sm text-red-600 ml-1" v-if="usernameHint">Username is required!</div>
        </div>
      </div>
      <div class="flex justify-between py-3">
        <div class="label">Password</div>
        <div>
          <input class="ml-1 shadow w-11/12 px-2 rounded-lg" :class="passwordHint ? 'border border-red-600' : ''" type="password" v-model="user.password">
          <div class="text-sm text-red-600 ml-1" v-if="passwordHint">Password is required!</div>
        </div>
      </div>
      <button class="w-full bg-blue-500 text-white py-2 rounded-lg mt-10" @click="register()">Register</button>
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
  firstname: '',
  lastname: '',
  username: '',
  password: ''
});

const firstnameHint = ref(false)
const lastnameHint = ref(false)
const usernameHint = ref(false)
const passwordHint = ref(false)

function register() {
  firstnameHint.value = false
  lastnameHint.value = false
  usernameHint.value = false
  passwordHint.value = false
  if (!user.value.firstname) return firstnameHint.value = true
  if (!user.value.lastname) return lastnameHint.value = true
  if (!user.value.username) return usernameHint.value = true
  if (!user.value.password) return passwordHint.value = true
  router.push('/')
  auth.register(user.value.firstname, user.value.lastname, user.value.username, user.value.password, props.userType)
  user.value = {
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  }
}
</script>

<style></style>