<script setup lang="ts">
import { computed, ref } from 'vue'
import type { FileEntry } from 'packages/trpc'

import { useDotsWithText, usePathParams } from '@/shared/lib/utils'

import { sortFtpEntries } from '../../lib'
import {
  FtpDeleteItem,
  FtpListItem,
  FtpRename,
  FtpToolbar,
  useFtpList,
} from '../../'

const path = usePathParams()

const { dots } = useDotsWithText('Loading')

const { data: items, isLoading, isError } = useFtpList(path)

const selectedItem = ref<FileEntry | null>(null)
const showDelete = ref(false)
const showRename = ref(false)

function handleChangePath(newPath: string) {
  path.value = path.value.endsWith('/')
    ? path.value + newPath
    : `${path.value}/${newPath}`
}

function goBack() {
  if (path.value === '/' || path.value === '')
    return

  const segments = path.value.split('/').filter(Boolean)
  segments.pop()

  path.value = `/${segments.join('/')}`
}

function openRename(item: FileEntry) {
  selectedItem.value = item
  showDelete.value = false
  showRename.value = true
}

function openDelete(item: FileEntry) {
  selectedItem.value = item
  showDelete.value = true
  showRename.value = false
}

function closeRename() {
  selectedItem.value = null
  showRename.value = false
}

function closeDelete() {
  selectedItem.value = null
  showDelete.value = false
}

const sortedEntries = computed(() => sortFtpEntries(items.value ?? []))
</script>

<template>
  <FtpDeleteItem
    :path="path"
    :item="selectedItem"
    :open="showDelete"
    @close="closeDelete"
  />
  <FtpRename
    v-if="selectedItem && showRename"
    :path="path"
    :open="showRename"
    :name="selectedItem.name"
    @close="closeRename"
  />

  <div v-if="isLoading" class="w-16">
    {{ dots }}
  </div>
  <div v-else-if="isError || items === undefined">
    <p>You got an error loading ftp directory</p>
  </div>
  <div v-else>
    <FtpToolbar :path="path" @go-back="goBack" />
    <div class="rounded-md bg-slate-800">
      <FtpListItem
        v-for="item in sortedEntries"
        :key="`${item.type}-${item.name}`"
        :="item"
        @rename="openRename(item)"
        @delete="openDelete(item)"
        @change-path="handleChangePath"
      />
    </div>
  </div>
</template>
