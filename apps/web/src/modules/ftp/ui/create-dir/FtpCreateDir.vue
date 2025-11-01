<script setup lang="ts">
import { FolderPlus, Plus } from 'lucide-vue-next'
import { useFtpCreateDir } from '../../api'

const props = defineProps<{ path: string }>()

const { mutate } = useFtpCreateDir(props.path)

const open = ref(false)
const name = ref('')

function onClose() {
  open.value = false
  name.value = ''
}

function createDir() {
  if (name.value.length !== 0 && open.value)
    mutate(name.value, { onSuccess: onClose })
}

onKeyStroke('Enter', createDir, { eventName: 'keydown' })
</script>

<template>
  <FButton icon variant="secondary" @click="open = true">
    <FolderPlus :size="16" />
  </FButton>

  <FDialog :open @close="onClose">
    <div class="flex items-center justify-between gap-4">
      <FInput v-model="name" />
      <FButton icon variant="success" @click="createDir">
        <Plus :size="16" />
      </FButton>
    </div>
  </FDialog>
</template>
