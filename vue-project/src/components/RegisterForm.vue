<template>
  <div class="m-auto w-3/4 p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4 text-center">
      {{ title }}
    </h2>

    <form @submit.prevent="register" class="mb-6">
      <div>
        <input
          v-model="user.firstname"
          placeholder="First Name"
          class="border p-2 mb-2 w-full rounded-lg"
          :class="firstnameHint? 'border border-red-600':''"
        />
        <div class="text-sm text-red-600 ml-1" v-if="firstnameHint">Firstname is required!</div>
      </div>
      <div>
        <input
          v-model="user.lastname"
          placeholder="Last Name"
          class="border p-2 mb-2 w-full rounded-lg"
          :class="lastnameHint? 'border border-red-600':''"
        />
        <div class="text-sm text-red-600 ml-1" v-if="lastnameHint">Lastname is required!</div>
      </div>
      <div>
        <input
          v-model="user.username"
          placeholder="Username"
          class="border p-2 mb-2 w-full rounded-lg"
          :class="usernameHint? 'border border-red-600':''"
        />
        <div class="text-sm text-red-600 ml-1" v-if="usernameHint">Username is required!</div>
      </div>
      <div>
        <input
          v-model="user.password"
          placeholder="Password"
          type="password"
          class="border p-2 mb-2 w-full rounded-lg"
          :class="passwordHint? 'border border-red-600':''"
        />
        <div class="text-sm text-red-600 ml-1" v-if="passwordHint">Password is required!</div>
      </div>
      <button class="w-full bg-green-500 text-white py-2 rounded-lg mt-5" @click="register()">Register</button>
    </form>
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