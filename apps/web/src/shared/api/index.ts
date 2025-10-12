import { type QueryKey, useQueryClient } from '@tanstack/vue-query'

export function useRefreshQuery() {
  const queryClient = useQueryClient()

  function refreshQuery(key: QueryKey, immediate = false) {
    return immediate
      ? queryClient.refetchQueries({ queryKey: key })
      : queryClient.invalidateQueries({ queryKey: key })
  }

  return { refreshQuery }
}
