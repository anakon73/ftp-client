import { onMounted, onUnmounted, ref } from 'vue'

export function useDotdotdot(interval = 300) {
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

  return dots
}

export function useDotdotdotWithText(text: string, interval = 300) {
  const dots = ref('')

  let timer: ReturnType<typeof setInterval> | null = null

  onMounted(() => {
    timer = setInterval(() => {
      dots.value = text + (dots.value.length >= 3 ? '' : `${dots.value}.`)
    }, interval)
  })

  onUnmounted(() => {
    if (timer)
      clearInterval(timer)
  })

  return dots
}
