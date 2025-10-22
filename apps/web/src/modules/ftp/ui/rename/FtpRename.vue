<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { Check } from 'lucide-vue-next'

import { FDialog, FDialogTitle } from '@/shared/ui/FDialog'
import { FInput } from '@/shared/ui/FInput'
import { FButton } from '@/shared/ui/FButton'

import { useFtpRename } from '../../'

const props = defineProps<{ name: string, open: boolean, path: string }>()

const emits = defineEmits<{ close: [] }>()

const { name, path } = toRefs(props)

const { mutate } = useFtpRename(path)

const newName = ref(name.value ?? '')

function close() {
  name.value = ''
  emits('close')
}

function rename() {
  mutate(
    { oldName: name.value, newName: newName.value },
    { onSuccess: () => emits('close') },
  )
}
</script>

<template>
  <FDialog :open="open" @close="close">
    <FDialogTitle class="mb-2">
      Rename
    </FDialogTitle>
    <div class="flex items-center justify-between gap-4">
      <FInput v-model="newName" />
      <FButton icon variant="success" @click="rename">
        <Check stroke-width="2" :size="16" />
      </FButton>
    </div>
  </FDialog>
</template>
