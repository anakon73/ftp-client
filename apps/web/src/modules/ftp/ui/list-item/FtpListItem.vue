<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { File, FileSymlink, Folder } from 'lucide-vue-next'
import type { FileEntry } from 'packages/trpc'

interface Props {
  name: string
  size: number
  type: FileEntry['type']
}

interface Emits {
  changePath: [path: string]
}

const props = defineProps<Props>()

const emits = defineEmits<Emits>()

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
  <div
    class="
      flex cursor-pointer items-center justify-between rounded-md p-2
      text-slate-600 transition-colors
      hover:bg-slate-100
    "
    @click="handleClick"
  >
    <div class="flex items-center gap-2">
      <component
        :is="icon"
        :size="20"
      />
      <p class="font-medium">
        {{ name }}
      </p>
    </div>
    <div v-if="size && type === 'file'" class="text-sm text-slate-500">
      {{ sizeInBytes }}
    </div>
  </div>
</template>
