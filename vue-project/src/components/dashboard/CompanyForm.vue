<template>
    <div v-if="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 class="text-xl font-semibold mb-4">{{ isEdit ? 'Edit Company' : 'Add Company' }}</h2>
        <form @submit.prevent="handleSubmit" class="mb-6">
          <input v-model="companyData.logo" placeholder="Logo URL" required class="border p-2 mb-2 w-full" />
          <input v-model="companyData.name" placeholder="Company Name" required class="border p-2 mb-2 w-full" />
          <button type="submit" class="bg-blue-500 text-white p-2 rounded">{{ isEdit ? 'Save Changes' : 'Add Company' }}</button>
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
    company: Object,
  });
  
  const emit = defineEmits(['submit', 'close']);
  
  const companyData = ref({ ...props.company });
  
  watch(() => props.company, (newCompany) => {
    companyData.value = { ...newCompany };
  });
  
  function handleSubmit() {
    emit('submit', { ...companyData.value });
  }
  
  function closeDialog() {
    emit('close');
  }
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>