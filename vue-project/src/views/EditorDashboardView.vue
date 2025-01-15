<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Editor Dashboard</h1>
    <button
      @click="openAddUserDialog"
      class="bg-blue-500 text-white p-2 rounded mb-6"
    >
      Add User
    </button>
    <button
      @click="openAddCompanyDialog"
      class="bg-blue-500 text-white p-2 rounded mb-6"
    >
      Add Company
    </button>

    <h2 class="text-xl font-semibold mb-4">Users</h2>
    <ul>
      <li
        v-for="user in allUsers"
        :key="user.id"
        class="mb-4 p-4 border rounded"
      >
        <p class="text-xl font-semibold">
          {{ user.Firstname }} {{ user.Lastname }}
        </p>
        <p class="text-gray-600">Username: {{ user.username }}</p>
        <p class="text-gray-600">Type: {{ user.Type }}</p>
        <p class="text-gray-600">Status: {{ user.Status }}</p>
        <button
          @click="openEditUserDialog(user)"
          class="bg-yellow-500 text-white p-2 rounded mr-2"
        >
          Edit
        </button>
        <button
          @click="removeUser(user.id, user.Type)"
          class="bg-red-500 text-white p-2 rounded"
        >
          Delete
        </button>
      </li>
    </ul>

    <h2 class="text-xl font-semibold mb-4">Companies</h2>
    <ul>
      <li
        v-for="company in companies"
        :key="company.id"
        class="mb-4 p-4 border rounded"
      >
        <img
          :src="company.logo"
          alt="Company Logo"
          class="mb-2 w-full h-60 object-cover"
        />
        <p class="text-xl font-semibold">{{ company.name }}</p>
        <p class="text-gray-600">Status: {{ company.Status }}</p>
        <button
          @click="openEditCompanyDialog(company)"
          class="bg-yellow-500 text-white p-2 rounded mr-2"
        >
          Edit
        </button>
        <button
          @click="removeCompany(company.id)"
          class="bg-red-500 text-white p-2 rounded"
        >
          Delete
        </button>
      </li>
    </ul>

    <UserForm
      :isOpen="isAddUserDialogOpen"
      :isEdit="false"
      :user="newUser"
      @submit="handleAddUserSubmit"
      @close="closeAddUserDialog"
    />

    <UserForm
      :isOpen="isEditUserDialogOpen"
      :isEdit="true"
      :user="editUserData"
      @submit="handleEditUserSubmit"
      @close="closeEditUserDialog"
    />

    <CompanyForm
      :isOpen="isAddCompanyDialogOpen"
      :isEdit="false"
      :company="newCompany"
      @submit="handleAddCompanySubmit"
      @close="closeAddCompanyDialog"
    />

    <CompanyForm
      :isOpen="isEditCompanyDialogOpen"
      :isEdit="true"
      :company="editCompanyData"
      @submit="handleEditCompanySubmit"
      @close="closeEditCompanyDialog"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { useCompanyStore } from "@/stores/company";
import { useAuthStore } from "@/stores/auth";
import UserForm from "@/components/dashboard/UserForm.vue";
import CompanyForm from "@/components/dashboard/CompanyForm.vue";

const userStore = useUserStore();
const companyStore = useCompanyStore();
const auth = useAuthStore().auth;

const allUsers = computed(() =>
  userStore.writerList.filter((user) => user.editorId == auth.id)
);
const companies = computed(() => companyStore.companyList);

const newUser = ref({
  Firstname: "",
  Lastname: "",
  username: "",
  password: "",
  Type: "Writer",
  Status: "Inactive",
});

const newCompany = ref({
  logo: "",
  name: "",
  Status: "Inactive",
});

const isAddUserDialogOpen = ref(false);
const isEditUserDialogOpen = ref(false);
const editUserData = ref({
  id: null,
  Firstname: "",
  Lastname: "",
  username: "",
  password: "",
  Type: "Writer",
  Status: "Inactive",
});

const isAddCompanyDialogOpen = ref(false);
const isEditCompanyDialogOpen = ref(false);
const editCompanyData = ref({
  id: null,
  logo: "",
  name: "",
  Status: "Inactive",
});



function closeAddUserDialog() {
  isAddUserDialogOpen.value = false;
}
function closeEditUserDialog() {
  isEditUserDialogOpen.value = false;
}
function closeAddCompanyDialog() {
  isAddCompanyDialogOpen.value = false;
}
function closeEditCompanyDialog() {
  isEditCompanyDialogOpen.value = false;
}
function openAddUserDialog() {
  isAddUserDialogOpen.value = true;
}
function openEditUserDialog(user) {
  editUserData.value = { ...user };
  isEditUserDialogOpen.value = true;
}
function openAddCompanyDialog() {
  isAddCompanyDialogOpen.value = true;
}
function openEditCompanyDialog(company) {
  editCompanyData.value = { ...company };
  isEditCompanyDialogOpen.value = true;
}

// USER ACTIONS
function handleAddUserSubmit(user) {
  user.editorId = auth.id
  userStore.addUser(user);
  closeAddUserDialog();
}
function handleEditUserSubmit(user) {
  userStore.editUser(user.id, user);
  closeEditUserDialog();
}
function removeUser(id, userType) {
  userStore.deleteUser(id, userType);
}

// COMPANY ACTIONS
function handleAddCompanySubmit(company) {
  companyStore.addCompany(company);
  closeAddCompanyDialog();
}
function handleEditCompanySubmit(company) {
  companyStore.editCompany(company.id, company);
  closeEditCompanyDialog();
}
function removeCompany(id) {
  companyStore.deleteCompany(id);
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
