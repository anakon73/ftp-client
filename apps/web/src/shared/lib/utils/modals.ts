export const FTP_MODALS = [
  'rename',
  'delete',
  'create-dir',
  'upload',
] as const

export type FtpModal = typeof FTP_MODALS[number]

export const useModal = defineStore('modal', () => {
  const modal = ref<FtpModal | null>(null)

  const open = (name: FtpModal) => modal.value = name

  const close = () => modal.value = null

  return {
    modal,
    open,
    close,
  }
})
