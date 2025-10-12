import type { Ref } from 'vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { FileEntry } from 'packages/trpc'

import { trpc } from '@/shared/lib/trpc'
import { useRefreshQuery } from '@/shared/api'

const keys = {
  all: (path: Ref<string>) => (['ftp', path]),
} as const

export function useFtpList(path: Ref<string>) {
  return useQuery({
    queryKey: keys.all(path),
    queryFn: async () => await trpc.ftp.list.query({ path: path.value }),
  })
}

export function useFtpDelete(currentPath: Ref<string>) {
  const { refreshQuery } = useRefreshQuery()

  return useMutation({
    mutationFn: async (
      { path, name, type,
      }: { path: string, name: string, type: FileEntry['type'] }) =>
      await trpc.ftp.delete.mutate({ path: `${path}/${name}`, type }),
    onSuccess: () => {
      refreshQuery(keys.all(currentPath), true)
    },
  })
}
