<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { FButton } from '@/shared/ui/FButton'

import { FtpUpload } from '../upload'
import { FtpCreateDir } from '../create-dir'

defineProps<{ path: string }>()
defineEmits<{ goBack: [] }>()
</script>

<template>
  <div class="mb-2 flex justify-between">
    <FButton
      v-if="path !== '/'"
      variant="secondary"
      icon
      @click="$emit('goBack')"
    >
      <ArrowLeft :size="16" />
    </FButton>
    <div class="flex gap-2">
      <FtpCreateDir :path="path" />
      <FtpUpload :path="path" />
    </div>
  </div>
</template>
