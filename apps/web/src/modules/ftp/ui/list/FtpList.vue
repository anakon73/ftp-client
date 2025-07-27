<script setup lang="ts">
import { Folder } from 'lucide-vue-next'
import type { FileEntry } from 'packages/trpc'

import { FtpListItem } from '../list-item'

interface Props {
  items: FileEntry[]
}

interface Emits {
  changePath: [path: string]
  goBack: []
}

defineProps<Props>()

const emits = defineEmits<Emits>()
</script>

<template>
  <div class="w-full rounded-md border border-slate-200">
    <div
      class="
        flex cursor-pointer items-center justify-between rounded-md p-2
        font-medium text-slate-600 transition-colors
        hover:bg-slate-100
      "
      @click="emits('goBack')"
    >
      <div class="flex items-center gap-2">
        <Folder :size="20" />
        <p class="font-medium">
          ...
        </p>
      </div>
    </div>
    <FtpListItem
      v-for="{ name, size, type } in items"
      :key="name"
      :name="name"
      :size="size"
      :type="type"
      @change-path="changePath => emits('changePath', changePath)"
    />
  </div>
</template>
