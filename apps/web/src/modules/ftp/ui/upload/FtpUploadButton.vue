<script setup lang="ts">
import { Upload } from 'lucide-vue-next'
import { useModal } from '@/shared/lib/utils'

const { open } = useModal()
</script>

<template>
  <FButton icon variant="secondary" @click="open('upload')">
    <FIcon :icon="Upload" />
  </FButton>
</template>
