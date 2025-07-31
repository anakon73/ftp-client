<script setup lang="ts">
import {
  ContextMenuContent,
  ContextMenuPortal,
  ContextMenuRoot,
  ContextMenuTrigger,
} from 'reka-ui'

interface Slots {
  default: () => any
  trigger: () => any
}

defineSlots<Slots>()
</script>

<template>
  <ContextMenuRoot>
    <ContextMenuTrigger>
      <slot name="trigger" />
    </ContextMenuTrigger>

    <ContextMenuPortal>
      <ContextMenuContent
        class="
          min-w-72 rounded-md border border-slate-200 bg-white p-2 shadow-md
        "
      >
        <slot />
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>
