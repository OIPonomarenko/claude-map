'use client';

import {useCallback, useEffect, useRef, useState} from "react"
import mapboxgl, {LngLat} from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css';
import {INITIAL_CENTER, INITIAL_ZOOM} from "@/app/components/mapbox/constants"


export default function MapboxExplorer() {
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [center, setCenter] = useState<LngLat>(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)

  const updatePosition = useCallback(() => {
    const mapCenter = mapRef.current?.getCenter()
    const mapZoom = mapRef.current?.getZoom()
    if (mapCenter) setCenter(mapCenter)
    if (mapZoom !== undefined) setZoom(mapZoom)
  }, [])


  useEffect(() => {
    const mapToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if(!mapContainerRef.current || !mapToken) return

    mapboxgl.accessToken = mapToken
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom
    });

    mapRef.current.on('moveend', updatePosition)

    return () => {
      mapRef.current?.off('moveend', updatePosition)
      mapRef.current?.remove()
    }
  }, [])

  return (
    <>
      <div className="sidebar max-w-[78vw] absolute top-8 left-6 sm:left-8 z-10 px-3 py-1.5 bg-offset text-white rounded">
        Longitude: {center.lng.toFixed(4)} | Latitude: {center.lat.toFixed(4)}  | Zoom: {zoom.toFixed(2)}
      </div>
      <div ref={mapContainerRef} id='map-container' style={{minHeight: 'calc(100vh - 260px)'}} />
    </>

  );
}
