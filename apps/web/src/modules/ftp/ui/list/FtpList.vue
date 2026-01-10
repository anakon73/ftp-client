<script setup lang="ts">
import type { FileEntry } from 'server/types'
import {
  type FtpModal,
  useDotsWithText,
  useModal,
  usePathParams,
} from '@/shared/lib/utils'

import { sortFtpEntries } from '../../lib'
import { useFtpList } from '../../api'
import { FtpListItem, FtpListModals } from '../../ui'

const { path, handleChangePath } = usePathParams()
const { dots } = useDotsWithText('Loading')
const { open } = useModal()

const { data: items, isLoading, isError } = useFtpList(path)

const selectedItem = ref<FileEntry | null>(null)

function openModal(name: FtpModal, item: FileEntry | null = null) {
  open(name)
  selectedItem.value = item
}

const sortedEntries = computed(() => sortFtpEntries(items.value ?? []))
</script>

<template>
  <FtpListModals :selected-item :path="path" />

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
