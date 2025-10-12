<script setup lang="ts">
import { FButton } from '@/shared/ui/FButton'
import { FDialog, FDialogTitle } from '@/shared/ui/FDialog'

defineProps<{ open: boolean }>()

defineEmits<{ close: [], delete: [] }>()
</script>

<template>
  <FDialog :open="open" @close="$emit('close')">
    <FDialogTitle class="mb-5">
      Are you sure?
    </FDialogTitle>
    <div class="flex justify-end gap-2">
      <FButton variant="destructive" @click="$emit('close')">
        No
      </FButton>
      <FButton variant="success" @click="$emit('delete')">
        Yes
      </FButton>
    </div>
  </FDialog>
</template>
