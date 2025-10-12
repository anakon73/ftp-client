import { cva } from 'class-variance-authority'
import type { ArrayToUnion, ClassRecord } from '@/shared/lib/styles'

export const variant = ['primary', 'success', 'destructive'] as const

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
      } satisfies ClassRecord<Variant>,
    },
  },
)

export { default as FButton } from './FButton.vue'
