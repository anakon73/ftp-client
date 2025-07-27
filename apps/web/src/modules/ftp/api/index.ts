import { trpc } from '@/shared/lib/trpc'
import { useQuery } from '@tanstack/vue-query'
import type { Ref } from 'vue'

export function useFtpList(path: Ref<string>) {
  return useQuery({
    queryKey: ['ftp', path],
    queryFn: async () => await trpc.ftp.list.query({ path: path.value }),
  })
}
