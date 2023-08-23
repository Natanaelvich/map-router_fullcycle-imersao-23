import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export type InputProps = HTMLAttributes<HTMLInputElement>

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={twMerge(
        'flex w-full items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm outline-none',
        'focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100',
        props.className,
      )}
    />
  )
}
