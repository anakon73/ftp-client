<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { trpc } from '@/shared/lib/trpc'
import { watch } from 'vue'

const { data, isLoading } = useQuery({
  queryKey: ['userList'],
  queryFn: () => trpc.user.userList.query(), // ✅ працює через tRPC клієнт
})

watch(data, () => console.log(data.value[0]))
</script>

<template>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</template>
