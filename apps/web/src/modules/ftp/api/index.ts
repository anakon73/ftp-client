import axios from 'axios'
import type { Ref } from 'vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { FileEntry } from 'packages/trpc'

import { trpc } from '@/shared/lib/trpc'
import { useRefreshQuery } from '@/shared/api'

const keys = {
  all: (path: Ref<string>) => (['ftp', path]),
} as const

export { keys as ftpKeys }

export function useFtpList(path: Ref<string>) {
  return useQuery({
    queryKey: keys.all(path),
    queryFn: async () => await trpc.ftp.list.query({ path: path.value }),
  })
}

export function useFtpDelete(currentPath: Ref<string>) {
  const { refreshQuery } = useRefreshQuery()

  return useMutation({
    mutationFn: async (item: FileEntry) =>
      await trpc.ftp.delete.mutate(
        { path: `${currentPath.value}/${item.name}`, type: item.type },
      ),
    onSuccess: () => refreshQuery(keys.all(currentPath), true),
  })
}

export function useFtpUpload(currentPath: Ref<string>) {
  const { refreshQuery } = useRefreshQuery()

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('currentPath', currentPath.value)

      await axios.post('http://localhost:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    },
    onSuccess: () => refreshQuery(keys.all(currentPath), true),
  })
}

export function useFtpCreateDir(currentPath: Ref<string>) {
  const { refreshQuery } = useRefreshQuery()

  return useMutation({
    mutationFn: async (name: string) =>
      await trpc.ftp.createDirectory.mutate({ path: currentPath.value, name }),
    onSuccess: () => refreshQuery(keys.all(currentPath), true),
  })
}

export function useFtpRename(currentPath: Ref<string>) {
  const { refreshQuery } = useRefreshQuery()

  return useMutation({
    mutationFn: async (
      { newName, oldName }: { oldName: string, newName: string },
    ) =>
      await trpc.ftp.rename.mutate({
        oldPath: `${currentPath.value}/${oldName}`,
        newPath: `${currentPath.value}/${newName}`,
      }),
    onSuccess: () => refreshQuery(keys.all(currentPath), true),
  })
}
