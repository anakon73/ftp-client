<script setup lang="ts">
import { ref } from 'vue'

import { FtpList, useFtpList } from '@/modules/ftp'

import { useDotdotdotWithText } from '@/shared/lib/utils'

const path = ref('/')

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
    <div v-if="isLoading">
      <p>{{ useDotdotdotWithText('Loading') }}</p>
    </div>
    <div v-if="isError || items === undefined">
      <p>Error loading items</p>
    </div>
    <FtpList
      v-else
      :items="items"
      @go-back="goBack"
      @change-path="handleChangePath"
    />
  </div>
</template>
