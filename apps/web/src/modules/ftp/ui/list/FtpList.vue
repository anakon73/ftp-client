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

const { path, handleChangePath, goBack, setFullPath } = usePathParams()

const { dots } = useDotsWithText('Loading')

const { data: items, isLoading, isError } = useFtpList(path)

const selectedItem = ref<FileEntry | null>(null)
const showDelete = ref(false)
const showRename = ref(false)

function openModal(type: 'rename' | 'delete', item: FileEntry) {
  selectedItem.value = item
  showRename.value = type === 'rename'
  showDelete.value = type === 'delete'
}

function closeModal() {
  selectedItem.value = null
  showRename.value = false
  showDelete.value = false
}

const sortedEntries = computed(() => sortFtpEntries(items.value ?? []))
</script>

<template>
  <FtpDeleteItem
    :path
    :item="selectedItem"
    :open="showDelete"
    @close="closeModal"
  />
  <FtpRename
    v-if="selectedItem && showRename"
    :path
    :open="showRename"
    :name="selectedItem.name"
    @close="closeModal"
  />

  <div v-if="isLoading" class="w-16">
    {{ dots }}
  </div>
  <div v-else-if="isError || items === undefined">
    <p>You got an error loading ftp directory</p>
  </div>
  <div v-else>
    <FtpToolbar :path @go-back="goBack" @change-path="setFullPath" />
    <div class="rounded-md bg-slate-800">
      <p
        v-if="sortedEntries.length === 0"
        class="py-10 text-center text-xl font-bold text-zinc-200"
      >
        Directory is empty
      </p>
      <div v-else>
        <FtpListItem
          v-for="item in sortedEntries"
          :key="`${item.type}-${item.name}`"
          :item
          :path
          @rename="openModal('rename', item)"
          @delete="openModal('delete', item)"
          @change-path="handleChangePath"
        />
      </div>
    </div>
  </div>
</template>
