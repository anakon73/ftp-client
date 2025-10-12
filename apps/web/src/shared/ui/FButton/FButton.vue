<script setup lang="ts">
import type { Component } from 'vue'
import { type AsTag, type ClassValue, cn } from '@/shared/lib/styles'
import { button, type Variant } from '.'

interface Props {
  class?: ClassValue
  as?: Component | AsTag
  type?: HTMLButtonElement['type']
  variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  type: 'button',
  variant: 'primary',
})
</script>

<template>
  <component :is="as" :class="cn(button({ variant }), props.class ?? '')">
    <slot />
  </component>
</template>
