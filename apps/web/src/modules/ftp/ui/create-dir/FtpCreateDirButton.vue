<script setup lang="ts">
import { FolderPlus } from 'lucide-vue-next'
import { useModal } from '@/shared/lib/utils'

const { open } = useModal()
</script>

<template>
  <FButton icon variant="secondary" @click="open('create-dir')">
    <FIcon :icon="FolderPlus" />
  </FButton>
</template>
