import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// LOCAL STORAGE
if (!localStorage.getItem('myData')) {
  localStorage.setItem('myData', JSON.stringify({
    auth: null,
    companyList: [
      {
        id: 0,
        logo: 'https://picsum.photos/id/1/200/200',
        name: 'Test Company',
        Status: 'Inactive',
      }
    ],
    editorList: [
      {
        id: 0,
        Firstname: 'Admin',
        Lastname: 'Admin',
        Type: 'Editor',
        Status: 'Inactive',
        username: 'admin',
        password: 'admin'
      }
    ],
    writerList: [
      {
        id: 0,
        Firstname: 'John',
        Lastname: 'Doe',
        editorId: 0,
        Type: 'Writer',
        Status: 'Inactive',
        username: 'test',
        password: 'test'
      },
      {
        id: 1,
        Firstname: 'Bob',
        Lastname: 'Doe',
        editorId: 0,
        Type: 'Writer',
        Status: 'Inactive',
        username: 'test1',
        password: 'test1'
      },
    ],
    article: [
      {
        id: 0,
        Image: 'https://picsum.photos/12/200',
        Title: 'test article #1',
        Link: 'test.com',
        Date: new Date(),
        Content: 'This should be a very very very long text but let me make it short for a while.',
        Status: 'For Edit',
        Writer: 0,
        Editor: 0,
        Company: 0,
        userType: 'Writer'
      },
      {
        id: 1,
        Image: 'https://picsum.photos/13/200',
        Title: 'test article #2',
        Link: 'test.com',
        Date: new Date(),
        Content: 'This should be a very very very long text but let me make it short for a while.',
        Status: 'Published',
        Writer: 0,
        Editor: 0,
        Company: 0,
        userType: 'Writer'
      },
      {
        id: 1,
        Image: 'https://picsum.photos/14/200',
        Title: 'test article #3',
        Link: 'test.com',
        Date: new Date(),
        Content: 'This should be a very very very long text but let me make it short for a while.',
        Status: 'Published',
        Writer: 1,
        Editor: 0,
        Company: 0,
        userType: 'Writer'
      },
    ]
  }))
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
