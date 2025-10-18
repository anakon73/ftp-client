<script setup lang="ts">
import type { Component } from 'vue'
import { type AsTag, type ClassValue, cn } from '@/shared/lib/styles'
import { button, type Variant } from '.'

interface Props {
  class?: ClassValue
  as?: Component | AsTag
  type?: HTMLButtonElement['type']
  variant?: Variant
  icon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  type: 'button',
  variant: 'primary',
  icon: false,
})
</script>

<template>
  <component :is="as" :class="cn(button({ variant, icon }), props.class ?? '')">
    <slot />
  </component>
</template>
