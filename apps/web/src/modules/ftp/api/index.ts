import { useMutation, useQuery } from '@tanstack/vue-query'
import type { FileEntry } from 'server/types'

import { trpc } from '@/shared/lib/trpc'
import { useRefreshQuery } from '@/shared/api'

const keys = {
  all: (path: MaybeRefOrGetter<string>) => (['ftp', 'all', path]),
  entryType: (path: MaybeRefOrGetter<string>) => (['ftp', 'entry-type', path]),
  file: (path: MaybeRefOrGetter<string>) => (['ftp', 'file', path]),
} as const

export { keys as ftpKeys }

export function useFtpList(path: MaybeRefOrGetter<string>) {
  return useQuery({
    queryKey: keys.all(path),
    queryFn: async () => await trpc.ftp.list.query({ path: toValue(path) }),
  })
}

export async function useGetEntryTypeRaw(path: MaybeRefOrGetter<string>) {
  return await trpc.ftp.getEntryType.query({ path: toValue(path) })
}

export function useGetEntryType(path: MaybeRefOrGetter<string>) {
  return useQuery({
    queryKey: keys.entryType(path),
    queryFn: async () => await useGetEntryTypeRaw(path),
  })
}

export function useGetFile(
  path: MaybeRefOrGetter<string>,
) {
  return useQuery({
    queryKey: keys.file(path),
    queryFn: async () => await trpc.ftp.getFile.query({ path: toValue(path) }),
  })
}

export function useFtpDelete(path: MaybeRefOrGetter<string>) {
  const { refreshQuery } = useRefreshQuery()

  return useMutation({
    mutationFn: async (item: FileEntry) => {
      return await trpc.ftp.delete.mutate(
        { path: `${toValue(path)}/${item.name}`, type: item.type },
      )
    },
    onSuccess: () => refreshQuery(keys.all(path)),
  })
}

export function useFtpUpload(path: MaybeRefOrGetter<string>) {
  const { refreshQuery } = useRefreshQuery()

  return useMutation({
    mutationFn: async (file: MaybeRefOrGetter<File>) => {
      const fileValue = toValue(file)
      const arrayBuffer = await fileValue.arrayBuffer()
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
      return trpc.ftp.upload.mutate({
        path: toValue(path),
        fileName: fileValue.name,
        base64,
      })
    },
    onSuccess: () => refreshQuery(keys.all(path)),
  })
}

export function useFtpCreateDir(path: MaybeRefOrGetter<string>) {
  const { refreshQuery } = useRefreshQuery()

  return useMutation({
    mutationFn: async (name: MaybeRefOrGetter<string>) =>
      await trpc
        .ftp
        .createDirectory
        .mutate({ path: toValue(path), name: toValue(name) }),
    onSuccess: () => refreshQuery(keys.all(path)),
  })
}

export function useFtpRename(path: MaybeRefOrGetter<string>) {
  const { refreshQuery } = useRefreshQuery()

  return useMutation({
    mutationFn: async (
      { name, oldName }:
      { oldName: MaybeRefOrGetter<string>, name: MaybeRefOrGetter<string> },
    ) => {
      return await trpc.ftp.rename.mutate({
        oldPath: `${toValue(path)}/${toValue(oldName)}`,
        newPath: `${toValue(path)}/${toValue(name)}`,
      })
    },
    onSuccess: () => refreshQuery(keys.all(path)),
  })
}

export function useFtpDownload(path: MaybeRefOrGetter<string>) {
  return useMutation({
    mutationFn: async (fileName: MaybeRefOrGetter<string>) => {
      const base64 = await trpc
        .ftp
        .download
        .query({ path: `${toValue(path)}/${toValue(fileName)}` })

      const binary = atob(base64)
      const len = binary.length
      const buffer = new Uint8Array(len)
      for (let i = 0; i < len; i++) buffer[i] = binary.charCodeAt(i)
      const blob = new Blob([buffer])

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = toValue(fileName)
      a.click()
      URL.revokeObjectURL(url)
    },
  })
}
