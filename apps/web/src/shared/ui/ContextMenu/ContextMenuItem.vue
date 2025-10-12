<script setup lang="ts">
import { ContextMenuItem } from 'reka-ui'
import type { LucideIcon } from 'lucide-vue-next'

import { cn } from '@/shared/lib/styles'

const props = defineProps<{ class?: string, icon?: LucideIcon }>()
</script>

<template>
  <ContextMenuItem
    :class="cn(
      `
        cursor-pointer rounded-lg p-1 font-medium text-slate-500
        transition-colors
        hover:bg-slate-100 hover:outline-0
      `,
      icon ? 'flex items-center gap-2' : '',
      props.class)"
  >
    <component :is="icon" v-if="icon" :size="16" />
    <slot />
  </ContextMenuItem>
</template>
