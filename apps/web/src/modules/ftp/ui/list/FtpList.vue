<script setup lang="ts">
import type { FileEntry } from 'server/types'
import { useDotsWithText, usePathParams } from '@/shared/lib/utils'

import { sortFtpEntries } from '../../lib'
import { useFtpList } from '../../api'
import { FtpDelete, FtpListItem, FtpRename } from '../../ui'

const { path, handleChangePath } = usePathParams()

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
  <FtpDelete
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

  <div class="rounded-md bg-slate-800">
    <div v-if="isLoading" class="w-16">
      {{ dots }}
    </div>
    <div v-else-if="isError || items === undefined">
      <p>You got an error loading ftp directory</p>
    </div>
    <p
      v-else-if="sortedEntries.length === 0"
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
</template>
