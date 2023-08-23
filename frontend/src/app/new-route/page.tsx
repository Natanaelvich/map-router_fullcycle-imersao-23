'use client'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useMap } from '@/hooks/useMap'
import { useRef } from 'react'

export function NewRoutePage() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const map = useMap(mapContainerRef)

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col w-1/4 py-2 px-6 gap-6">
        <h1 className="text-2xl">Nova rota</h1>
        <form className="flex flex-col gap-4">
          <Input name="source_place" placeholder="origem" />
          <Input name="destination_place" placeholder="destino" />
          <Button type="submit">Pesquisar</Button>
        </form>
      </div>
      <div id="map" className="h-full w-full" ref={mapContainerRef}></div>
    </div>
  )
}

export default NewRoutePage
