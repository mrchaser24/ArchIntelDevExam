<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-md w-1/2">
      <h2 class="text-xl font-semibold mb-4 text-center">
        {{ isEdit ? "Edit Article" : "Add Article" }}
      </h2>
      <form @submit.prevent="handleSubmit" class="mb-6">
        <div>
          <input
            v-model="articleData.Title"
            placeholder="Title"
            class="border p-2 mb-2 w-full rounded-lg"
            :class="titleHint ? 'border border-red-600' : ''"
          />
          <div class="text-sm text-red-600 ml-1" v-if="titleHint">
            Title is required!
          </div>
        </div>
        <div>
          <input
            v-model="articleData.Image"
            placeholder="Image URL"
            class="border p-2 mb-2 w-full rounded-lg"
            :class="imageHint ? 'border border-red-600' : ''"
          />
          <div class="text-sm text-red-600 ml-1" v-if="imageHint">
            Image URL is required!
          </div>
        </div>
        <div>
          <input
            v-model="articleData.Link"
            placeholder="Link"
            class="border p-2 mb-2 w-full rounded-lg"
            :class="linkHint ? 'border border-red-600' : ''"
          />
          <div class="text-sm text-red-600 ml-1" v-if="linkHint">
            Link is required!
          </div>
        </div>
        <div>
          <input
            v-model="articleData.Date"
            type="date"
            class="border p-2 mb-2 w-full rounded-lg"
            :class="dateHint ? 'border border-red-600' : ''"
          />
          <div class="text-sm text-red-600 ml-1" v-if="dateHint">
            Date is required!
          </div>
        </div>
        <div>
          <textarea
            v-model="articleData.Content"
            placeholder="Content"
            class="border p-2 mb-2 w-full rounded-lg"
            :class="contentHint ? 'border border-red-600' : ''"
          ></textarea>
          <div class="text-sm text-red-600 ml-1" v-if="contentHint">
            Content is required!
          </div>
        </div>
        <div>
          <select
            v-model="articleData.Status"
            class="border p-2 mb-2 w-full rounded-lg"
            :class="statusHint ? 'border border-red-600' : ''"
          >
            <option value="For Edit">For Edit</option>
            <option value="Published">Published</option>
          </select>
          <div class="text-sm text-red-600 ml-1" v-if="statusHint">
            Status is required!
          </div>
        </div>
        <div>
          <select
            v-model="articleData.Company"
            class="border p-2 mb-2 w-full rounded-lg"
            :class="companyHint ? 'border border-red-600' : ''"
          >
            <option v-for="item in companyList.companyList" :value="item.id">
              {{ item.name }}
            </option>
          </select>
          <div class="text-sm text-red-600 ml-1" v-if="companyHint">
            Company is required!
          </div>
        </div>
        <div class="action float-end mt-5">
          <button type="submit" class="bg-green-500 text-white p-2 rounded">
            {{ isEdit ? "Save Changes" : "Add Article" }}
          </button>
          <button
            @click="closeDialog"
            type="button"
            class="bg-red-500 text-white p-2 rounded ml-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useCompanyStore } from "@/stores/company";

const companyList = useCompanyStore();

const props = defineProps({
  isOpen: Boolean,
  isEdit: Boolean,
  article: Object,
});

const emit = defineEmits(["submit", "close"]);

const articleData = ref({ ...props.article });
const titleHint = ref(false);
const imageHint = ref(false);
const linkHint = ref(false);
const dateHint = ref(false);
const contentHint = ref(false);
const statusHint = ref(false);
const companyHint = ref(false);

watch(
  () => props.article,
  (newArticle) => {
    articleData.value = { ...newArticle };
  }
);

function handleSubmit() {
  titleHint.value = !articleData.value.Title;
  imageHint.value = !articleData.value.Image;
  linkHint.value = !articleData.value.Link;
  dateHint.value = !articleData.value.Date;
  contentHint.value = !articleData.value.Content;
  statusHint.value = !articleData.value.Status;

  if (
    titleHint.value ||
    imageHint.value ||
    linkHint.value ||
    dateHint.value ||
    contentHint.value ||
    statusHint.value
  ) {
    return;
  }

  emit("submit", { ...articleData.value });
}

function closeDialog() {
  emit("close");
}
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
