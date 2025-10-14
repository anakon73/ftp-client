<script setup lang="ts">
import { ref } from 'vue'
import { useFtpUpload } from '../../api'

const currentPath = ref('/ftp-node/')
const upload = useFtpUpload()

function handleFileSelect(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    upload.mutate({ file, path: currentPath.value })
  }
}
</script>

<template>
  <div>
    <input type="file" @change="handleFileSelect">
    <p v-if="upload.isPending">
      Uploading...
    </p>
    <p v-if="upload.isSuccess">
      ✅ Uploaded!
    </p>
  </div>
</template>
