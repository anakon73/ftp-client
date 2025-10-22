<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'
import { type ClassValue, cn } from '@/shared/lib/styles'

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  class?: ClassValue
}

const props = defineProps<Props>()

const vModel = defineModel()
</script>

<template>
  <input
    v-model="vModel"
    :="$attrs"
    type="text"
    :class="cn(
      `
        block w-full rounded border border-gray-600 bg-gray-700 p-2 text-lg
        font-medium text-white placeholder-gray-400
        focus:border-blue-800 focus:outline-0
      `,
      props.class,
    )"
  >
</template>
