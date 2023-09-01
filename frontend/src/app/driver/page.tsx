'use client'

import { Button } from '@/components/Button'
import { RouteSelect } from '@/components/RouteSelect'
import { useMap } from '@/hooks/useMap'
import { Route } from '@/utils/model'
import { socket } from '@/utils/socket-io'
import { useEffect, useRef } from 'react'

export function DriverPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const map = useMap(mapContainerRef)

  useEffect(() => {
    socket.connect()
    return () => {
      socket.disconnect()
    }
  }, [])

  async function startRoute() {
    const routeId = (document.getElementById('route') as HTMLSelectElement)
      .value
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_API_URL}/routes/${routeId}`,
    )
    const route: Route = await response.json()
    map?.removeAllRoutes()
    await map?.addRouteWithIcons({
      routeId,
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

    const { steps } = route.directions.routes[0].legs[0]

    for (const step of steps) {
      await sleep(2000)
      map?.moveCar(routeId, step.start_location)
      socket.emit('new-points', {
        route_id: routeId,
        lat: step.start_location.lat,
        lng: step.start_location.lng,
      })

      await sleep(2000)
      map?.moveCar(routeId, step.end_location)
      socket.emit('new-points', {
        route_id: routeId,
        lat: step.end_location.lat,
        lng: step.end_location.lng,
      })
    }
  }

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col w-80 py-2 px-6 gap-6 bg-gray-800 text-white">
        <h1 className="text-2xl">Navegação</h1>
        <RouteSelect id="route" />
        <Button onClick={startRoute}>Iniciar a viagem</Button>
      </div>
      <div id="map" ref={mapContainerRef} className="h-full w-full"></div>
    </div>
  )
}

export default DriverPage

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
