<script setup lang="ts">
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
    <FIcon :is="icon" v-if="icon" :icon />
    <slot />
  </ContextMenuItem>
</template>
