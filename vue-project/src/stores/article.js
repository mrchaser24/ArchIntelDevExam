import { defineStore } from "pinia";
import { ref } from "vue";

export const useArticleStore = defineStore("article", () => {
  const articles = ref(
    JSON.parse(localStorage.getItem("myData")).article || []
  );

  function addArticle(article) {
    article.id = articles.value.length
      ? articles.value[articles.value.length - 1].id + 1
      : 1;
    articles.value.push(article);
    updateLocalStorage();
  }

  function editArticle(id, updatedArticle) {
    const index = articles.value.findIndex((article) => article.id === id);
    if (index !== -1) {
      articles.value[index] = { ...articles.value[index], ...updatedArticle };
      updateLocalStorage();
    }
  }

  function deleteArticle(id) {
    articles.value = articles.value.filter((article) => article.id !== id);
    updateLocalStorage();
  }

  function setStatus(id, status) {
    const index = articles.value.findIndex((article) => article.id === id);
    if (index !== -1) {
      articles.value[index].Status = status;
      updateLocalStorage();
    }
  }

  function updateLocalStorage() {
    localStorage.setItem("myData", JSON.stringify({ article: articles.value }));
  }

  return { articles, addArticle, editArticle, deleteArticle, setStatus };
});
