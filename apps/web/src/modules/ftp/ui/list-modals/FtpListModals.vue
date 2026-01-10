<script setup lang="ts">
import type { FileEntry } from 'server/types'
import { useModal } from '@/shared/lib/utils'

import { FtpCreateDir } from '../create-dir'
import { FtpDelete } from '../delete-item'
import { FtpRename } from '../rename'
import { FtpUpload } from '../upload'

const props = defineProps<{
  selectedItem: FileEntry | null
  path: string
}>()

const modalStore = useModal()
const { modal } = storeToRefs(modalStore)
const { close } = modalStore

const registry = {
  'rename': FtpRename,
  'delete': FtpDelete,
  'create-dir': FtpCreateDir,
  'upload': FtpUpload,
} as const

const ActiveModal = computed(() =>
  modal.value ? registry[modal.value as keyof typeof registry] : null,
)

const modalProps = computed(() => ({
  path: props.path,
  item: props.selectedItem,
  open: true,
}))
</script>

<template>
  <component
    :is="ActiveModal"
    v-if="ActiveModal"
    v-bind="modalProps"
    @close="close"
  />
</template>
