<script setup lang="ts">
import { FolderPlus } from 'lucide-vue-next'
import { useModalRoute } from '@/shared/lib/utils'

const { openModal } = useModalRoute('FtpCreateDir')
</script>

<template>
  <FButton icon variant="secondary" @click="openModal">
    <FIcon :icon="FolderPlus" />
  </FButton>
</template>
