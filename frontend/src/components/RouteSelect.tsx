'use client'
import useSWR from 'swr'
import { fetcher } from '../utils/http'
import { Route } from '../utils/model'
import { SelectHTMLAttributes } from 'react'

export type RouteSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  onChange?: (place_id: string) => void
}

export function RouteSelect(props: RouteSelectProps) {
  const {
    data: routes,
    error,
    isLoading,
  } = useSWR<Route[]>(
    `${process.env.NEXT_PUBLIC_NEXT_API_URL}/routes`,
    fetcher,
    {
      fallbackData: [],
    },
  )

  return (
    <select
      {...props}
      onChange={(event) => props.onChange && props.onChange(event.target.value)}
      className="rounded-lg px-4 py-2 text-sm font-semibold outline-none shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500 active:opacity-80 bg-white text-gray-900"
    >
      {isLoading && <option value="">Loading...</option>}
      {routes && (
        <>
          <option value="">Select a route</option>
          {routes!.map((route) => (
            <option key={route.id} value={route.id}>
              {route.name}
            </option>
          ))}
        </>
      )}
    </select>
  )
}
