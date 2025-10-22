<script setup lang="ts">
import { FtpBackButton, FtpCreateDir, FtpRefreshButton, FtpUpload } from '../'

defineProps<{ path: string }>()
defineEmits<{ goBack: [] }>()
</script>

<template>
  <div class="mb-2 flex justify-between">
    <div class="flex gap-2">
      <FtpRefreshButton :path="path" />
      <FtpBackButton :path="path" @go-back="$emit('goBack')" />
    </div>
    <div class="flex gap-2">
      <FtpCreateDir :path="path" />
      <FtpUpload :path="path" />
    </div>
  </div>
</template>
