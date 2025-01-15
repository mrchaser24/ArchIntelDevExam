<template>
  <div class="flex flex-col justify-center items-center pa-5 h-full">
    <div class="search mt-10">
      <p class="mt-2">Search</p>
      <div class="flex justify-between items-center">
        <input v-model="search" class="h-full p-2 mr-2 shadow rounded-lg">
        <button class="w-full bg-blue-500 text-white p-2 rounded-lg mt-1">Search</button>
      </div>
    </div>
    <div class="mt-5">
      <h1 class="text-2xl font-bold mb-4">Articles</h1>
      <div v-for="article in filteredArticles" :key="article.id" v-if="filteredArticles" class="mb-4 p-4 border rounded shadow">
        <img :src="article.Image" alt="Article Image" class="mb-2 w-full h-60 object-cover">
        <h2 class="text-xl font-semibold">{{ article.Title }}</h2>
        <p class="text-gray-600 text-sm">Author: {{ getUserCompanyName(article.Writer, 0) }}</p>
        <p class="text-gray-600 text-sm">Company: {{ getUserCompanyName(article.Company, 1) }}</p>
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
  let getUser = userList.writerList.find(user => user.id == val)
  let getCompany = companyList.companyList.find(user => user.id == val)
  
  if (type == 0) return getUser.Firstname
  if (type == 1) return getCompany.name
}

const filteredArticles = computed(() => articles.articles.filter(item => item.Status == 'Published'));
</script>

<style>

</style>