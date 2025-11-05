<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'

defineProps<{ path: string }>()
defineEmits<{ goBack: [] }>()
</script>

<template>
  <FButton
    v-if="path !== '/'"
    variant="secondary"
    icon
    @click="$emit('goBack')"
  >
    <FIcon :icon="ArrowLeft" />
  </FButton>
</template>
