<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { Upload } from 'lucide-vue-next'

import { FDialog } from '@/shared/ui/FDialog'
import { FButton } from '@/shared/ui/FButton'

import { useFtpUpload } from '../../'

const props = defineProps<{ path: string }>()

const { path } = toRefs(props)

const { mutate } = useFtpUpload(path)

const open = ref(false)

async function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]

  if (!file)
    return

  mutate(file, { onSuccess: () => open.value = false })
}
</script>

<template>
  <FButton icon variant="secondary" @click="open = true">
    <Upload :size="16" />
  </FButton>

  <FDialog :open @close="open = false">
    <div class="col-span-full">
      <div
        class="
          mt-2 flex justify-center rounded-lg border border-dashed
          border-white/25 px-6 py-10
        "
      >
        <div class="text-center">
          <Upload class="mx-auto size-12 text-gray-600" aria-hidden="true" />
          <div class="mt-4 flex text-sm/6 text-gray-400">
            <label
              for="file-upload"
              class="
                relative cursor-pointer rounded-md bg-transparent font-semibold
                text-indigo-400
                hover:text-indigo-300
              "
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                class="sr-only"
                @change="onFileChange"
              >
            </label>
          </div>
          <p class="text-xs/5 text-gray-400">
            Size up to 100MB
          </p>
        </div>
      </div>
    </div>
  </FDialog>
</template>
