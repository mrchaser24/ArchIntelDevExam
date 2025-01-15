<template>
  <div class="p-5">
    <h1 class="text-2xl font-bold mb-4 mt-10 text-center">Dashboard</h1>
    <button v-if="isWriter" @click="openAddDialog" class="bg-green-500 text-white p-2 rounded mb-6 float-end">Add Article</button>

    <h2 class="text-xl font-semibold mb-4">For Edit</h2>
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">Image</th>
          <th class="py-2 px-4 border-b">Title</th>
          <th class="py-2 px-4 border-b">Link</th>
          <th class="py-2 px-4 border-b">Date</th>
          <th class="py-2 px-4 border-b">Writer</th>
          <th class="py-2 px-4 border-b">Editor</th>
          <th class="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in forEditArticles" :key="article.id">
          <td class="py-2 px-4 border-b">
            <img :src="article.Image" alt="Article Image" class="w-16 h-16 object-cover">
          </td>
          <td class="py-2 px-4 border-b">{{ article.Title }}</td>
          <td class="py-2 px-4 border-b">
            <a :href="article.Link" target="_blank">{{ article.Link }}</a>
          </td>
          <td class="py-2 px-4 border-b">{{ new Date(article.Date).toLocaleDateString() }}</td>
          <td class="py-2 px-4 border-b">{{ getUserName(article, 0) }}</td>
          <td class="py-2 px-4 border-b">{{ getUserName(article, 1) }}</td>
          <td class="py-2 px-4 border-b w-20">
            <button v-if="canEditArticle(article)" @click="openEditDialog(article)" class="bg-yellow-500 text-white p-2 rounded mr-2 w-full">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h2 class="text-xl font-semibold mb-4">Published</h2>
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">Image</th>
          <th class="py-2 px-4 border-b">Title</th>
          <th class="py-2 px-4 border-b">Link</th>
          <th class="py-2 px-4 border-b">Date</th>
          <th class="py-2 px-4 border-b">Writer</th>
          <th class="py-2 px-4 border-b">Editor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in publishedArticles" :key="article.id">
          <td class="py-2 px-4 border-b">
            <img :src="article.Image" alt="Article Image" class="w-16 h-16 object-cover">
          </td>
          <td class="py-2 px-4 border-b">{{ article.Title }}</td>
          <td class="py-2 px-4 border-b">
            <a :href="article.Link" target="_blank">{{ article.Link }}</a>
          </td>
          <td class="py-2 px-4 border-b">{{ new Date(article.Date).toLocaleDateString() }}</td>
          <td class="py-2 px-4 border-b">{{ getUserName(article, 0) }}</td>
          <td class="py-2 px-4 border-b">{{ getUserName(article, 1) }}</td>
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

const isWriter = computed(() => auth.Type === 'Writer');
const isEditor = computed(() => auth.Type === 'Editor');

const forEditArticles = computed(() => store.articles.filter(article => article.Status === 'For Edit'));
const publishedArticles = computed(() => store.articles.filter(article => article.Status === 'Published'));

const newArticle = ref({
  Title: "",
  Image: "",
  Link: "",
  Date: "",
  Content: "",
  Status: "For Edit",
  Writer: auth.id,
  Editor: "",
  Company: "",
  userType: 'Writer'
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
  userType: 'Writer'
});

function handleAddSubmit(article) {
  article.Writer = auth.id;
  article.Status = "For Edit";
  article.userType = auth.Type;
  article.Writer = auth.id
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
  article.userType = auth.Type;
  article.Writer = auth.id
  store.editArticle(article.id, article);
  closeEditDialog();
}

function remove(id) {
  store.deleteArticle(id);
}

function canEditArticle(article) {
  return isWriter.value && article.Status === "For Edit" && article.Writer === auth.id;
}

function getUserName(val, type) {
  const userStore = useUserStore();
  // const user = userStore.editorList.find(user => user.id === userId) || userStore.writerList.find(user => user.id === userId);
  // return user ? `${user.Firstname} ${user.Lastname}` : "Unknown";
  console.log("HELLO", val);
  

  let getWriterUser = userStore.writerList.find(user => user.id == val.Writer)
  let getEditorUser = userStore.editorList.find(user => user.id == val.Editor)
  
  if (type == 0 && val.userType == 'Writer') return `${getWriterUser.Firstname} ${getWriterUser.Lastname}`
  if (type == 0 && val.userType == 'Editor') return `${getEditorUser.Firstname} ${getEditorUser.Lastname}`
  if (type == 1) return `${getEditorUser.Firstname} ${getEditorUser.Lastname}`
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
