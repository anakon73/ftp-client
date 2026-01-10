export function usePathParams() {
  const router = useRouter()
  const route = useRoute()

  const path = ref(normalizePathMatch(route.params.pathMatch))

  function normalizePathMatch(param: string | string[] | undefined): string {
    const joined = Array.isArray(param) ? param.join('/') : param || ''
    return `/${joined}`
  }

  watch(
    () => route.params.pathMatch,
    (newVal) => {
      path.value = normalizePathMatch(newVal)
    },
    { immediate: true },
  )

  function handleChangePath(newDir: MaybeRefOrGetter<string>) {
    const newPath = path.value.endsWith('/')
      ? path.value + toValue(newDir)
      : `${path.value}/${toValue(newDir)}`
    setFullPath(newPath)
  }

  function goBack() {
    if (path.value === '/' || !path.value)
      return

    const segments = path.value.split('/').filter(Boolean)
    segments.pop()
    setFullPath(`/${segments.join('/')}`)
  }

  function setFullPath(newPath: MaybeRefOrGetter<string>) {
    const segments = toValue(newPath).split('/').filter(Boolean)
    router.push({
      name: 'Ftp',
      params: {
        pathMatch: segments.length ? segments : undefined,
      },
    })
  }

  return { path, handleChangePath, goBack, setFullPath }
}
