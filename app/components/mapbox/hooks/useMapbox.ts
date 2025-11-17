import { useCallback, useEffect, useRef, useState } from 'react'
import mapboxgl, { LngLat } from 'mapbox-gl'
import { INITIAL_ZOOM } from '@/app/components/mapbox/constants'

interface UseMapboxProps {
  initialCenter: LngLat
}

export function useMapbox({ initialCenter }: UseMapboxProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [center, setCenter] = useState<LngLat>(initialCenter)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)

  const updatePosition = useCallback(() => {
    const mapCenter = mapRef.current?.getCenter()
    const mapZoom = mapRef.current?.getZoom()
    if (mapCenter) setCenter(mapCenter)
    if (mapZoom) setZoom(mapZoom)
  }, [])

  useEffect(() => {
    const mapToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!mapContainerRef.current || !mapToken || mapRef.current) return

    mapboxgl.accessToken = mapToken
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: initialCenter,
      zoom: zoom
    })

    mapRef.current.on('moveend', updatePosition)

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [initialCenter, updatePosition])

  return {
    mapRef,
    mapContainerRef,
    center,
    zoom
  }
}
