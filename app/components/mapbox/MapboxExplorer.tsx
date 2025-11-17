'use client'

import 'mapbox-gl/dist/mapbox-gl.css'
import { useMapbox } from '@/app/components/mapbox/hooks/useMapbox'
import { useMapLayers } from '@/app/components/mapbox/hooks/useMapLayers'
import { MapInfoBar } from '@/app/components/mapbox/components/mapInfo/MapInfoBar'
import {INITIAL_CENTER} from "@/app/components/mapbox/constants"


export default function MapboxExplorer() {
  const { mapRef, mapContainerRef, center, zoom } = useMapbox({
    initialCenter: INITIAL_CENTER
  })

  useMapLayers({ mapRef })

  return (
    <>
      <MapInfoBar center={center} zoom={zoom} />
      <div ref={mapContainerRef} id='map-container' style={{ minHeight: 'calc(100vh - 260px)' }} />
    </>
  )
}
