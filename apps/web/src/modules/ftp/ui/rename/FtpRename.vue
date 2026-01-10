<script setup lang="ts">
import type { FileEntry } from 'server/types'
import { Check } from 'lucide-vue-next'

import { useFtpRename } from '../../api'

const props = defineProps<{
  item: FileEntry | null
  open: boolean
  path: string
  isFile?: boolean
}>()

const emits = defineEmits<{ close: [], setPath: [value: string] }>()

const { path } = toRefs(props)

const name = ref('')

const basePath = computed(
  () => props.isFile
    ? path.value.split('/').slice(0, -1).join('/')
    : path.value,
)

const targetPath = computed(
  () => `${basePath.value}/${name.value}`,
)

const { mutate } = useFtpRename(basePath)

function submit() {
  mutate(
    { oldName: props.item?.name ?? '', name },
    { onSuccess: () => {
      emits('close')
      emits('setPath', targetPath.value)
    } },
  )
}

watchEffect(() => {
  if (props.open)
    name.value = props.item?.name ?? ''
})
</script>

<template>
  <FDialog :open @close="emits('close')">
    <FDialogTitle class="mb-2">
      Rename
    </FDialogTitle>
    <p />
    <div class="flex items-center justify-between gap-4">
      <FInput v-model="name" />
      <FButton icon variant="success" @click="submit">
        <FIcon :icon="Check" stroke-width="2" />
      </FButton>
    </div>
  </FDialog>
</template>
