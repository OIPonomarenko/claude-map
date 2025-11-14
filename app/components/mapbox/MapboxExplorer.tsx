'use client';

import { useEffect, useRef } from 'react';
import mapboxgl, {LngLatLike} from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

const defaultCoords: LngLatLike = [48.46, 35.031]


interface MapboxExplorerProps {
  initialCenter?: LngLatLike,
  initialZoom?: number
}

export default function MapboxExplorer({
                                         initialCenter = defaultCoords,
                                         initialZoom = 8
}: MapboxExplorerProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mapToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if(!mapContainerRef.current || !mapToken) return

    mapboxgl.accessToken = mapToken
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: initialCenter,
      zoom: initialZoom
    });

    return () => {
      mapRef.current?.remove()
    }
  }, [initialCenter, initialZoom])

  return (
    <div ref={mapContainerRef} id='map-container' style={{minHeight: 'calc(100vh - 260px)'}} />
  );
}
