<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-lg w-1/2">
      <h2 class="text-xl font-semibold mb-4">{{ isEdit ? 'Edit Article' : 'Add Article' }}</h2>
      <form @submit.prevent="handleSubmit" class="mb-6">
        <input v-model="articleData.Title" placeholder="Title" required class="border p-2 mb-2 w-full" />
        <input v-model="articleData.Image" placeholder="Image URL" required class="border p-2 mb-2 w-full" />
        <input v-model="articleData.Link" placeholder="Link" required class="border p-2 mb-2 w-full" />
        <input v-model="articleData.Date" type="date" required class="border p-2 mb-2 w-full" />
        <textarea v-model="articleData.Content" placeholder="Content" required class="border p-2 mb-2 w-full"></textarea>
        <select v-model="articleData.Status" required class="border p-2 mb-2 w-full">
          <option value="For Edit">For Edit</option>
          <option value="Published">Published</option>
        </select>
        <input v-model="articleData.Company" placeholder="Company ID" required class="border p-2 mb-2 w-full" />
        <button type="submit" class="bg-blue-500 text-white p-2 rounded">{{ isEdit ? 'Save Changes' : 'Add Article' }}</button>
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
  article: Object,
});

const emit = defineEmits(['submit', 'close']);

const articleData = ref({ ...props.article });

watch(() => props.article, (newArticle) => {
  articleData.value = { ...newArticle };
});

function handleSubmit() {
  emit('submit', { ...articleData.value });
}

function closeDialog() {
  emit('close');
}
</script>

<style scoped>
/* Add any additional styles if needed */
</style>