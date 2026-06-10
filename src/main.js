import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import App from './App.vue'
import router from './router'
import { themeOverrides } from './utils/theme'
import './assets/css/variables.css'
import './assets/css/global.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)
app.component('VueDatePicker', VueDatePicker);

app.provide('naiveTheme', themeOverrides)

app.mount('#app')
