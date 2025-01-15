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

    <ArticleForm
      :isOpen="isAddDialogOpen"
      :isEdit="false"
      :article="newArticle"
      @submit="handleAddSubmit"
      @close="closeAddDialog"
    />

    <ArticleForm
      :isOpen="isEditDialogOpen"
      :isEdit="true"
      :article="editArticleData"
      @submit="handleEditSubmit"
      @close="closeEditDialog"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useArticleStore } from "@/stores/article";
import { useAuthStore } from "@/stores/auth";
import ArticleForm from "@/components/ArticleForm.vue";

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

function handleAddSubmit(article) {
  article.Writer = auth.id
  article.Editor = auth.editorId
  store.addArticle(article);
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

function handleEditSubmit(article) {
  store.editArticle(article.id, article);
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
