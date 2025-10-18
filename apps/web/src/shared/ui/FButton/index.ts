import { cva } from 'class-variance-authority'
import type { ArrayToUnion, ClassRecord } from '@/shared/lib/styles'

export const variant = [
  'primary',
  'secondary',
  'success',
  'destructive',
] as const

export type Variant = ArrayToUnion<typeof variant>

export const button = cva(
  `
    cursor-pointer rounded px-6 py-2 text-sm leading-3.5 font-semibold shadow-sm
    focus:outline-none
  `,
  {
    variants: {
      variant: {
        primary: 'text-white bg-indigo-600',
        success: 'text-white bg-emerald-600',
        destructive: 'text-white bg-rose-600',
        secondary: 'text-zinc-200 bg-slate-800',
      } satisfies ClassRecord<Variant>,
      icon: {
        false: '',
        true: 'p-2',
      },
    },
  },
)

export { default as FButton } from './FButton.vue'
