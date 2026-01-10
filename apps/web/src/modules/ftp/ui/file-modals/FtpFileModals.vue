<script setup lang="ts">
import type { FileEntry } from 'server/types'
import { useModal } from '@/shared/lib/utils'

import { FtpDelete } from '../delete-item'
import { FtpRename } from '../rename'

const props = defineProps<{
  item: FileEntry | null
  path: string
}>()

defineEmits<{ setPath: [value: string], goBack: [] }>()

const modalStore = useModal()
const { modal } = storeToRefs(modalStore)
const { close } = modalStore

const registry = {
  rename: FtpRename,
  delete: FtpDelete,
} as const

const ActiveModal = computed(() =>
  modal.value ? registry[modal.value as keyof typeof registry] : null,
)

const modalProps = computed(() => ({
  path: props.path,
  item: props.item,
  open: true,
  isFile: true,
}))
</script>

<template>
  <component
    :is="ActiveModal"
    v-if="ActiveModal"
    v-bind="modalProps"
    @close="close"
    @set-path="$emit('setPath', $event)"
    @go-back="$emit('goBack')"
  />
</template>
