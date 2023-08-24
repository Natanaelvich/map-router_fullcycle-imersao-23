import { InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={twMerge(
        'flex w-full items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm outline-none',
        'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-400',
        'bg-zinc-100 text-gray-900',
        'placeholder-gray-500',
        props.className,
      )}
    />
  )
}
