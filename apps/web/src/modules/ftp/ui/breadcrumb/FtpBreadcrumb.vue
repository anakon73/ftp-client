<script setup lang="ts">
import { cn } from '@/shared/lib/styles'

const props = defineProps<{ path: string }>()

const emits = defineEmits<{ changePath: [path: string] }>()

const { path } = toRefs(props)

const parts = computed(() => {
  return path.value.split('/').filter(Boolean)
})

function getPathUpTo(index: number) {
  const joined = parts.value.slice(0, index + 1).join('/')
  return `/${joined}`
}

function handleChangePath(index: number) {
  if (index < parts.value.length - 1)
    emits('changePath', getPathUpTo(index))
}
</script>

<template>
  <div class="font-semibold text-zinc-200">
    <template v-for="(part, index) in parts" :key="index">
      <button
        :class="cn(
          `cursor-pointer text-zinc-200`,
          index < parts.length - 1 && `
            text-zinc-200/70 transition
            hover:text-zinc-200/100
          `,
        )"
        @click="handleChangePath(index)"
      >
        {{ part }}
      </button>
      <span class="cursor-default px-2 text-zinc-200/70">/</span>
    </template>
  </div>
</template>
