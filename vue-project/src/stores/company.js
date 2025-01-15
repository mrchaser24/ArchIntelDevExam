import { defineStore } from "pinia";
import { ref } from "vue";

export const useCompanyStore = defineStore("company", () => {
  const data = JSON.parse(localStorage.getItem("myData"));
  const companyList = ref(data.companyList || []);

  function addCompany(company) {
    company.id = Date.now();
    company.Status = 'Inactive';
    companyList.value.push(company);
    updateLocalStorage();
  }

  function editCompany(id, updatedCompany) {
    const index = companyList.value.findIndex(company => company.id === id);
    if (index !== -1) {
      companyList.value[index] = { ...companyList.value[index], ...updatedCompany };
      updateLocalStorage();
    }
  }

  function deleteCompany(id) {
    companyList.value = companyList.value.filter(company => company.id !== id);
    updateLocalStorage();
  }

  function updateLocalStorage() {
    const myData = JSON.parse(localStorage.getItem("myData"));
    myData.companyList = companyList.value;
    localStorage.setItem("myData", JSON.stringify(myData));
  }

  return {
    companyList,
    addCompany,
    editCompany,
    deleteCompany,
  };
});