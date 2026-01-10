<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { useFtpCreateDir } from '../../api'

const props = defineProps<{ path: string, open: boolean }>()

const emits = defineEmits<{ close: [] }>()

const { mutate } = useFtpCreateDir(props.path)

const name = ref('')

function close() {
  name.value = ''
  emits('close')
}

function createDir() {
  if (name.value.length)
    mutate(name, { onSuccess: close })
}

onKeyStroke('Enter', createDir, { eventName: 'keydown' })
</script>

<template>
  <FDialog :open @close="close">
    <FDialogTitle class="mb-5">
      Create directory
    </FDialogTitle>
    <div class="flex items-center justify-between gap-4">
      <FInput v-model="name" />
      <FButton icon variant="success" @click="createDir">
        <FIcon :icon="Plus" />
      </FButton>
    </div>
  </FDialog>
</template>
