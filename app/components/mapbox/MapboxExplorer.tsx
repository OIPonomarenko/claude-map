'use client';

import {useCallback, useEffect, useRef, useState} from "react"
import mapboxgl, {LngLat} from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'
import {INITIAL_CENTER, INITIAL_ZOOM} from "@/app/components/mapbox/constants"
import customMarkerPng from "@/app/assets/marker.png"
import cafeData from "@/app/assets/cafes.json"
import {GeoJSON} from "geojson"


export default function MapboxExplorer() {
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [center, setCenter] = useState<LngLat>(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)
  const [isGettingLocation, setIsGettingLocation] = useState(true)
  const [layerState, setLayerState] = useState([
    {
      name: 'expensive',
      color: '#33a02c',
      isChecked: false
    },
    {
      name: 'good',
      color: '#ffff99',
      isChecked: true
    },
    {
      name: 'cheap',
      color: '#6a3d9a',
      isChecked: true
    },
    {
      name: 'american',
      color: '#a6cee3',
      isChecked: true
    }])

  const updatePosition = useCallback(() => {
    const mapCenter = mapRef.current?.getCenter()
    const mapZoom = mapRef.current?.getZoom()
    if (mapCenter) setCenter(mapCenter)
    if (mapZoom !== undefined) setZoom(mapZoom)
  }, [])

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = new LngLat(
            position.coords.longitude,
            position.coords.latitude
          )
          setCenter(userLocation)
          setIsGettingLocation(false)
        },
        (error) => {
          console.warn('Geolocation error:', error.message)
          // Fallback to default location
          setIsGettingLocation(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      )
    } else {
      setIsGettingLocation(false)
    }
  }, [])

  useEffect(() => {
    const mapToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if(!mapContainerRef.current || !mapToken || !mapRef.current) return

    mapboxgl.accessToken = mapToken
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom
    });

    mapRef.current.on('load', () => {

      mapRef.current?.loadImage(
        customMarkerPng.src,
        (error, image) => {
          if (error) throw error;
          if (image) {
            mapRef.current?.addImage("custom-marker", image, {sdf: true});
          }
        }
      );

      mapRef.current?.addSource('cafes', {
        type: 'geojson',
        data: cafeData as GeoJSON
      })

      // add a symbol layer for each cuisine type, filtering to only show features with that cuisine type.
      for (const layer of layerState) {
        const { name, color } = layer

        const layerId = `cafes-${name}-symbol`

        if (!mapRef.current?.getLayer(layerId)) {
          mapRef.current?.addLayer({
            id: layerId,
            type: 'symbol',
            source: 'cafes',

            // Grabs local image for custom marker, allows markers to over lap and colors each marker based on the related cuisine color.
            layout: {
              'icon-image': 'custom-marker',
              'icon-size': 1,
              'icon-allow-overlap': true
            },
            'paint': {
              'icon-color': color,
              'icon-opacity': 0.8,
              'icon-halo-color': '#ffffff',
              'icon-halo-width': 2.5,
              'icon-halo-blur': 1
            },
            filter: ['in', ['get', 'type'], ['literal', [name]]]
          })
        }
      }

    })

    mapRef.current.on('moveend', updatePosition)

    return () => {
      mapRef.current?.remove()
    }
  }, [updatePosition, isGettingLocation, layerState])

  return (
    <>
      <div className="sidebar max-w-[78vw] absolute top-8 left-6 sm:left-8 z-10 px-3 py-1.5 bg-offset text-white rounded">
        {isGettingLocation ? (
          'Getting your location...'
        ) : (
          <>Longitude: {center.lng.toFixed(4)} | Latitude: {center.lat.toFixed(4)}  | Zoom: {zoom.toFixed(2)}</>
        )}
      </div>
      <div ref={mapContainerRef} id='map-container' style={{minHeight: 'calc(100vh - 260px)'}} />
    </>

  );
}
