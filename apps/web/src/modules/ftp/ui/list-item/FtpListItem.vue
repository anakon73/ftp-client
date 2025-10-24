<script setup lang="ts">
import { computed, toRefs } from 'vue'
import {
  File,
  FilePen,
  FileSymlink,
  Folder,
  Trash2,
} from 'lucide-vue-next'
import type { FileEntry } from 'packages/trpc'

import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuSeparator,
} from '@/shared/ui/ContextMenu'

import { FtpDownload } from '../'

const props = defineProps<{
  item: FileEntry
  path: string
}>()

const emits = defineEmits<{
  changePath: [path: string]
  delete: []
  rename: []
}>()

const { item } = toRefs(props)
const { name, size, type } = toRefs(item.value)

function handleClick() {
  if (type.value === 'directory') {
    emits('changePath', name.value)
  }
}

const sizeInBytes = computed(() => {
  if (!size.value)
    return '0 B'

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let fileSize = size.value
  let unitIndex = 0

  while (fileSize >= 1024 && unitIndex < units.length - 1) {
    fileSize /= 1024
    unitIndex++
  }

  return `${fileSize.toFixed(1)} ${units[unitIndex]}`
})

const icon = computed(() => {
  switch (type.value) {
    case 'directory':
      return Folder
    case 'symbolicLink':
      return FileSymlink
    default:
      return File
  }
})
</script>

<template>
  <ContextMenu>
    <template #trigger>
      <div
        class="
          flex cursor-pointer items-center justify-between gap-2 rounded-md p-2
          text-zinc-200 transition-colors select-none
          hover:bg-slate-600
        "
        @click="handleClick"
      >
        <div class="flex items-center gap-2">
          <component
            :is="icon"
            :size="20"
            class="shrink-0"
          />
          <p
            class="
              max-w-[150px] truncate font-medium
              min-[340px]:max-w-[200px]
              min-[460px]:max-w-xs
              min-[560px]:max-w-md
            "
          >
            {{ name }}
          </p>
        </div>
        <div
          v-if="size && type === 'file'"
          class="text-sm whitespace-nowrap text-slate-500"
        >
          {{ sizeInBytes }}
        </div>
      </div>
    </template>

    <div>
      <FtpDownload v-if="type !== 'directory'" :path :name />
      <ContextMenuSeparator />
      <ContextMenuItem :icon="FilePen" @click="emits('rename')">
        Rename
      </ContextMenuItem>
      <ContextMenuItem :icon="Trash2" @click="emits('delete')">
        Delete
      </ContextMenuItem>
    </div>
  </ContextMenu>
</template>
