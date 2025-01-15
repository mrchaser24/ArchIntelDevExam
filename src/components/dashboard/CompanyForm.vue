<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-md w-1/2">
      <h2 class="text-xl font-semibold mb-4 text-center">
        {{ isEdit ? "Edit Company" : "Add Company" }}
      </h2>
      <form @submit.prevent="handleSubmit" class="mb-6">
        <div>
          <input
            v-model="companyData.logo"
            placeholder="Logo URL"
            class="border p-2 mb-2 w-full rounded-lg"
            :class="logoHint? 'border border-red-600':''"
          />
          <div class="text-sm text-red-600 ml-1" v-if="logoHint">Logo is required!</div>
        </div>
        <div>
          <input
            v-model="companyData.name"
            placeholder="Company Name"
            class="border p-2 mb-2 w-full rounded-lg"
            :class="nameHint? 'border border-red-600':''"
          />
          <div class="text-sm text-red-600 ml-1" v-if="nameHint">Company name is required!</div>
        </div>
        <div class="action float-end mt-5">
          <button type="submit" class="bg-green-500 text-white p-2 rounded">
            {{ isEdit ? "Save Changes" : "Add Company" }}
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

const props = defineProps({
  isOpen: Boolean,
  isEdit: Boolean,
  company: Object,
});
const emit = defineEmits(["submit", "close"]);
const companyData = ref({ ...props.company });
const logoHint = ref(false)
const nameHint = ref(false)

watch(
  () => props.company,
  (newCompany) => {
    companyData.value = { ...newCompany };
  }
);

function handleSubmit() {
  logoHint.value = false
  nameHint.value = false
  if (!companyData.value.logo) return logoHint.value = true
  if (!companyData.value.name) return nameHint.value = true
  emit("submit", { ...companyData.value });
}

function closeDialog() {
  emit("close");
}
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
