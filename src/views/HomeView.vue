<template>
  <div class="flex flex-col justify-center items-center pa-6 h-full">
    <div class="mt-10 w-full p-5">
      <h1 class="text-2xl font-bold mb-4 text-center">Articles</h1>
      <div v-for="article in filteredArticles" :key="article.id" v-if="filteredArticles" class="mb-4 p-4 border rounded shadow">
        <img :src="article.Image" alt="Article Image" class="mb-2 w-full h-60 object-cover">
        <h2 class="text-xl font-semibold">{{ article.Title }}</h2>
        <p class="text-gray-600 text-sm">Author: {{ getUserCompanyName(article, 0) }}</p>
        <p class="text-gray-600 text-sm">Company: {{ getUserCompanyName(article, 1) }}</p>
        <p class="text-gray-600">{{ article.Date }}</p>
        <p class="mt-2">{{ article.Content }}</p>
        <div @click="articleLinkJump(article.Link)" target="_blank" class="text-blue-500 hover:underline">Read more</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useArticleStore } from '@/stores/article';
import { useUserStore } from '@/stores/user';
import { useCompanyStore } from '@/stores/company';

const auth = useAuthStore()
const userList = useUserStore()
const companyList = useCompanyStore()
const articles = useArticleStore()
const search = ref('')

function articleLinkJump(val) {
  window.open(`https://${val}`, '_blank')
}

function getUserCompanyName(val, type) {
  let getWriterUser = userList.writerList.find(user => user.id == val.Writer)
  let getEditorUser = userList.editorList.find(user => user.id == val.Editor)
  let getCompany = companyList.companyList.find(user => user.id == val.Company)
  
  if (type == 0 && val.userType == 'Writer') return `${getWriterUser.Firstname} ${getWriterUser.Lastname}`
  if (type == 0 && val.userType == 'Editor') return `${getEditorUser.Firstname} ${getEditorUser.Lastname}`
  if (type == 1) return getCompany.name
}

const filteredArticles = computed(() => articles.articles.filter(item => item.Status == 'Published'));
</script>

<style>

</style>