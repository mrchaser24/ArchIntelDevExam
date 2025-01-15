<template>
    <div v-if="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 class="text-xl font-semibold mb-4">{{ isEdit ? 'Edit User' : 'Add User' }}</h2>
        <form @submit.prevent="handleSubmit" class="mb-6">
          <input v-model="userData.Firstname" placeholder="First Name" required class="border p-2 mb-2 w-full" />
          <input v-model="userData.Lastname" placeholder="Last Name" required class="border p-2 mb-2 w-full" />
          <input v-model="userData.username" placeholder="Username" required class="border p-2 mb-2 w-full" />
          <input v-model="userData.password" type="password" placeholder="Password" required class="border p-2 mb-2 w-full" />
          <select v-model="userData.Type" required class="border p-2 mb-2 w-full">
            <option value="Editor">Editor</option>
            <option value="Writer">Writer</option>
          </select>
          <button type="submit" class="bg-blue-500 text-white p-2 rounded">{{ isEdit ? 'Save Changes' : 'Add User' }}</button>
          <button @click="closeDialog" type="button" class="bg-gray-500 text-white p-2 rounded ml-2">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    isOpen: Boolean,
    isEdit: Boolean,
    user: Object,
  });
  
  const emit = defineEmits(['submit', 'close']);
  
  const userData = ref({ ...props.user });
  
  watch(() => props.user, (newUser) => {
    userData.value = { ...newUser };
  });
  
  function handleSubmit() {
    emit('submit', { ...userData.value });
  }
  
  function closeDialog() {
    emit('close');
  }
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>