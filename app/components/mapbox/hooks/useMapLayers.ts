import { useEffect, useState, MutableRefObject } from 'react'
import { GeoJSON } from 'geojson'
import customMarkerPng from '@/app/assets/marker.png'
import cafeData from '@/app/assets/cafes.json'

export interface LayerConfig {
  name: string
  color: string
  isChecked: boolean
}

const DEFAULT_LAYERS: LayerConfig[] = [
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
  }
]

interface UseMapLayersProps {
  mapRef: MutableRefObject<mapboxgl.Map | null>
}

export function useMapLayers({ mapRef }: UseMapLayersProps) {
  const [layerState, setLayerState] = useState<LayerConfig[]>(DEFAULT_LAYERS)

  useEffect(() => {
    if (!mapRef.current) return

    const map = mapRef.current

    const onLoad = () => {
      // Load custom marker image
      map.loadImage(customMarkerPng.src, (error, image) => {
        if (error) throw error
        if (image) {
          map.addImage('custom-marker', image, { sdf: true })
        }
      })

      // Add cafe data source
      map.addSource('cafes', {
        type: 'geojson',
        data: cafeData as GeoJSON
      })

      // Add symbol layers for each cafe type
      for (const layer of layerState) {
        const { name, color } = layer
        const layerId = `cafes-${name}-symbol`

        if (!map.getLayer(layerId)) {
          map.addLayer({
            id: layerId,
            type: 'symbol',
            source: 'cafes',
            layout: {
              'icon-image': 'custom-marker',
              'icon-size': 1,
              'icon-allow-overlap': true
            },
            paint: {
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
    }

    map.on('load', onLoad)

    return () => {
      map.off('load', onLoad)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layerState])

  return { layerState, setLayerState }
}
