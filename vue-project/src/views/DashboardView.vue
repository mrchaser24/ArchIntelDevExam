<template>
  <div class="p-5">
    <h1 class="text-2xl font-bold mb-4 mt-10 text-center">Dashboard</h1>
    <button @click="openAddDialog" class="bg-green-500 text-white p-2 rounded mb-6 float-end">Add Article</button>

    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">Image</th>
          <th class="py-2 px-4 border-b">Title</th>
          <th class="py-2 px-4 border-b">Content</th>
          <th class="py-2 px-4 border-b">Link</th>
          <th class="py-2 px-4 border-b">Date</th>
          <th class="py-2 px-4 border-b">Status</th>
          <th class="py-2 px-4 border-b">Editor</th>
          <th class="py-2 px-4 border-b">Company</th>
          <th class="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td class="py-2 px-4 border-b">
            <img :src="article.Image" alt="Article Image" class="w-16 h-16 object-cover">
          </td>
          <td class="py-2 px-4 border-b">{{ article.Title }}</td>
          <td class="py-2 px-4 border-b">{{ article.Content }}</td>
          <td class="py-2 px-4 border-b">
            <a :href="article.Link" target="_blank">{{ article.Link }}</a>
          </td>
          <td class="py-2 px-4 border-b">{{ new Date(article.Date).toLocaleDateString() }}</td>
          <td class="py-2 px-4 border-b">{{ article.Status }}</td>
          <td class="py-2 px-4 border-b">{{ getUserCompanyName(article.Editor, 0) }}</td>
          <td class="py-2 px-4 border-b">{{ getUserCompanyName(article.Company, 1) }}</td>
          <td class="py-2 px-4 border-b w-40">
            <button @click="openEditDialog(article)" class="bg-yellow-500 text-white p-2 rounded mr-2 w-16">Edit</button>
            <button @click="remove(article.id)" class="bg-red-500 text-white p-2 rounded w-16">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

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
import { useUserStore } from '@/stores/user';
import { useCompanyStore } from '@/stores/company';

const store = useArticleStore();
const auth = useAuthStore().auth;
const editorList = useUserStore()
const companyList = useCompanyStore()

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

function handleAddSubmit(article) {
  article.Writer = auth.id
  article.Editor = auth.editorId
  store.addArticle(article);
  closeAddDialog();
}
function handleEditSubmit(article) {
  store.editArticle(article.id, article);
  closeEditDialog();
}
function remove(id) {
  store.deleteArticle(id);
}
function getUserCompanyName(val, type) {
  let getUser = editorList.editorList.find(user => user.id == val)
  let getCompany = companyList.companyList.find(user => user.id == val)
  
  if (type == 0) return getUser.Firstname
  if (type == 1) return getCompany.name
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
th, td {
  padding: 10px;
  border: 1px solid #ddd;
}
th {
  background-color: #f4f4f4;
}
</style>
