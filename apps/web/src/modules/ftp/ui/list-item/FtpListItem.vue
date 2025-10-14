<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { Copy, File, FileSymlink, Folder, Trash2 } from 'lucide-vue-next'
import type { FileEntry } from 'packages/trpc'

import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuSeparator,
} from '@/shared/ui/ContextMenu'

interface Props {
  name: string
  size: number
  type: FileEntry['type']
}

const props = defineProps<Props>()

const emits = defineEmits<{ changePath: [path: string], delete: [] }>()

const { size, type } = toRefs(props)

function handleClick() {
  if (type.value === 'directory') {
    emits('changePath', props.name)
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
  switch (props.type) {
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
          />
          <p class="max-w-4/5 truncate font-medium">
            {{ name }}
          </p>
        </div>
        <div v-if="size && type === 'file'" class="text-sm text-slate-500">
          {{ sizeInBytes }}
        </div>
      </div>
    </template>

    <div>
      <ContextMenuItem :icon="Trash2" @click="emits('delete')">
        Delete
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem :icon="Copy">
        Copy
      </ContextMenuItem>
    </div>
  </ContextMenu>
</template>
