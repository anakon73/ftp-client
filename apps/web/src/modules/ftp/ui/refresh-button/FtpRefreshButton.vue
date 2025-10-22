<script setup lang="ts">
import { toRefs } from 'vue'
import { RefreshCw } from 'lucide-vue-next'

import { useRefreshQuery } from '@/shared/api'
import { FButton } from '@/shared/ui/FButton'

import { ftpKeys } from '../../'

const props = defineProps<{ path: string }>()

const { path } = toRefs(props)

const { refreshQuery } = useRefreshQuery()

function handleClick() {
  refreshQuery(ftpKeys.all(path), true)
}
</script>

<template>
  <FButton icon variant="secondary" @click="handleClick">
    <RefreshCw :size="16" />
  </FButton>
</template>
