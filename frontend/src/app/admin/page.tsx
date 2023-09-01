'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useMap } from '@/hooks/useMap'
import { socket } from '@/utils/socket-io'
import { Route } from '@/utils/model'

export default function AdminPage() {
  const containerMapRef = useRef<HTMLDivElement>(null)
  const map = useMap(containerMapRef)

  useEffect(() => {
    socket.connect()

    socket.on(
      'admin-new-points',
      async (data: { route_id: string; lat: number; lng: number }) => {
        if (!map?.hasRoute(data.route_id)) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_NEXT_API_URL}/routes/${data.route_id}`,
          )
          const route: Route = await response.json()
          map?.removeRoute(data.route_id)
          await map?.addRouteWithIcons({
            routeId: data.route_id,
            startMarkerOptions: {
              position: route.directions.routes[0].legs[0].start_location,
            },
            endMarkerOptions: {
              position: route.directions.routes[0].legs[0].end_location,
            },
            carMarkerOptions: {
              position: route.directions.routes[0].legs[0].start_location,
            },
          })
        }
        map?.moveCar(data.route_id, {
          lat: data.lat,
          lng: data.lng,
        })
      },
    )

    return () => {
      socket.disconnect()
    }
  }, [map])

  return (
    <div className="flex flex-row h-full">
      <div id="map" ref={containerMapRef} className="h-full w-full" />
    </div>
  )
}
