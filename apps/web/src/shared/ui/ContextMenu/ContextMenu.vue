<script setup lang="ts">
import {
  ContextMenuContent,
  ContextMenuPortal,
  ContextMenuRoot,
  ContextMenuTrigger,
} from 'reka-ui'
import type { ContextMenuItem, ContextMenuSeparator } from '.'

defineSlots<{
  default: () => Array<typeof ContextMenuItem | typeof ContextMenuSeparator>
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
