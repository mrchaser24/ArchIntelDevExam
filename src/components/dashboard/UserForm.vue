<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-md w-1/2">
      <h2 class="text-xl font-semibold mb-4 text-center">
        {{ isEdit ? "Edit User" : "Add User" }}
      </h2>
      <form @submit.prevent="handleSubmit" class="mb-6">
        <div>
          <input
            v-model="userData.Firstname"
            placeholder="First Name"
            class="border p-2 mb-2 w-full rounded-lg"
            :class="firstnameHint? 'border border-red-600':''"
          />
          <div class="text-sm text-red-600 ml-1" v-if="firstnameHint">Firstname is required!</div>
        </div>
        <div>
          <input
            v-model="userData.Lastname"
            placeholder="Last Name"
            class="border p-2 mb-2 w-full rounded-lg"
            :class="lastnameHint? 'border border-red-600':''"
          />
          <div class="text-sm text-red-600 ml-1" v-if="lastnameHint">Lastname is required!</div>
        </div>
        <div>
          <input
            v-model="userData.username"
            placeholder="Username"
            class="border p-2 mb-2 w-full rounded-lg"
            :class="usernameHint? 'border border-red-600':''"
          />
          <div class="text-sm text-red-600 ml-1" v-if="usernameHint">Username is required!</div>
        </div>
        <div>
          <input
            v-model="userData.password"
            placeholder="Password"
            type="password"
            class="border p-2 mb-2 w-full rounded-lg"
            :class="passwordHint? 'border border-red-600':''"
          />
          <div class="text-sm text-red-600 ml-1" v-if="passwordHint">Password is required!</div>
        </div>
        <div class="action float-end mt-5">
          <button type="submit" class="bg-green-500 text-white p-2 rounded">
            {{ isEdit ? "Save Changes" : "Add User" }}
          </button>
          <button
            @click="closeDialog"
            type="button"
            class="bg-red-500 text-white p-2 rounded ml-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isOpen: Boolean,
  isEdit: Boolean,
  user: Object,
});

const emit = defineEmits(["submit", "close"]);
const userData = ref({ ...props.user });
const firstnameHint = ref(false)
const lastnameHint = ref(false)
const usernameHint = ref(false)
const passwordHint = ref(false)

watch(
  () => props.user,
  (newUser) => {
    userData.value = { ...newUser };
  }
);

function handleSubmit() {
  firstnameHint.value = false
  lastnameHint.value = false
  usernameHint.value = false
  passwordHint.value = false
  if (!userData.value.Firstname) return firstnameHint.value = true
  if (!userData.value.Lastname) return lastnameHint.value = true
  if (!userData.value.username) return usernameHint.value = true
  if (!userData.value.password) return passwordHint.value = true
  emit("submit", { ...userData.value });
}

function closeDialog() {
  emit("close");
}
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
