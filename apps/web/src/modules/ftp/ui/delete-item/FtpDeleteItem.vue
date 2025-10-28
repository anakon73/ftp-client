<script setup lang="ts">
import type { FileEntry } from 'packages/trpc'

import { FButton } from '@/shared/ui/FButton'
import { FDialog, FDialogTitle } from '@/shared/ui/FDialog'

import { useFtpDelete } from '../../api'

const props = defineProps<{
  open: boolean
  item: FileEntry | null
  path: string
}>()

const emits = defineEmits<{ close: [] }>()

const { item, path } = toRefs(props)

const { mutate } = useFtpDelete(path)

function deleteItem() {
  if (!item.value)
    return

  mutate(item.value, { onSuccess: () => emits('close') })
}
</script>

<template>
  <FDialog :open @close="emits('close')">
    <FDialogTitle class="mb-5">
      Are you sure?
    </FDialogTitle>
    <div class="flex justify-end gap-2">
      <FButton variant="destructive" @click="emits('close')">
        No
      </FButton>
      <FButton variant="success" @click="deleteItem">
        Yes
      </FButton>
    </div>
  </FDialog>
</template>
