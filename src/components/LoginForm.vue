<template>
  <div class="m-auto w-3/4 p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4 text-center">
      {{ title }}
    </h2>

    <form @submit.prevent="login" class="mb-6">
      <div>
        <input
          placeholder="Username"
          :class="usernameHint ? 'border border-red-600' : ''"
          class="border p-2 mb-2 w-full rounded-lg"
          v-model="user.username"
        />
        <div class="text-sm text-red-600 ml-1" v-if="usernameHint">
          Username is required!
        </div>
      </div>
      <div>
        <input
          placeholder="Password"
          :class="passwordHint ? 'border border-red-600' : ''"
          class="border p-2 mb-2 w-full rounded-lg"
          type="password"
          v-model="user.password"
        />
        <div class="text-sm text-red-600 ml-1" v-if="passwordHint">
          Username is required!
        </div>
      </div>
      <button
        class="w-full bg-green-500 text-white py-2 rounded-lg mt-5"
        @click="login()"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
const auth = useAuthStore();

const props = defineProps({
  userType: String,
  title: String,
});
const user = ref({
  username: "",
  password: "",
});

const usernameHint = ref(false);
const passwordHint = ref(false);

function login() {
  usernameHint.value = false;
  usernameHint.value = false;
  if (!user.value.username) return (usernameHint.value = true);
  if (!user.value.password) return (passwordHint.value = true);
  auth.login(user.value.username, user.value.password, props.userType);
  router.push("/");
}
</script>

<style></style>
