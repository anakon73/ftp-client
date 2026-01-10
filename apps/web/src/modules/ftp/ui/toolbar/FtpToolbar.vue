<script setup lang="ts">
import { usePathParams } from '@/shared/lib/utils'

import { FtpBackButton } from '../back-button'
import { FtpRefreshButton } from '../refresh-button'
import { FtpCreateDirButton } from '../create-dir'
import { FtpUploadButton } from '../upload'
import { FtpBreadcrumb } from '../breadcrumb'

defineProps<{ isFile?: boolean }>()

const { path, goBack, setFullPath } = usePathParams()
</script>

<template>
  <div class="mb-2">
    <div class="mb-2 flex justify-between">
      <div class="flex gap-2">
        <FtpRefreshButton v-if="!isFile" :path />
        <FtpBackButton :path @go-back="goBack" />
      </div>
      <div v-if="!isFile" class="flex gap-2">
        <FtpCreateDirButton :path />
        <FtpUploadButton :path />
      </div>
    </div>
    <FtpBreadcrumb :path @change-path="setFullPath" />
  </div>
</template>
