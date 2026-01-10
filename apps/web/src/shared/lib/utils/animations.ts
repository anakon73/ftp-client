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
