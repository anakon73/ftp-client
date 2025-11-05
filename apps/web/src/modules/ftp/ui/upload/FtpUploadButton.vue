<script setup lang="ts">
import { Upload } from 'lucide-vue-next'
import { useModalRoute } from '@/shared/lib/utils'

const { openModal } = useModalRoute('FtpUpload')
</script>

<template>
  <FButton icon variant="secondary" @click="openModal">
    <FIcon :icon="Upload" />
  </FButton>
</template>
