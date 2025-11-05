<script setup lang="ts">
import type { FileEntry } from 'server/types'
import { useFtpDelete } from '../../api'

const props = defineProps<{
  open: boolean
  item: FileEntry | null
  path: string
}>()

const emits = defineEmits<{ close: [] }>()

const { mutate } = useFtpDelete(props.path)

function deleteItem() {
  if (!props.item)
    return

  mutate(props.item, { onSuccess: () => emits('close') })
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
