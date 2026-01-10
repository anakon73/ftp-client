<script setup lang="ts">
import { useGetEntryType } from '@/modules/ftp'
import { usePathParams } from '@/shared/lib/utils'

import { FtpListPage } from '../ftp-list'
import { FtpFilePage } from '../ftp-file'

const { path } = usePathParams()
const { data: type } = useGetEntryType(path)

const page = computed(() => {
  if (!type.value)
    return null
  return type.value === 'directory' ? FtpListPage : FtpFilePage
})

onBeforeRouteUpdate((to) => {
  path.value = Array.isArray(to.params.pathMatch)
    ? to.params.pathMatch.join('/')
    : ''
})
</script>

<template>
  <component :is="page" v-if="page" />
</template>
