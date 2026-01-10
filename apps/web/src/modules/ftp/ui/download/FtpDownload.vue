<script setup lang="ts">
import { Download } from 'lucide-vue-next'
import { useFtpDownload } from '../../api'

const props = defineProps<{ path: string, name: string }>()

const { mutate } = useFtpDownload(props.path)
</script>

<template>
  <FContextMenuItem :icon="Download" @click="mutate(() => props.name)">
    Download
  </FContextMenuItem>
</template>
