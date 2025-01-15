import { ref } from "vue";
import { defineStore } from "pinia";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => {
  const auth = ref(JSON.parse(localStorage.getItem("myData")).auth)

  function login(username, password, userType) {
    const data = JSON.parse(localStorage.getItem("myData"))
    const userEditor = data.editorList.find((user) => user.username === username && user.password === password)
    const userWriter = data.writerList.find((user) => user.username === username && user.password === password)

    let user = null;
    if (userType == 'Editor') user = userEditor
    if (userType == 'Writer') user = userWriter 
    if (user) {
      user.Status = 'Active'
      auth.value = user
      data.auth = user
      localStorage.setItem("myData", JSON.stringify(data))
      return true
    } else {
      return false
    }
  }

  function register(Firstname, Lastname, username, password, userType) {
    const data = JSON.parse(localStorage.getItem("myData"));
    const newUser = {
      id: Date.now(),
      Firstname,
      Lastname,
      username,
      password,
      Type: userType,
      created: new Date(),
      Status: 'Inactive'
    };

    if (userType === 'Editor') {
      data.editorList.push(newUser);
    } else if (userType === 'Writer') {
      data.writerList.push(newUser);
    } else {
      throw new Error("Invalid user type");
    }

    localStorage.setItem("myData", JSON.stringify(data));
    login(newUser.username, newUser.password, newUser.Type)
    return newUser;
  }

  function logout() {
    router.push('/')
    const data = JSON.parse(localStorage.getItem("myData"));
    const userType = data.auth.Type;
    const userId = data.auth.id;

    if (userType === 'Writer') {
      const user = data.writerList.find(user => user.id === userId);
      if (user) user.Status = 'Inactive';
    } else if (userType === 'Editor') {
      const user = data.editorList.find(user => user.id === userId);
      if (user) user.Status = 'Inactive';
    }

    auth.value = null;
    data.auth = null;
    localStorage.setItem("myData", JSON.stringify(data));
  }

  return { auth, login, logout, register };
});
