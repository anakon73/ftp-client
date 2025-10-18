<script setup lang="ts">
import { ref } from 'vue'
import { Folder } from 'lucide-vue-next'
import type { FileEntry } from 'packages/trpc'

import { usePathParams } from '@/shared/lib/utils'
import { useFtpDelete, useFtpUpload } from '../../api'

import { FtpListItem } from '../list-item'
import { FtpDeleteItem } from '../delete-item'
import { FtpUpload } from '../upload'

defineProps<{ items: FileEntry[], path: string }>()

const emits = defineEmits<{ changePath: [path: string], goBack: [] }>()

const path = usePathParams()

const { mutate: deleteMutation } = useFtpDelete(path)
const { mutate: uploadMutation } = useFtpUpload(path)

const selectedItem = ref<FileEntry | null>(null)

function deleteItem(item: FileEntry) {
  selectedItem.value = null
  deleteMutation({ path: path.value, name: item.name, type: item.type })
}

function uploadItem(file: File) {
  uploadMutation(file)
}
</script>

<template>
  <FtpDeleteItem
    :open="!!selectedItem"
    @close="selectedItem = null"
    @delete="deleteItem(selectedItem!)"
  />
  <div>
    <FtpUpload @upload="uploadItem" />
    <div class="rounded-md bg-slate-800">
      <div
        v-if="path !== '/'"
        class="
          flex cursor-pointer items-center justify-between rounded-md p-2
          font-medium text-zinc-200 transition-colors
          hover:bg-slate-600
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
        v-for="item in items"
        :key="`${item.type}-${item.name}`"
        :="item"
        @delete="selectedItem = item"
        @change-path="changePath => emits('changePath', changePath)"
      />
    </div>
  </div>
</template>
