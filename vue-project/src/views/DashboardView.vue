<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
    <button @click="openAddDialog" class="bg-blue-500 text-white p-2 rounded mb-6">Add Article</button>
    <ul>
      <li v-for="article in articles" :key="article.id" class="mb-4 p-4 border rounded">
        <img :src="article.Image" alt="Article Image" class="mb-2 w-full h-60 object-cover">
        <h2 class="text-xl font-semibold">{{ article.Title }}</h2>
        <p class="mb-2">{{ article.Content }}</p>
        <p class="text-gray-600">Link: <a :href="article.Link" target="_blank">{{ article.Link }}</a></p>
        <p class="text-gray-600">Date: {{ new Date(article.Date).toLocaleDateString() }}</p>
        <p class="text-gray-600">Status: {{ article.Status }}</p>
        <p class="text-gray-600">Writer ID: {{ article.Writer }}</p>
        <p class="text-gray-600">Editor ID: {{ article.Editor }}</p>
        <p class="text-gray-600">Company ID: {{ article.Company }}</p>
        <button @click="openEditDialog(article)" class="bg-yellow-500 text-white p-2 rounded mr-2">Edit</button>
        <button @click="remove(article.id)" class="bg-red-500 text-white p-2 rounded">Delete</button>
      </li>
    </ul>

    <div v-if="isAddDialogOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 class="text-xl font-semibold mb-4">Add Article</h2>
        <form @submit.prevent="handleSubmit" class="mb-6">
          <input v-model="newArticle.Title" placeholder="Title" required class="border p-2 mb-2 w-full" />
          <input v-model="newArticle.Image" placeholder="Image URL" required class="border p-2 mb-2 w-full" />
          <input v-model="newArticle.Link" placeholder="Link" required class="border p-2 mb-2 w-full" />
          <input v-model="newArticle.Date" type="date" required class="border p-2 mb-2 w-full" />
          <textarea v-model="newArticle.Content" placeholder="Content" required class="border p-2 mb-2 w-full"></textarea>
          <select v-model="newArticle.Status" required class="border p-2 mb-2 w-full">
            <option value="For Edit">For Edit</option>
            <option value="Published">Published</option>
          </select>
          <!-- <input v-model="newArticle.Writer" placeholder="Writer ID" required class="border p-2 mb-2 w-full" /> -->
          <!-- <input v-model="newArticle.Editor" placeholder="Editor ID" required class="border p-2 mb-2 w-full" /> -->
          <input v-model="newArticle.Company" placeholder="Company ID" required class="border p-2 mb-2 w-full" />
          <button type="submit" class="bg-blue-500 text-white p-2 rounded">Add Article</button>
          <button @click="closeAddDialog" type="button" class="bg-gray-500 text-white p-2 rounded ml-2">Cancel</button>
        </form>
      </div>
    </div>

    <div v-if="isEditDialogOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 class="text-xl font-semibold mb-4">Edit Article</h2>
        <form @submit.prevent="handleEditSubmit" class="mb-6">
          <input v-model="editArticleData.Title" placeholder="Title" required class="border p-2 mb-2 w-full" />
          <input v-model="editArticleData.Image" placeholder="Image URL" required class="border p-2 mb-2 w-full" />
          <input v-model="editArticleData.Link" placeholder="Link" required class="border p-2 mb-2 w-full" />
          <input v-model="editArticleData.Date" type="date" required class="border p-2 mb-2 w-full" />
          <textarea v-model="editArticleData.Content" placeholder="Content" required class="border p-2 mb-2 w-full"></textarea>
          <select v-model="editArticleData.Status" required class="border p-2 mb-2 w-full">
            <option value="For Edit">For Edit</option>
            <option value="Published">Published</option>
          </select>
          <!-- <input v-model="editArticleData.Writer" placeholder="Writer ID" required class="border p-2 mb-2 w-full" /> -->
          <!-- <input v-model="editArticleData.Editor" placeholder="Editor ID" required class="border p-2 mb-2 w-full" /> -->
          <input v-model="editArticleData.Company" placeholder="Company ID" required class="border p-2 mb-2 w-full" />
          <button type="submit" class="bg-blue-500 text-white p-2 rounded">Save Changes</button>
          <button @click="closeEditDialog" type="button" class="bg-gray-500 text-white p-2 rounded ml-2">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useArticleStore } from "@/stores/article";
import { useAuthStore } from "@/stores/auth";

const store = useArticleStore();
const auth = useAuthStore().auth;
console.log("HELLO", auth);

const articles = computed(() => {
  return store.articles.filter((article)=> article.Writer == auth.id)
});
const newArticle = ref({
  Title: "",
  Image: "",
  Link: "",
  Date: "",
  Content: "",
  Status: "For Edit",
  Writer: "",
  Editor: "",
  Company: "",
});

const isAddDialogOpen = ref(false);
const isEditDialogOpen = ref(false);
const editArticleData = ref({
  id: null,
  Title: "",
  Image: "",
  Link: "",
  Date: "",
  Content: "",
  Status: "For Edit",
  Writer: "",
  Editor: "",
  Company: "",
});

function handleSubmit() {
  newArticle.value.Writer = auth.id
  newArticle.value.Editor = auth.editorId
  store.addArticle({ ...newArticle.value });
  newArticle.value = {
    Title: "",
    Image: "",
    Link: "",
    Date: "",
    Content: "",
    Status: "For Edit",
    Writer: "",
    Editor: "",
    Company: "",
  };
  closeAddDialog();
}

function openAddDialog() {
  isAddDialogOpen.value = true;
}

function closeAddDialog() {
  isAddDialogOpen.value = false;
}

function openEditDialog(article) {
  editArticleData.value = { ...article };
  isEditDialogOpen.value = true;
}

function closeEditDialog() {
  isEditDialogOpen.value = false;
}

function handleEditSubmit() {
  store.editArticle(editArticleData.value.id, { ...editArticleData.value });
  closeEditDialog();
}

function remove(id) {
  store.deleteArticle(id);
}
</script>

<style scoped>
form {
  margin-bottom: 20px;
}
input,
textarea,
select {
  display: block;
  margin-bottom: 10px;
}
button {
  margin-right: 10px;
}
</style>
