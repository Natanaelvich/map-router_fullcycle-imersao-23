'use client'

export function NewRoutePage() {
  return (
    <div className="flex flex-row h-full">
      <div>
        <h1>Nova rota</h1>
        <form className="flex flex-col">
          <input name="source_place" placeholder="origem" />
          <input name="destination_place" placeholder="destino" />
          <button type="submit">Pesquisar</button>
        </form>
      </div>
      <div id="map" className="h-full w-full">
        <h1>Map</h1>
      </div>
    </div>
  )
}

export default NewRoutePage
