<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { useModalRoute, usePathParams } from '@/shared/lib/utils'
import { useFtpCreateDir } from '../../api'

const { path } = usePathParams()
const { open, close } = useModalRoute('FtpCreateDir')
const { mutate } = useFtpCreateDir(path)

const name = ref('')

function createDir() {
  if (name.value.length)
    mutate(name, { onSuccess: close })
}

onKeyStroke('Enter', createDir, { eventName: 'keydown' })
</script>

<template>
  <FDialog :open @close="close">
    <div class="flex items-center justify-between gap-4">
      <FInput v-model="name" />
      <FButton icon variant="success" @click="createDir">
        <FIcon :icon="Plus" />
      </FButton>
    </div>
  </FDialog>
</template>
