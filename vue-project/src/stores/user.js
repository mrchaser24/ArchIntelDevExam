import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const data = JSON.parse(localStorage.getItem("myData"));
  const editorList = ref(data.editorList || []);
  const writerList = ref(data.writerList || []);

  function addUser(user) {
    user.id = Date.now();
    user.Status = 'Inactive';
    if (user.Type === 'Editor') {
      editorList.value.push(user);
    } else if (user.Type === 'Writer') {
      writerList.value.push(user);
    } else {
      throw new Error("Invalid user type");
    }
    updateLocalStorage();
  }

  function editUser(id, updatedUser) {
    let userIndex = editorList.value.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      editorList.value[userIndex] = { ...editorList.value[userIndex], ...updatedUser };
    } else {
      userIndex = writerList.value.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        writerList.value[userIndex] = { ...writerList.value[userIndex], ...updatedUser };
      }
    }
    updateLocalStorage();
  }

  function deleteUser(id, userType) {
    if (userType === 'Editor') {
      editorList.value = editorList.value.filter(user => user.id !== id);
    } else if (userType === 'Writer') {
      writerList.value = writerList.value.filter(user => user.id !== id);
    } else {
      throw new Error("Invalid user type");
    }
    updateLocalStorage();
  }

  function updateLocalStorage() {
    const myData = JSON.parse(localStorage.getItem("myData"));
    myData.editorList = editorList.value;
    myData.writerList = writerList.value;
    localStorage.setItem("myData", JSON.stringify(myData));
  }

  return {
    editorList,
    writerList,
    addUser,
    editUser,
    deleteUser,
  };
});