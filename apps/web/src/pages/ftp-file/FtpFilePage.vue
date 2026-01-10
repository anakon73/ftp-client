<script setup lang="ts">
import { File } from 'lucide-vue-next'
import {
  FtpFileModals,
  FtpToolbar,
  useFtpDownload,
  useGetFile,
} from '@/modules/ftp'
import {
  formatDate,
  formatSizeInBytes,
  useModal,
  usePathParams,
} from '@/shared/lib/utils'

const { path, setFullPath, goBack } = usePathParams()

const { open } = useModal()

const { data: item } = useGetFile(path)

const basePath = computed(
  () => path.value.split('/').slice(0, -1).join('/'),
)

const { mutate } = useFtpDownload(basePath)

const buttons = computed(() => {
  return [
    {
      text: 'Download',
      click: () => mutate(item.value?.name ?? ''),
    },
    {
      text: 'Rename',
      click: () => open('rename'),
    },
    {
      text: 'Delete',
      click: () => open('delete'),
    },
  ]
})

const fields = computed(() => {
  if (!item.value)
    return null

  return Object.entries(item.value).map(([key, value]) => {
    if (key === 'size' && typeof value === 'number') {
      return { key, value: formatSizeInBytes(value) }
    }

    if (key === 'modifiedAt') {
      return { key, value: formatDate(value, undefined, 'de-DE') }
    }

    return { key, value }
  })
})
</script>

<template>
  <FtpFileModals
    v-if="item"
    :item
    :path
    @set-path="setFullPath"
    @go-back="goBack"
  />

  <div
    class="
      mx-auto max-w-4xl px-4 py-20
      lg:px-0
    "
  >
    <FtpToolbar is-file />

    <div v-if="!item && !fields">
      <p>Loading...</p>
    </div>

    <div v-else>
      <div class="mb-4 flex gap-4">
        <div class="inline-block rounded-2xl bg-slate-800 p-4">
          <File :size="200" class="text-zinc-200" />
        </div>
        <div class="space-y-2 text-lg text-zinc-200">
          <div v-for="field in fields" :key="field.key" class="flex gap-1">
            <p class="font-bold">
              {{ field.key }}:
            </p>
            <p>{{ field.value }}</p>
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <button
          v-for="button in buttons"
          :key="button.text"
          class="cursor-pointer rounded-md bg-slate-800 px-4 py-2 text-white"
          @click="button.click"
        >
          {{ button.text }}
        </button>
      </div>
    </div>
  </div>
</template>
