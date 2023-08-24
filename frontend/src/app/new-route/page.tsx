/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useMap } from '@/hooks/useMap'
import {
  DirectionsResponseData,
  FindPlaceFromTextResponseData,
} from '@googlemaps/google-maps-services-js'
import { FormEvent, useRef, useState } from 'react'

export function NewRoutePage() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const map = useMap(mapContainerRef)

  const [directionsData, setDirectionsData] = useState<
    DirectionsResponseData & { request: any }
  >()
  const [open, setOpen] = useState(false)

  async function searchPlaces(event: FormEvent) {
    event.preventDefault()

    try {
      const source = (event.target as any).source.value
      const destination = (event.target as any).destination.value

      const [sourceResponse, destinationResponse] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_NEXT_API_URL}/places?text=${source}`),
        fetch(
          `${process.env.NEXT_PUBLIC_NEXT_API_URL}/places?text=${destination}`,
        ),
      ])

      const [sourcePlace, destinationPlace]: FindPlaceFromTextResponseData[] =
        await Promise.all([sourceResponse.json(), destinationResponse.json()])

      if (sourcePlace.status !== 'OK') {
        console.error(sourcePlace)
        alert('Não foi possível encontrar a origem')
        return
      }

      if (destinationPlace.status !== 'OK') {
        console.error(destinationPlace)
        alert('Não foi possível encontrar o destino')
        return
      }

      const placeSourceId = sourcePlace.candidates[0].place_id
      const placeDestinationId = destinationPlace.candidates[0].place_id

      const directionsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_NEXT_API_URL}/directions?originId=${placeSourceId}&destinationId=${placeDestinationId}`,
      )
      const directionsData: DirectionsResponseData & { request: any } =
        await directionsResponse.json()
      setDirectionsData(directionsData)
      map?.removeAllRoutes()
      await map?.addRouteWithIcons({
        routeId: '1',
        startMarkerOptions: {
          position: directionsData.routes[0].legs[0].start_location,
        },
        endMarkerOptions: {
          position: directionsData.routes[0].legs[0].end_location,
        },
        carMarkerOptions: {
          position: directionsData.routes[0].legs[0].start_location,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  async function createRoute() {
    const startAddress = directionsData!.routes[0].legs[0].start_address
    const endAddress = directionsData!.routes[0].legs[0].end_address
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_API_URL}/routes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${startAddress} - ${endAddress}`,
          source_id: directionsData!.request.origin.place_id,
          destination_id: directionsData!.request.destination.place_id,
        }),
      },
    )
    const route = await response.json()
    setOpen(true)
  }

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col w-1/4 py-2 px-6 gap-6 bg-gray-800 text-white">
        <h1 className="text-2xl">Nova rota</h1>
        <form className="flex flex-col gap-4" onSubmit={searchPlaces}>
          <Input name="source" placeholder="Origem" />
          <Input name="destination" placeholder="Destino" />
          <Button type="submit">Pesquisar</Button>
        </form>

        {directionsData && (
          <div className="flex flex-col gap-4">
            <ul className="flex flex-col gap-4">
              <li className="flex flex-col gap-1">
                <h6 className="text-xl font-semibold text-yellow-500">
                  Origem
                </h6>
                <span className="text-sm text-gray-400">
                  {directionsData?.routes[0]!.legs[0]!.start_address}
                </span>
              </li>
              <li>
                <h6 className="text-xl font-semibold text-yellow-500">
                  Destino
                </h6>
                <span className="text-sm text-gray-400">
                  {directionsData?.routes[0]!.legs[0]!.end_address}
                </span>
              </li>
              <li>
                <h6 className="text-xl font-semibold text-yellow-500">
                  Distância
                </h6>
                <span className="text-sm text-gray-400">
                  {directionsData?.routes[0]!.legs[0]!.distance.text}
                </span>
              </li>
              <li>
                <h6 className="text-xl font-semibold text-yellow-500">
                  Duração
                </h6>
                <span className="text-sm text-gray-400">
                  {directionsData?.routes[0]!.legs[0]!.duration.text}
                </span>
              </li>
            </ul>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="button" onClick={createRoute}>
                Adicionar rota
              </Button>
            </div>
          </div>
        )}
      </div>
      <div id="map" className="h-full w-full" ref={mapContainerRef}></div>
    </div>
  )
}

export default NewRoutePage
