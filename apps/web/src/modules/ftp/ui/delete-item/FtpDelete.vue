<script setup lang="ts">
import type { FileEntry } from 'server/types'
import { useFtpDelete } from '../../api'

const props = defineProps<{
  open: boolean
  item: FileEntry | null
  path: string
  isFile?: boolean
}>()

const emits = defineEmits<{ close: [], goBack: [] }>()

const { path, item } = toRefs(props)

const basePath = computed(
  () => props.isFile
    ? path.value.split('/').slice(0, -1).join('/')
    : path.value,
)

const { mutate } = useFtpDelete(basePath)

function deleteItem() {
  if (!props.item)
    return

  if (item.value === null)
    return

  mutate(item.value, { onSuccess: () => {
    emits('close')
    if (props.isFile)
      emits('goBack')
  } })
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
