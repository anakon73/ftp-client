import type { App } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

export function applyProviders(app: App) {
  app.use(VueQueryPlugin)
}
