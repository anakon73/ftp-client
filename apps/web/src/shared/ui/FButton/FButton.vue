<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import { type AsTag, type ClassValue, cn } from '@/shared/lib/styles'
import { button, type Variant } from '.'

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
  class?: ClassValue
  as?: Component | AsTag
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
