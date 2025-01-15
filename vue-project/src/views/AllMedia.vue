<template>
  <div class="p-5">
    <h1 class="text-2xl font-bold mb-4 mt-10 text-center">All Media</h1>
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">Image</th>
          <th class="py-2 px-4 border-b">Title</th>
          <th class="py-2 px-4 border-b">Link</th>
          <th class="py-2 px-4 border-b">Writer</th>
          <th class="py-2 px-4 border-b">Editor</th>
          <th class="py-2 px-4 border-b">Status</th>
          <th class="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td class="py-2 px-4 border-b">
            <img
              :src="article.Image"
              alt="Article Image"
              class="w-16 h-16 object-cover"
            />
          </td>
          <td class="py-2 px-4 border-b">{{ article.Title }}</td>
          <td class="py-2 px-4 border-b">
            <a :href="article.Link" target="_blank">{{ article.Link }}</a>
          </td>
          <td class="py-2 px-4 border-b">{{ getUserName(article, 'Writer') }}</td>
          <td class="py-2 px-4 border-b">{{ getUserName(article, 'Editor') }}</td>
          <td class="py-2 px-4 border-b">{{ article.Status }}</td>
          <td class="py-2 px-4 border-b w-40">
            <button
              @click="openEditDialog(article)"
              class="bg-yellow-500 text-white p-2 rounded mr-2 w-16"
            >
              Edit
            </button>
            <button
              @click="remove(article.id)"
              class="bg-red-500 text-white p-2 rounded w-16"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

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
import { useUserStore } from "@/stores/user";
import ArticleForm from "@/components/ArticleForm.vue";

const articleStore = useArticleStore();
const auth = useAuthStore().auth;
const userStore = useUserStore();

const articles = computed(() => articleStore.articles);

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

function openEditDialog(article) {
  if (auth.Type === "Writer" && article.Status === "Published") {
    return; // Restrict writer from editing published articles
  }
  editArticleData.value = { ...article };
  editArticleData.value.userType = auth.Type
  editArticleData.value.Writer = auth.id
  isEditDialogOpen.value = true;
}

function closeEditDialog() {
  isEditDialogOpen.value = false;
}

function handleEditSubmit(article) {
  editArticleData.userType = auth.Type
  editArticleData.Writer = auth.id
  articleStore.editArticle(article.id, article);
  closeEditDialog();
}

function remove(id) {
  articleStore.deleteArticle(id);
}

function getUserName(val, type) {
  let getWriterUser = userStore.writerList.find(user => user.id == val.Editor)
  let getEditorUser = userStore.editorList.find(user => user.id == val.Editor)
  
  if (type == 'Writer' && getEditorUser && val.userType == 'Editor') return `${getEditorUser.Firstname} ${getEditorUser.Lastname}`
  if (type == 'Writer' && getWriterUser && val.userType == 'Writer') return `${getWriterUser.Firstname} ${getWriterUser.Lastname}`
  if (type == 'Editor') return `${getEditorUser.Firstname} ${getEditorUser.Lastname}`
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
th,
td {
  padding: 10px;
  border: 1px solid #ddd;
}
th {
  background-color: #f4f4f4;
}
</style>
