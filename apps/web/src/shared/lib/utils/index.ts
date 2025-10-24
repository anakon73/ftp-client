import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useDots(interval = 300) {
  const dots = ref('')
  let timer: ReturnType<typeof setInterval> | null = null

  onMounted(() => {
    timer = setInterval(() => {
      dots.value = dots.value.length >= 3 ? '' : `${dots.value}.`
    }, interval)
  })

  onUnmounted(() => {
    if (timer)
      clearInterval(timer)
  })

  return { dots }
}

export function useDotsWithText(text: string, interval = 300) {
  const { dots } = useDots(interval)

  return { dots: computed(() => `${text}${dots.value}`) }
}

export function usePathParams() {
  const router = useRouter()
  const route = useRoute()

  const path = computed<string>({
    get: () => String(route.query.path || '/'),
    set: (newPath: string) => {
      router.push({
        query: {
          ...route.query,
          path: newPath === '/' ? undefined : newPath,
        },
      })
    },
  })

  function handleChangePath(newPath: string) {
    path.value = path.value.endsWith('/')
      ? path.value + newPath
      : `${path.value}/${newPath}`
  }

  function goBack() {
    if (path.value === '/' || !path.value)
      return

    const segments = path.value.split('/').filter(Boolean)
    segments.pop()
    path.value = `/${segments.join('/')}`
  }

  function setFullPath(newPath: string) {
    router.push({
      query: {
        ...route.query,
        path: newPath === '/' ? undefined : newPath,
      },
    })
  }

  return { path, handleChangePath, goBack, setFullPath }
}
