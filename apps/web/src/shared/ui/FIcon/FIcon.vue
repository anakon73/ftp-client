<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next'
import type { ClassValue } from '@/shared/lib/styles'

const props = withDefaults(
  defineProps<{ icon: LucideIcon, class?: ClassValue, size?: number }>(),
  { size: 16 },
)
</script>

<template>
  <component :is="icon" :size :class="props.class" />
</template>
