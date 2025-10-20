<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { FButton } from '@/shared/ui/FButton'

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
    <ArrowLeft :size="16" />
  </FButton>
</template>
