<script setup lang="ts">
import { computed } from 'vue'
import { FtpList, useFtpList } from '@/modules/ftp'
import { sortFtpEntries } from '@/modules/ftp/lib'
import { useDotsWithText, usePathParams } from '@/shared/lib/utils'

const path = usePathParams()

const { dots } = useDotsWithText('Loading')

const { data: items, isLoading, isError } = useFtpList(path)

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
  <div class="mx-auto max-w-xl px-4 py-20">
    <div v-if="isLoading" class="w-16">
      {{ dots }}
    </div>
    <div v-else-if="isError || items === undefined">
      <p>You got an error loading ftp directory</p>
    </div>
    <FtpList
      v-else
      :path="path"
      :items="sortedEntries"
      @go-back="goBack"
      @change-path="handleChangePath"
    />
  </div>
</template>
