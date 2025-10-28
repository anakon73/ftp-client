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
  return useMutation({
    mutationFn: async (file: File) => {
      const arrayBuffer = await file.arrayBuffer()
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
      return trpc.ftp.upload.mutate({
        path: currentPath.value,
        fileName: file.name,
        base64,
      })
    },
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

export function useFtpDownload(
  currentPath: Ref<string>,
  fileName: Ref<string>,
) {
  return useMutation({
    mutationFn: async () => {
      const base64 = await trpc.ftp.download.query({
        path: `${currentPath.value}/${fileName.value}`,
      })

      const binary = atob(base64)
      const len = binary.length
      const buffer = new Uint8Array(len)
      for (let i = 0; i < len; i++) buffer[i] = binary.charCodeAt(i)
      const blob = new Blob([buffer])

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName.value
      a.click()
      URL.revokeObjectURL(url)
    },
  })
}
