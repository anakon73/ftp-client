<script setup lang="ts">
import { Download } from 'lucide-vue-next'
import { useFtpDownload } from '../../api'

const props = defineProps<{ path: string, name: string }>()

const { path, name } = toRefs(props)

const { mutate } = useFtpDownload(path, name)
</script>

<template>
  <ContextMenuItem :icon="Download" @click="mutate">
    Download
  </ContextMenuItem>
</template>
