<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { cn } from '@/shared/lib/styles'

const props = defineProps<{ path: string }>()

const emits = defineEmits<{ changePath: [path: string] }>()

const { path } = toRefs(props)

const parts = computed(() => {
  return ['Root', ...path.value.split('/').filter(Boolean)]
})

function getPathUpTo(index: number) {
  const joined = parts.value.slice(1, index + 1).join('/')
  return `/${joined}`
}

function handleChangePath(index: number) {
  if (index === 0) {
    emits('changePath', '/')
    return
  }
  if (index < parts.value.length - 1)
    emits('changePath', getPathUpTo(index))
}
</script>

<template>
  <div
    v-if="parts.length > 1"
    class="flex items-center gap-2 font-semibold text-zinc-200"
  >
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
      <FIcon
        v-if="index !== parts.length - 1"
        :icon="ChevronRight"
        class="mt-1 cursor-default text-zinc-200/70"
      />
    </template>
  </div>
</template>
