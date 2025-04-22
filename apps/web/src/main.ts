import './app'

import { app } from './shared/lib/app'

import App from './app/App.vue'

app.component('App', App)

app.mount('#app')
