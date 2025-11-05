<script setup lang="ts">
import { FtpList, FtpToolbar } from '@/modules/ftp'
</script>

<template>
  <div
    class="
      mx-auto max-w-xl px-4 py-20
      sm:px-0
    "
  >
    <FtpToolbar />
    <FtpList />
  </div>
  <RouterView />
</template>
