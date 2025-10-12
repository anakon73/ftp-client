<script setup lang="ts">
import { DialogTitle } from 'reka-ui'
import { type ClassValue, cn } from '@/shared/lib/styles'

const props = defineProps<{ class?: ClassValue }>()
</script>

<template>
  <DialogTitle :class="cn('text-2xl font-semibold', props.class ?? '')">
    <slot />
  </DialogTitle>
</template>
