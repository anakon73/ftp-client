<script setup lang="ts">
import {
  File,
  FilePen,
  FileSymlink,
  Folder,
  Trash2,
} from 'lucide-vue-next'
import type { FileEntry } from 'server/types'

import { formatSizeInBytes } from '@/shared/lib/utils'
import { FtpDownload } from '../download'

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
  emits('changePath', name.value)
}

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
  <FContextMenu>
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
          <FIcon :icon :size="20" class="shrink-0" />
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
          {{ formatSizeInBytes(size) }}
        </div>
      </div>
    </template>

    <template #default>
      <div>
        <div v-if="type !== 'directory'">
          <FtpDownload :path :name />
          <FContextMenuSeparator />
        </div>
        <FContextMenuItem :icon="FilePen" @click="emits('rename')">
          Rename
        </FContextMenuItem>
        <FContextMenuItem :icon="Trash2" @click="emits('delete')">
          Delete
        </FContextMenuItem>
      </div>
    </template>
  </FContextMenu>
</template>
