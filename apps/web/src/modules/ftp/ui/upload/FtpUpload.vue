<script setup lang="ts">
import { Upload } from 'lucide-vue-next'
import { useFtpUpload } from '../../api'

const props = defineProps<{ path: string, open: boolean }>()

const emits = defineEmits<{ close: [] }>()

const { mutate } = useFtpUpload(props.path)

const file = ref<File | null>(null)

function setFile(e: Event) {
  return file.value = (e.target as HTMLInputElement).files?.[0] ?? null
}

function submit() {
  file.value && mutate(file.value, { onSuccess: () => emits('close') })
}
</script>

<template>
  <FDialog :open @close="emits('close')">
    <div class="col-span-full">
      <div
        class="
          flex flex-col items-center justify-center rounded-lg border
          border-dashed border-white/25 px-6 py-10
        "
      >
        <FIcon
          :icon="Upload"
          :size="20"
          class="mx-auto size-12 text-gray-600"
          aria-hidden="true"
        />
        <label
          for="file-upload"
          class="
            cursor-pointer font-semibold text-indigo-400 transition
            hover:text-indigo-300
          "
        >
          <span>Upload a file</span>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            class="sr-only"
            @change="setFile"
          >
        </label>
        <p class="text-xs/5 text-gray-400">
          Size up to 100MB
        </p>
        <div
          v-if="file"
          class="mt-2 flex flex-col items-center gap-2 text-center"
        >
          <p class="text-sm">
            {{ file.name }}
          </p>
          <div class="flex gap-2">
            <FButton variant="primary" @click="submit">
              Apply
            </FButton>
            <FButton variant="destructive" @click="emits('close')">
              Cancel
            </FButton>
          </div>
        </div>
      </div>
    </div>
  </FDialog>
</template>
