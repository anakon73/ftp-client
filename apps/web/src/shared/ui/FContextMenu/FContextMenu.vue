<script setup lang="ts">
import type { FContextMenuItem, FContextMenuSeparator } from '.'

defineSlots<{
  default: () => Array<typeof FContextMenuItem | typeof FContextMenuSeparator>
  trigger: () => VNode
}>()
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
        <slot name="default" />
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>
