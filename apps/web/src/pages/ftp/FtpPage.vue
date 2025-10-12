<script setup lang="ts">
import { FtpList, useFtpList } from '@/modules/ftp'
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
</script>

<template>
  <div class="mx-auto mt-20 flex max-w-sm justify-center">
    <div v-if="isLoading" class="w-16">
      {{ dots }}
    </div>
    <div v-else-if="isError || items === undefined">
      <p>You got an error loading ftp directory</p>
    </div>
    <FtpList
      v-else
      :path="path"
      :items="items"
      @go-back="goBack"
      @change-path="handleChangePath"
    />
  </div>
</template>
