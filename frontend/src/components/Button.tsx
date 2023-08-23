import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export type ButtonProps = HTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        'rounded-lg px-4 py-2 text-sm font-semibold outline-none shadow-sm',
        'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500',
        'active:opacity-80',
        'bg-yellow-500 text-gray-900',
        props.className,
      )}
    />
  )
}
