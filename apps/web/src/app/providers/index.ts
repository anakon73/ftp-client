import type { App } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

import { router } from './router'

const pinia = createPinia()

export function applyProviders(app: App) {
  app.use(VueQueryPlugin)
  app.use(pinia)
  app.use(router)
}
