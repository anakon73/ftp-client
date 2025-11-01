<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import { useFtpRename } from '../../api'

const props = defineProps<{ name: string, open: boolean, path: string }>()

const emits = defineEmits<{ close: [] }>()

const { mutate } = useFtpRename(props.path)

const newName = ref(props.name ?? '')

function close() {
  newName.value = ''
  emits('close')
}

function rename() {
  mutate({ oldName: props.name, newName }, { onSuccess: () => emits('close') })
}
</script>

<template>
  <FDialog :open @close="close">
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
