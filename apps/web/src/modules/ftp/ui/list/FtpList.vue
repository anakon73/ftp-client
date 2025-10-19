<script setup lang="ts">
import { computed, ref } from 'vue'
import type { FileEntry } from 'packages/trpc'

import { useDotsWithText, usePathParams } from '@/shared/lib/utils'

import { useFtpList } from '../../api'
import { sortFtpEntries } from '../../lib'
import { FtpListItem } from '../list-item'
import { FtpDeleteItem } from '../delete-item'
import { FtpToolbar } from '../toolbar'

const path = usePathParams()

const { dots } = useDotsWithText('Loading')

const { data: items, isLoading, isError } = useFtpList(path)

const selectedItem = ref<FileEntry | null>(null)

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

const sortedEntries = computed(() => sortFtpEntries(items.value ?? []))
</script>

<template>
  <FtpDeleteItem
    :path="path"
    :item="selectedItem"
    :open="!!selectedItem"
    @close="selectedItem = null"
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
        @delete="selectedItem = item"
        @change-path="handleChangePath"
      />
    </div>
  </div>
</template>
