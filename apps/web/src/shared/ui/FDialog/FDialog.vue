<script setup lang="ts">
import { FDialogOverlay } from '.'

defineProps<{ open: boolean }>()

defineEmits<{ close: [] }>()
</script>

<template>
  <DialogRoot :open @update:open="$emit('close')">
    <DialogPortal>
      <FDialogOverlay @click="$emit('close')" />
      <DialogContent
        class="
          fixed top-1/2 left-1/2 z-50 max-h-[85vh] w-[90vw] max-w-md
          -translate-x-1/2 -translate-y-1/2 rounded-md bg-slate-800 p-6
          text-zinc-200 shadow-xl
          focus:outline-none
        "
      >
        <slot />
        <DialogDescription />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
